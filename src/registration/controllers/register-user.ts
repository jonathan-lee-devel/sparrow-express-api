import {RegisterUserFunction} from '../types/register-user';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeRegisterUserController = (
    registerUser: RegisterUserFunction,
): HttpController => {
  return async function registerUserController(httpRequest: HttpRequest) {
    const registrationContainer = await registerUser(
        httpRequest.body.email,
        httpRequest.body.firstName,
        httpRequest.body.lastName,
        httpRequest.body.password,
    );
    return {
      httpStatus: registrationContainer.status,
      jsonBody: registrationContainer.data,
    };
  };
};
