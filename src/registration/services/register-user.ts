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
        status: 409,
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
    if (registrationVerificationTokenContainer.status !== 201 ||
            expiredPasswordResetVerificationTokenContainer.status !== 201) {
      return {
        status: 500,
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
    try {
      await new UserModel(newUser).save();
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: {
          status: RegistrationStatus[RegistrationStatus.FAILURE],
        },
      };
    }

    // Mail is slow to send and can be sent asynchronously, hence, no await
    sendMail(email, 'Registration Confirmation',
        // @ts-ignore
        `<h4>Please click the following link to verify your account: <a href="${process.env.FRONT_END_URL}/register/confirm/${registrationVerificationTokenContainer.data.value}">Verify Account</a></h4>`);

    return {
      status: 200,
      data: {
        status: RegistrationStatus[RegistrationStatus.AWAITING_EMAIL_VERIFICATION],
      },
    };
  };
};
