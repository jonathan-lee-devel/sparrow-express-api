// eslint-disable-next-line max-len
import {ReturnInternalServerErrorFunction} from './types/return-internal-server-error';
import {HttpStatus} from '../../enums/HttpStatus';

/**
 * Helper function for returning HTTP 500 Internal Server Error errors.
 */
export const makeReturnInternalServerError = ()
    : ReturnInternalServerErrorFunction => {
  return function() {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      data: undefined,
    };
  };
};
