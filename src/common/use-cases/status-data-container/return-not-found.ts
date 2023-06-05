import {ReturnNotFoundFunction} from './types/return-not-found';

/**
 * Helper function for returning HTTP 404 Not Found errors.
 */
export const makeReturnNotFound = (): ReturnNotFoundFunction => {
  return function() {
    return {
      status: 404,
      data: undefined,
    };
  };
};
