import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {ConfirmPasswordResetFunction} from '../types/confirm-password-reset';
// eslint-disable-next-line max-len
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';
import {PasswordResetStatus} from '../enums/PasswordResetStatus';
import {User} from '../../main/models/User';
import {EncodePasswordFunction} from '../types/encode-password';

/**
 * Closure for confirm password reset functionality.
 * @param logger used for logging
 * @param PasswordResetVerificationTokenModel used to access database
 * @param UserModel used to access database
 * @param encodePassword used to hash passwords for storage
 */
export const makeConfirmPasswordReset = (
    logger: bunyan,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
    UserModel: Model<User>,
    encodePassword: EncodePasswordFunction,
): ConfirmPasswordResetFunction => {
  return async function confirmPasswordReset(
      tokenValue: string,
      password: string) {
    try {
      const tokenModel = await PasswordResetVerificationTokenModel
          .findOne({value: tokenValue}, {__v: 0});
      if (!tokenModel) {
        logger.info(`No token exists with value: ${tokenValue}`);
        return {
          status: 400,
          data: {
            status: PasswordResetStatus[PasswordResetStatus.INVALID_TOKEN],
          },
        };
      }

      const userModel = await UserModel
          .findOne({email: tokenModel.userEmail}, {__v: 0});
      if (!userModel) {
        logger.error(`No user exists for token with value: ${tokenValue}`);
        return {
          status: 500,
          data: {
            status: PasswordResetStatus[PasswordResetStatus.FAILURE],
          },
        };
      }

      if (tokenModel.expiryDate.getTime() < new Date().getTime()) {
        return {
          status: 400,
          data: {
            status: PasswordResetStatus[
                PasswordResetStatus.EMAIL_VERIFICATION_EXPIRED
            ],
          },
        };
      }
      userModel.password = await encodePassword(password);
      await userModel.save();
      tokenModel.expiryDate = new Date();
      await tokenModel.save();
      return {
        status: 200,
        data: {
          status: PasswordResetStatus[PasswordResetStatus.SUCCESS],
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return {
        status: 500,
        data: {
          status: PasswordResetStatus[PasswordResetStatus.FAILURE],
        },
      };
    }
  };
};
