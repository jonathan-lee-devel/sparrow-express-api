import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {GetProfileFunction} from '../types/get-profile';
import {User} from '../../main/models/User';
// eslint-disable-next-line max-len
import {returnForbidden, returnInternalServerError} from '../../common/use-cases/status-data-container';

/**
 * Closure for function to get user profile.
 * @param {bunyan} logger used for logging
 * @param {Model<User>} UserModel used to access database
 * @return {GetProfileFunction} function to get user profile
 */
export const makeGetProfile = (
    logger: bunyan,
    UserModel: Model<User>,
): GetProfileFunction => {
  return async function getProfile(requestingUser: User, email: string) {
    if (requestingUser.email !== email) {
      return returnForbidden();
    }
    try {
      const userModel = await UserModel.findOne({email}, {__v: 0});
      if (!userModel) {
        logger.error(`No user profile available for requesting user: ${email}`);
        return returnInternalServerError();
      }

      return {
        status: 200,
        data: {
          email,
          firstName: userModel.firstName,
          lastName: userModel.lastName,
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
