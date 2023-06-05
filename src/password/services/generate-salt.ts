import bcrypt from 'bcrypt';
import {GenerateSaltFunction} from '../types/generate-salt';

/**
 * Closure to generate salt for hashing passwords.
 */
export const makeGenerateSalt = (): GenerateSaltFunction => {
  return async function generateSalt(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.genSalt((err, salt) => {
        if (err) return reject(err);
        return resolve(salt);
      });
    });
  };
};
