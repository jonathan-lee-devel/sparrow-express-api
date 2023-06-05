// eslint-disable-next-line max-len
import {ReturnInternalServerErrorFunction} from './types/return-internal-server-error';

/**
 * Helper function for returning HTTP 500 Internal Server Error errors.
 */
export const makeReturnInternalServerError = ()
    : ReturnInternalServerErrorFunction => {
  return function() {
    return {
      status: 500,
      data: undefined,
    };
  };
};
