import {ReturnForbiddenFunction} from './types/return-forbidden';
import bunyan from 'bunyan';

/**
 * Helper function for returning HTTP 403 Forbidden errors.
 * @param {bunyan} logger used for logging
 * @return {StatusDataContainer}returns status data container with 403 Forbidden status
 */
export const makeReturnForbidden = (logger: bunyan): ReturnForbiddenFunction => {
  return function() {
    logger.info(`Access denied`);
    return {
      status: 403,
      data: undefined,
    };
  };
};
