import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {OrganizationMembershipRequest} from '../models/OrganizationMembershipRequest';
import {User} from '../../main/models/User';
import {returnForbidden} from '../../common/use-cases/status-data-container';
import {GetRequestsToJoinOrganizationFunction} from '../types/get-requests-to-join-organization';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {OrganizationMembershipRequestDto} from '../dtos/OrganizationMembershipRequestDto';

/**
 * Closure for the service function which obtains requests to join a given organization by organization ID.
 * @param {bunyan} logger used for logging
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @param {Model<OrganizationMembershipRequest>} OrganizationMembershipRequestModel used to access organization membership request data
 * @return {GetRequestsToJoinOrganizationFunction} service function which obtains requests to join a given organization by organization ID
 */
export const makeGetRequestsToJoinOrganization = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
    OrganizationMembershipRequestModel: Model<OrganizationMembershipRequest>,
): GetRequestsToJoinOrganizationFunction => {
  /**
     * Service function which obtains requests to join a given organization by organization ID.
     * @param {User} requestingUser user making the request
     * @param {string} organizationId ID of the organization for which membership requests are to be obtained
     * @return {Promise<StatusDataContainer<OrganizationMembershipRequestDto[] | ErrorDto>>} organization membership request data or error DTO for bad requests
     */
  return async function getRequestsToJoinOrganization(
      requestingUser: User,
      organizationId: string) {
    logger.info(`Request to GET all requests to join organization with ID: ${organizationId}`);
    const organizationModel = await OrganizationModel.findOne({id: organizationId}, {__v: 0});
    if (!organizationModel) {
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID ${organizationId} does not exist`),
      };
    }
    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }
    const organizationMembershipRequestModels = await OrganizationMembershipRequestModel
        .find({organizationId}, {__v: 0});
    const organizationMembershipRequestDtos: OrganizationMembershipRequestDto[] = [];
    for (const organizationMembershipRequestModel of organizationMembershipRequestModels) {
      organizationMembershipRequestDtos.push({
        id: (await organizationMembershipRequestModel).id,
        organizationId: (await organizationMembershipRequestModel).organizationId,
        requestingUserEmail: (await organizationMembershipRequestModel).requestingUserEmail,
        isApproved: (await organizationMembershipRequestModel).isApproved,
        approvingAdministratorEmail: (await organizationMembershipRequestModel).approvingAdministratorEmail,
      });
    }
    return {
      status: 200,
      data: organizationMembershipRequestDtos,
    };
  };
};
