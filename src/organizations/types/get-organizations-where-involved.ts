import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationDto} from '../dtos/OrganizationDto';

/**
 * Type for the service function which obtains organization in which the requesting user is involved.
 */
export type GetOrganizationsWhereInvolvedFunction = (
    requestingUser: User,
) => Promise<StatusDataContainer<OrganizationDto[]>>;
