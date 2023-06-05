import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {UpdateAdministratorJoinAsMemberFunction} from '../types/update-administrator-join-as-member';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {User} from '../../main/models/User';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {OrganizationMembershipStatus} from '../enums/OrganizationMembershipStatus';

export const makeUpdateAdministratorJoinAsMember = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): UpdateAdministratorJoinAsMemberFunction => {
  return async function updateAdministratorJoinAsMember(
      requestingUser: User,
      toJoinOrganizationId: string,
  ) {
    logger.info(`Request for user with e-mail: <${requestingUser.email}> (admin) to become member of organization with ID: ${toJoinOrganizationId}`);
    try {
      const organizationModel = await OrganizationModel
          .findOne({id: toJoinOrganizationId}, {__v: 0});
      if (!organizationModel) {
        return returnNotFound();
      }
      if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
        return returnForbidden();
      }
      if (organizationModel.memberEmails.includes(requestingUser.email)) {
        return {
          status: 400,
          data: errorMessageToDto(`User is already a member of organization with ID: ${toJoinOrganizationId}`),
        };
      }
      organizationModel.memberEmails.push(requestingUser.email);
      await organizationModel.markModified('memberEmails');
      await organizationModel.save();
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
    return {
      status: 200,
      data: {
        status: OrganizationMembershipStatus[OrganizationMembershipStatus.SUCCESS],
      },
    };
  };
};
