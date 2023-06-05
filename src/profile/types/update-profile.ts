import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ProfileDto} from '../dtos/ProfileDto';
import {User} from '../../main/models/User';

export type UpdateProfileFunction = (
    requestingUser: User,
    email: string,
    firstName: string,
    lastName: string,
) => Promise<StatusDataContainer<ProfileDto>>;
