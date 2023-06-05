import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {RegistrationVerificationToken} from '../models/RegistrationVerificationToken';
import {ConfirmRegistrationFunction} from '../types/confirm-registration';
import {RegistrationStatus} from '../enums/RegistrationStatus';
import {User} from '../../main/models/User';
import {returnInternalServerError} from '../../common/use-cases/status-data-container';

export const makeConfirmRegistration = (
    logger: bunyan,
    RegistrationVerificationTokenModel: Model<RegistrationVerificationToken>,
    UserModel: Model<User>,
): ConfirmRegistrationFunction => {
  return async function confirmRegistration(tokenValue: string) {
    try {
      const tokenModel = await RegistrationVerificationTokenModel
          .findOne({value: tokenValue}, {__v: 0});
      if (!tokenModel) {
        return {
          status: 400,
          data: {
            status: RegistrationStatus[RegistrationStatus.INVALID_TOKEN],
          },
        };
      }

      const userModel = await UserModel.findOne({email: tokenModel.userEmail});
      if (!userModel) {
        logger.error(`No user found for registration verification token with userEmail: <${tokenModel.userEmail}>`);
        return {
          status: 500,
          data: {
            status: RegistrationStatus[RegistrationStatus.FAILURE],
          },
        };
      }
      if (tokenModel.expiryDate.getTime() < new Date().getTime()) {
        return {
          status: 400,
          data: {
            status: RegistrationStatus[RegistrationStatus.EMAIL_VERIFICATION_EXPIRED],
          },
        };
      }
      userModel.emailVerified = true;
      await userModel.save();
      tokenModel.expiryDate = new Date();
      await tokenModel.save();
      logger.info(`Successful registration confirmation for user with e-mail: <${userModel.email}>`);
      return {
        status: 200,
        data: {
          status: RegistrationStatus[RegistrationStatus.SUCCESS],
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
