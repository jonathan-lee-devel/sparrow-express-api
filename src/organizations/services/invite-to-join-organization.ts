import bunyan from 'bunyan';
import {Organization} from '../models/Organization';
import {Model} from 'mongoose';
import {returnForbidden, returnInternalServerError} from '../../common/use-cases/status-data-container';
import {User} from '../../main/models/User';
import {OrganizationMembershipStatus} from '../enums/OrganizationMembershipStatus';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {InviteToJoinOrganizationFunction} from '../types/invite-to-join-organization';
import {OrganizationInvitation} from '../models/OrganizationInvitation';
import {SendMailFunction} from '../../util/email/types/send-mail';
import {DEFAULT_TOKEN_SIZE} from '../../util/token/default-token-size';
import {addDays} from 'date-fns';
import {DEFAULT_TOKEN_EXPIRY_TIME_DAYS} from '../../util/token/default-token-expiry-time-days';

/**
 * Closure for service function which invites a given user to join an organization.
 * @param {bunyan} logger used for logging
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @param {Model<OrganizationInvitation>} OrganizationInvitationModel used to access organization invitation data
 * @param {GenerateIdFunction} generateId used to generate ID for new organization invitation
 * @param {SendMailFunction} sendMail used to send e-mail to invited user
 * @return {InviteToJoinOrganizationFunction} service function which invites a given user to join an organization
 */
export const makeInviteToJoinOrganization = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
    OrganizationInvitationModel: Model<OrganizationInvitation>,
    generateId: GenerateIdFunction,
    sendMail: SendMailFunction,
): InviteToJoinOrganizationFunction => {
  /**
     * Service function which invites a given user to join an organization.
     * @param {User} requestingUser user making the request
     * @param {string} organizationId ID of the organization to which the user is being invited to join
     * @param {string} emailToInvite e-mail address of the user being invited to join the organization
     * @return {Promise<StatusDataContainer<OrganizationMembershipStatusDto>>} organization membership status
     */
  return async function inviteToJoinOrganization(
      requestingUser: User,
      organizationId: string,
      emailToInvite: string) {
    logger.info(`Invitation to join organization with ID: ${organizationId}`);

    try {
      const organizationModel = await OrganizationModel.findOne({id: organizationId}, {__v: 0});
      if (!organizationModel) {
        return {
          status: 400,
          data: {
            status: OrganizationMembershipStatus[OrganizationMembershipStatus.ORGANIZATION_DOES_NOT_EXIST],
          },
        };
      }
      if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
        return returnForbidden();
      }
      if (organizationModel.memberEmails.includes(emailToInvite)) {
        return {
          status: 400,
          data: {
            status: OrganizationMembershipStatus[OrganizationMembershipStatus.USER_ALREADY_MEMBER],
          },
        };
      }

      const organizationInvitationModel = await OrganizationInvitationModel.findOne({
        organizationId, emailToInvite,
      }, {__v: 0});
      if (organizationInvitationModel) {
        return {
          status: 409,
          data: {
            status: OrganizationMembershipStatus[OrganizationMembershipStatus.REQUEST_ALREADY_EXISTS],
          },
        };
      }

      const organizationInvitation: OrganizationInvitation = {
        id: await generateId(DEFAULT_ID_LENGTH),
        organizationId,
        requestingUserEmail: requestingUser.email,
        isAccepted: false,
        value: await generateId(DEFAULT_TOKEN_SIZE),
        expiryDate: addDays(new Date(), DEFAULT_TOKEN_EXPIRY_TIME_DAYS),
        emailToInvite,
      };
      await new OrganizationInvitationModel(organizationInvitation).save();
      sendMail(emailToInvite, 'Sparrow Organization Invitation',
          `<h3>You have been invited to join an organization</h3>
<p>Click the following link to view an invitation to join an organization <a href="${process.env.FRONT_END_URL}/organizations/invitations/${organizationInvitation.value}">View Invitation</a><p>`)
          .then((_) => {
          });
      logger.info(`Organization invitation sent to e-mail: <${emailToInvite}> with ID: ${organizationInvitation.id}`);
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
    return {
      status: 200,
      data: {
        status: OrganizationMembershipStatus[OrganizationMembershipStatus.AWAITING_APPROVAL],
      },
    };
  };
};
