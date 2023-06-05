import {Router} from 'express';
import {ValidationChain} from 'express-validator';
import {RequestCallback} from '../types/request-callback';
import {isLoggedIn} from '../config/auth/is-logged-in';
import {HttpRequestMethod} from '../enums/http-request-method';

/**
 * Route configuration design pattern.
 * @param router Express router which is to be configured
 * @param method HTTP request method which is to be used
 * @param path path of the endpoint
 * @param isLoginRequired whether the user is required to be logged in or not
 * @param requestValidationChain validation chain used to validate request body
 * @param requestCallback request callback which is invoked upon successful request
 */
export const configureRoute = (
    router: Router,
    method: HttpRequestMethod,
    path: string,
    isLoginRequired: boolean,
    requestValidationChain: ValidationChain[],
    requestCallback: RequestCallback,
) => {
  if (isLoginRequired) {
    router[method](path, isLoggedIn, requestValidationChain, requestCallback);
  }
  router[method](path, requestValidationChain, requestCallback);
};
