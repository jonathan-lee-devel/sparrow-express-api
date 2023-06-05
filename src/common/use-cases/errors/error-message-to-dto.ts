import {ErrorMessageToDtoFunction} from './types/error-message-to-dto';

/**
 * Convert error message string to error message DTO.
 */
export const makeErrorMessageToDto = (): ErrorMessageToDtoFunction => {
  return function(errorMessage: string) {
    return {
      errors: [
        {
          'msg': errorMessage,
        },
      ],
    };
  };
};
