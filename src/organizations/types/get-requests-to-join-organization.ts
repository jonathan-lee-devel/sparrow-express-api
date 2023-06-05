import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationMembershipRequestDto} from '../dtos/OrganizationMembershipRequestDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

/**
 * Type for the service function which obtains requests to join an organization by organization ID.
 */
export type GetRequestsToJoinOrganizationFunction = (
    requestingUser: User,
    organizationId: string,
) => Promise<StatusDataContainer<OrganizationMembershipRequestDto[] | ErrorDto>>;
