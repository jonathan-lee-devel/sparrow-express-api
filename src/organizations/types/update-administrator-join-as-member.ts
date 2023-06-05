import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationMembershipStatusDto} from '../dtos/OrganizationMembershipStatusDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

/**
 * Type for the service function which allows an administrator to also join an organization as a member.
 */
export type UpdateAdministratorJoinAsMemberFunction = (
    requestingUser: User,
    toJoinOrganizationId: string,
) => Promise<StatusDataContainer<OrganizationMembershipStatusDto | ErrorDto>>;
