import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {randomBytes} from 'crypto';
import {addMinutes} from 'date-fns';
import {PasswordResetVerificationToken} from '../models/PasswordResetVerificationToken';
import {GeneratePasswordResetVerificationTokenFunction} from '../types/generate-password-reset-verification-token';
import {HttpStatus} from '../../common/enums/HttpStatus';

/**
 * Closure for generating password reset verification token.
 * @param logger used for logging
 * @param PasswordResetVerificationTokenModel used to access database
 */
export const makeGeneratePasswordResetVerificationToken = (
    logger: bunyan,
    PasswordResetVerificationTokenModel: Model<PasswordResetVerificationToken>,
): GeneratePasswordResetVerificationTokenFunction => {
  return async function generateRegistrationVerificationToken(
      tokenSize: number,
      expiryTimeMinutes: number,
      userEmail: string) {
    const passwordResetVerificationToken: PasswordResetVerificationToken = {
      value: randomBytes(tokenSize / 2).toString('hex'),
      expiryDate: addMinutes(new Date(), expiryTimeMinutes),
      userEmail,
    };
    await new PasswordResetVerificationTokenModel(
        passwordResetVerificationToken,
    ).save();

    return {
      status: HttpStatus.CREATED,
      data: passwordResetVerificationToken,
    };
  };
};
