import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {randomBytes} from 'crypto';
import {addMinutes} from 'date-fns';
import {RegistrationVerificationToken} from '../models/RegistrationVerificationToken';
import {GenerateRegistrationVerificationTokenFunction} from '../types/generate-registration-verification-token';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeGenerateRegistrationVerificationToken = (
    logger: bunyan,
    RegistrationVerificationTokenModel: Model<RegistrationVerificationToken>,
): GenerateRegistrationVerificationTokenFunction => {
  return async function generateRegistrationVerificationToken(
      tokenSize: number,
      expiryTimeMinutes: number,
      userEmail: string) {
    const registrationVerificationToken: RegistrationVerificationToken = {
      value: randomBytes(tokenSize / 2).toString('hex'),
      expiryDate: addMinutes(new Date(), expiryTimeMinutes),
      userEmail,
    };
    await new RegistrationVerificationTokenModel(
        registrationVerificationToken,
    ).save();

    logger.info(`Generated registration verification token for user with e-mail: <${userEmail}>`);
    return {
      status: HttpStatus.CREATED,
      data: registrationVerificationToken,
    };
  };
};
