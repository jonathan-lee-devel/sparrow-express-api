import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationInvitationDto} from '../dtos/OrganizationInvitationDto';

/**
 * Type for the service function which gets organization invitation data by token value.
 */
export type GetOrganizationInvitationByTokenValueFunction = (
    requestingUser: User,
    organizationInvitationTokenValue: string,
) => Promise<StatusDataContainer<OrganizationInvitationDto>>;
