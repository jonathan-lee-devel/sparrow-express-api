import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PasswordResetStatusDto} from '../dtos/PasswordResetStatusDto';

export type ConfirmPasswordResetFunction = (
    tokenValue: string,
    password: string,
) => Promise<StatusDataContainer<PasswordResetStatusDto>>;
