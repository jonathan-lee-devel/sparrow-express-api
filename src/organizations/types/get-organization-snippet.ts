import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationSnippetDto} from '../dtos/OrganizationSnippetDto';

/**
 * Type for the service function which obtains organization snippet data by ID.
 */
export type GetOrganizationSnippetFunction = (
    requestingUser: User,
    organizationId: string,
) => Promise<StatusDataContainer<OrganizationSnippetDto>>;
