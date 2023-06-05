import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationMembershipStatusDto} from '../dtos/OrganizationMembershipStatusDto';

/**
 * Type for the service function which invites a given user to join an organization.
 */
export type InviteToJoinOrganizationFunction = (
    requestingUser: User,
    organizationId: string,
    emailToInvite: string,
) => Promise<StatusDataContainer<OrganizationMembershipStatusDto>>;
