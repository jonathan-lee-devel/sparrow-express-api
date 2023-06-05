import {ConfirmRegistrationFunction} from '../types/confirm-registration';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeConfirmRegistrationController = (
    confirmRegistration: ConfirmRegistrationFunction,
): HttpController => {
  return async function confirmRegistrationController(
      httpRequest: HttpRequest,
  ) {
    const registrationContainer = await confirmRegistration(
        httpRequest.body.tokenValue,
    );
    return {
      httpStatus: registrationContainer.status,
      jsonBody: registrationContainer.data,
    };
  };
};
