import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {UpdateAdministratorJoinAsMemberFunction} from '../types/update-administrator-join-as-member';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';
import {User} from '../../main/models/User';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {OrganizationMembershipStatus} from '../enums/OrganizationMembershipStatus';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeUpdateAdministratorJoinAsMember = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): UpdateAdministratorJoinAsMemberFunction => {
  return async function updateAdministratorJoinAsMember(
      requestingUser: User,
      toJoinOrganizationId: string,
  ) {
    logger.info(`Request for user with e-mail: <${requestingUser.email}> (admin) to become member of organization with ID: ${toJoinOrganizationId}`);
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
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto(`User is already a member of organization with ID: ${toJoinOrganizationId}`),
      };
    }
    organizationModel.memberEmails.push(requestingUser.email);
    await organizationModel.markModified('memberEmails');
    await organizationModel.save();
    return {
      status: HttpStatus.OK,
      data: {
        status: OrganizationMembershipStatus[OrganizationMembershipStatus.SUCCESS],
      },
    };
  };
};
