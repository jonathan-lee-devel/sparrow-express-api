import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {User} from '../../main/models/User';
import {returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {GetOrganizationSnippetFunction} from '../types/get-organization-snippet';

/**
 * Closure for the service function which obtains organization snippet data by ID.
 * @param {bunyan} logger used for logging
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @return {GetOrganizationSnippetFunction} service function which obtains organization snippet data by ID
 */
export const makeGetOrganizationSnippet = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): GetOrganizationSnippetFunction => {
  /**
     * Service function which obtains organization snippet data by ID.
     * @param {User} requestingUser user making the request
     * @param {string} organizationId ID of the organization for which snippet data is to be obtained
     * @return {Promise<StatusDataContainer<OrganizationSnippetDto>>} organization snippet data
     */
  return async function getOrganizationSnippet(
      requestingUser: User,
      organizationId: string,
  ) {
    try {
      const organizationModel = await OrganizationModel.findOne({id: organizationId}, {__v: 0});
      logger.info(`GET organization snippet by ID: ${organizationId}`);
      if (!organizationModel) {
        return returnNotFound();
      }

      return {
        status: 200,
        data: {
          id: organizationModel.id,
          name: organizationModel.name,
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
