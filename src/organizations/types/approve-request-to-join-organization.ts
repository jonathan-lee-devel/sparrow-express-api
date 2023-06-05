import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationMembershipStatusDto} from '../dtos/OrganizationMembershipStatusDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

/**
 * Type for the service function which approves a request to join an organization.
 */
export type ApproveRequestToJoinOrganizationFunction = (
    requestingUser: User,
    organizationMembershipRequestId: string,
) => Promise<StatusDataContainer<OrganizationMembershipStatusDto | ErrorDto>>;
