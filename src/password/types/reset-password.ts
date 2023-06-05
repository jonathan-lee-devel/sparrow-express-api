import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {PasswordResetStatusDto} from '../dtos/PasswordResetStatusDto';

export type ResetPasswordFunction = (
    email: string,
) => Promise<StatusDataContainer<PasswordResetStatusDto>>;
