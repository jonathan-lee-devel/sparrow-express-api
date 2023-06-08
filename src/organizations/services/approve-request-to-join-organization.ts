import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {OrganizationMembershipRequest} from '../models/OrganizationMembershipRequest';
import {User} from '../../main/models/User';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';
import {ApproveRequestToJoinOrganizationFunction} from '../types/approve-request-to-join-organization';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {OrganizationMembershipStatus} from '../enums/OrganizationMembershipStatus';
import {HttpStatus} from '../../common/enums/HttpStatus';

/**
 * Closure for the service function which approves a request to join an organization.
 * @param {bunyan} logger used for logging
 * @param {Model<OrganizationMembershipRequest>} OrganizationMembershipRequestModel used to access organization membership request data
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @return {ApproveRequestToJoinOrganizationFunction} service function which approves a request to join an organization
 */
export const makeApproveRequestToJoinOrganization = (
    logger: bunyan,
    OrganizationMembershipRequestModel: Model<OrganizationMembershipRequest>,
    OrganizationModel: Model<Organization>,
): ApproveRequestToJoinOrganizationFunction => {
  /**
     * Service function which approves a request to join an organization.
     * @param {User} requestingUser user making the request
     * @param {string} organizationMembershipRequestId ID of the organization membership request being approved
     * @return {Promise<StatusDataContainer<OrganizationMembershipStatusDto | ErrorDto>>} membership status DTO or error DTO for bad requests
     */
  return async function approveRequestToJoinOrganization(
      requestingUser: User,
      organizationMembershipRequestId: string,
  ) {
    logger.info(`Request to approve organization membership request with ID: ${organizationMembershipRequestId}`);
    const organizationMembershipRequestModel = await OrganizationMembershipRequestModel
        .findOne({id: organizationMembershipRequestId}, {__v: 0});
    if (!organizationMembershipRequestModel) {
      return returnNotFound();
    }
    const organizationModel = await OrganizationModel
        .findOne({id: organizationMembershipRequestModel.organizationId}, {__v: 0});
    if (!organizationModel) {
      logger.error(`Organization membership request with ID: ${organizationMembershipRequestId} references non-existent organization`);
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto(`Organization with ID: ${organizationMembershipRequestModel.organizationId} does not exist`),
      };
    }
    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }
    if (organizationModel.memberEmails.includes(organizationMembershipRequestModel.requestingUserEmail)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          status: OrganizationMembershipStatus[OrganizationMembershipStatus.USER_ALREADY_MEMBER],
        },
      };
    }
    organizationModel.memberEmails.push(organizationMembershipRequestModel.requestingUserEmail);
    organizationMembershipRequestModel.isApproved = true;
    organizationMembershipRequestModel.approvingAdministratorEmail = requestingUser.email;

    await organizationModel.markModified('memberEmails');
    await organizationModel.save();
    await organizationMembershipRequestModel.save();

    return {
      status: HttpStatus.OK,
      data: {
        status: OrganizationMembershipStatus[OrganizationMembershipStatus.SUCCESS],
      },
    };
  };
};
