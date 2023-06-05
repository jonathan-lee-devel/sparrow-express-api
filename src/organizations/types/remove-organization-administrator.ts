import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationDto} from '../dtos/OrganizationDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

/**
 * Type for the service function which removes an organization administrator.
 */
export type RemoveOrganizationAdministratorFunction = (
    requestingUser: User,
    organizationId: string,
    administratorEmailToRemove: string,
) => Promise<StatusDataContainer<OrganizationDto | ErrorDto>>;
