import {ReturnNotFoundFunction} from './types/return-not-found';
import {HttpStatus} from '../../enums/HttpStatus';

/**
 * Helper function for returning HTTP 404 Not Found errors.
 */
export const makeReturnNotFound = (): ReturnNotFoundFunction => {
  return function() {
    return {
      status: HttpStatus.NOT_FOUND,
      data: undefined,
    };
  };
};
