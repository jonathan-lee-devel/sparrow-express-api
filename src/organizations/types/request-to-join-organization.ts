import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationMembershipStatusDto} from '../dtos/OrganizationMembershipStatusDto';

/**
 * Type for the service function which makes a request for the requesting user to join a given organization by ID.
 */
export type RequestToJoinOrganizationFunction = (
    requestingUser: User,
    organizationId: string,
) => Promise<StatusDataContainer<OrganizationMembershipStatusDto>>;
