import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {ProfileDto} from '../dtos/ProfileDto';
import {User} from '../../main/models/User';

export type GetProfileFunction = (
    requestingUser: User,
    email: string,
) => Promise<StatusDataContainer<ProfileDto>>;
