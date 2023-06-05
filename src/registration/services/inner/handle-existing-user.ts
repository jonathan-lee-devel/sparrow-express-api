import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {User} from '../../../main/models/User';
import {HandleExistingUserFunction} from '../../types/inner/handle-existing-user';
import {RegistrationVerificationToken} from '../../models/RegistrationVerificationToken';
import {PasswordResetVerificationToken} from '../../../password/models/PasswordResetVerificationToken';

export const makeHandleExistingUser = (
    logger: bunyan,
    UserModel: Model<User>,
    RegistrationVerificationTokenModel: Model<RegistrationVerificationToken>,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
): HandleExistingUserFunction => {
  return async function handleExistingUser(email: string): Promise<boolean> {
    try {
      const existingUser = await UserModel.findOne({email}, {__v: 0});
      if (!existingUser) {
        await RegistrationVerificationTokenModel.deleteOne({userEmail: email});
        await PasswordResetVerificationTokenModel.deleteOne({userEmail: email});
      }
      if (existingUser && existingUser.emailVerified) {
        return true;
      }
      if (existingUser && !existingUser.emailVerified) {
        await UserModel.deleteOne({email});
        await RegistrationVerificationTokenModel.deleteOne({userEmail: email});
        await PasswordResetVerificationTokenModel.deleteOne({userEmail: email});
        return false;
      }
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return false;
    }
  };
};
