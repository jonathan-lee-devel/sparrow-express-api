import bunyan from 'bunyan';
import crypto from 'crypto';
import {GenerateIdFunction} from '../types/generate-id';

export const makeGenerateId = (
    logger: bunyan,
): GenerateIdFunction => {
  return async function generateId(idLength): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      crypto.randomBytes(idLength / 2, (err, buffer) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        return resolve(buffer.toString('hex'));
      });
    });
  };
};
