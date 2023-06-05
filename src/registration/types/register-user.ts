import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {RegistrationStatusDto} from '../dtos/RegistrationStatusDto';

export type RegisterUserFunction = (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
) => Promise<StatusDataContainer<RegistrationStatusDto>>;
