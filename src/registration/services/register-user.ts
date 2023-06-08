import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {User} from '../../main/models/User';
import {RegisterUserFunction} from '../types/register-user';
import {EncodePasswordFunction} from '../../password/types/encode-password';
import {HandleExistingUserFunction} from '../types/inner/handle-existing-user';
import {RegistrationStatus} from '../enums/RegistrationStatus';
import {SendMailFunction} from '../../util/email/types/send-mail';
import {DEFAULT_TOKEN_SIZE} from '../../util/token/default-token-size';
import {DEFAULT_TOKEN_EXPIRY_TIME_MINUTES} from '../../util/token/default-token-expiry-time-minutes';
import {GenerateRegistrationVerificationTokenFunction} from '../types/generate-registration-verification-token';
import {
  GeneratePasswordResetVerificationTokenFunction,
} from '../../password/types/generate-password-reset-verification-token';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeRegisterUser = (
    logger: bunyan,
    handleExistingUser: HandleExistingUserFunction,
    generateRegistrationVerificationToken:
        GenerateRegistrationVerificationTokenFunction,
    generatePasswordResetVerificationToken:
        GeneratePasswordResetVerificationTokenFunction,
    encodePassword: EncodePasswordFunction,
    UserModel: Model<User>,
    sendMail: SendMailFunction,
): RegisterUserFunction => {
  return async function registerUser(
      email: string,
      firstName: string,
      lastName: string,
      password: string,
  ) {
    if (await handleExistingUser(email)) {
      return {
        status: HttpStatus.CONFLICT,
        data: {
          status: RegistrationStatus[RegistrationStatus.USER_ALREADY_EXISTS],
        },
      };
    }
    const registrationVerificationTokenContainer =
            await generateRegistrationVerificationToken(
                DEFAULT_TOKEN_SIZE,
                DEFAULT_TOKEN_EXPIRY_TIME_MINUTES,
                email,
            );
    const expiredPasswordResetVerificationTokenContainer =
            await generatePasswordResetVerificationToken(
                DEFAULT_TOKEN_SIZE,
                0,
                email,
            );
    if (registrationVerificationTokenContainer.status !== HttpStatus.CREATED ||
            expiredPasswordResetVerificationTokenContainer.status !== HttpStatus.CREATED) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          status: RegistrationStatus[RegistrationStatus.FAILURE],
        },
      };
    }
    const newUser: User = {
      email,
      firstName,
      lastName,
      password: await encodePassword(password),
      emailVerified: false,
    };
    await new UserModel(newUser).save();

    // Mail is slow to send and can be sent asynchronously, hence, no await
    sendMail(email, 'Registration Confirmation',
        // @ts-ignore
        `<h4>Please click the following link to verify your account: <a href="${process.env.FRONT_END_URL}/register/confirm/${registrationVerificationTokenContainer.data.value}">Verify Account</a></h4>`)
        .catch((reason) => {
          logger.error(`An error has occurred while sending mail: ${reason}`);
        });

    return {
      status: HttpStatus.OK,
      data: {
        status: RegistrationStatus[RegistrationStatus.AWAITING_EMAIL_VERIFICATION],
      },
    };
  };
};
