import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {User} from '../../main/models/User';
import {returnForbidden, returnInternalServerError} from '../../common/use-cases/status-data-container';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {RemoveOrganizationAdministratorFunction} from '../types/remove-organization-administrator';

/**
 * Closure for service function which removes an organization administrator.
 * @param {bunyan} logger used for logging
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @return {RemoveOrganizationAdministratorFunction} service function which removes an organization administrator
 */
export const makeRemoveOrganizationAdministrator = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): RemoveOrganizationAdministratorFunction => {
  /**
     * Service function which removes an organization administrator.
     * @param {User} requestingUser user making the request
     * @param {string} organizationId ID of the organization to remove the organization administrator from
     * @param {string} administratorEmailToRemove e-mail address of the organization administrator to remove from the organization
     * @return {Promise<StatusDataContainer<OrganizationDto | ErrorDto>>} updated organization or error DTO in case of bad requests
     */
  return async function removeOrganizationAdministrator(
      requestingUser: User,
      organizationId: string,
      administratorEmailToRemove: string,
  ) {
    logger.info(`Request to remove administrator <${administratorEmailToRemove}> from organization with ID: ${organizationId}`);
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
    if (!organizationModel.administratorEmails.includes(administratorEmailToRemove)) {
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID: ${organizationId} has no administrator: <${administratorEmailToRemove}>`),
      };
    }
    const indexOfAdministratorEmailToRemove =
            organizationModel.administratorEmails.indexOf(administratorEmailToRemove, 0);
    if (indexOfAdministratorEmailToRemove > -1) {
      organizationModel.administratorEmails.splice(indexOfAdministratorEmailToRemove, 1);
      try {
        await organizationModel.markModified('administratorEmails');
        await organizationModel.save();
      } catch (err) {
        logger.error(`An error has occurred: ${err}`);
        return returnInternalServerError();
      }
    } else {
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID: ${organizationId} has no administrator: <${administratorEmailToRemove}>`),
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
