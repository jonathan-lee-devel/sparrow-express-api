import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
// eslint-disable-next-line max-len
import {RegistrationVerificationToken} from '../models/RegistrationVerificationToken';

export type GenerateRegistrationVerificationTokenFunction = (
    tokenSize: number,
    expiryTimeMinutes: number,
    userEmail: string,
) => Promise<StatusDataContainer<RegistrationVerificationToken>>;
