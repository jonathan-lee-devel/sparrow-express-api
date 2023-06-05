import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationDto} from '../dtos/OrganizationDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

/**
 * Type for the service function which removes an organization member.
 */
export type RemoveOrganizationMemberFunction = (
    requestingUser: User,
    organizationId: string,
    memberEmailToRemove: string,
) => Promise<StatusDataContainer<OrganizationDto | ErrorDto>>;
