import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {UpdateProfileFunction} from '../types/update-profile';
import {User} from '../../main/models/User';
import {returnForbidden, returnInternalServerError} from '../../common/use-cases/status-data-container';

/**
 * Closure for function to update user profile.
 * @param {bunyan} logger used for logging
 * @param {Model<User>} UserModel used to access database
 * @return {UpdateProfileFunction} function to update user profile
 */
export const makeUpdateProfile = (
    logger: bunyan,
    UserModel: Model<User>,
): UpdateProfileFunction => {
  return async function updateProfile(
      requestingUser: User,
      email: string,
      firstName: string,
      lastName: string) {
    if (requestingUser.email !== email) {
      return returnForbidden();
    }
    try {
      const userModel = await UserModel.findOne({email}, {__v: 0});
      if (!userModel) {
        logger.error(`No user profile available for requesting user: ${email}`);
        return returnInternalServerError();
      }

      userModel.firstName = firstName;
      userModel.lastName = lastName;
      await userModel.save();
      return {
        status: 200,
        data: {
          email,
          firstName,
          lastName,
        },
      };
    } catch (err) {
      return returnInternalServerError();
    }
  };
};
