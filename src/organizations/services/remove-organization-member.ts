import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {User} from '../../main/models/User';
import {RemoveOrganizationMemberFunction} from '../types/remove-organization-member';
import {returnForbidden, returnInternalServerError} from '../../common/use-cases/status-data-container';
import {errorMessageToDto} from '../../common/use-cases/errors';

/**
 * Closure for the service function which removes an organization member.
 * @param {bunyan} logger used for logging
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @return {RemoveOrganizationMemberFunction} service function which removes an organization member
 */
export const makeRemoveOrganizationMember = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): RemoveOrganizationMemberFunction => {
  /**
     * Service function which removes an organization administrator.
     * @param {User} requestingUser user making the request
     * @param {string} organizationId ID of the organization from which the member is to be removed
     * @param {string} memberEmailToRemove e-mail address of the user to remove as a member from the organization
     * @return {Promise<StatusDataContainer<OrganizationDto | ErrorDto>>} updated organization or error DTO in case of bad requests
     */
  return async function removeOrganizationMember(
      requestingUser: User,
      organizationId: string,
      memberEmailToRemove: string,
  ) {
    logger.info(`Request to remove member <${memberEmailToRemove}> from organization with ID: ${organizationId}`);
    const organizationModel = await OrganizationModel.findOne({id: organizationId}, {__v: 0});
    if (!organizationModel) {
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID: ${organizationId} does not exist`),
      };
    }
    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }
    if (!organizationModel.memberEmails.includes(memberEmailToRemove)) {
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID: ${organizationId} has no member: <${memberEmailToRemove}>`),
      };
    }
    const indexOfMemberEmailToRemove = organizationModel.memberEmails.indexOf(memberEmailToRemove, 0);
    if (indexOfMemberEmailToRemove > -1) {
      organizationModel.memberEmails.splice(indexOfMemberEmailToRemove, 1);
      try {
        await organizationModel.markModified('memberEmails');
        await organizationModel.save();
      } catch (err) {
        logger.error(`An error has occurred: ${err}`);
        return returnInternalServerError();
      }
    } else {
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID: ${organizationId} has no member: <${memberEmailToRemove}>`),
      };
    }
    return {
      status: 200,
      data: {
        id: organizationModel.id,
        name: organizationModel.name,
        memberEmails: organizationModel.memberEmails,
        administratorEmails: organizationModel.administratorEmails,
      },
    };
  };
};
