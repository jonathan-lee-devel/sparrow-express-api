import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {confirmRegistrationController, registerUserController} from '../controllers';
import {registerUserValidationChain} from '../validation-chains/register-user';
import {confirmRegistrationValidationChain} from '../validation-chains/confirm-registration';

const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/',
    false,
    registerUserValidationChain,
    makeExpressCallback(logger, registerUserController),
);

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/confirm',
    false,
    confirmRegistrationValidationChain,
    makeExpressCallback(logger, confirmRegistrationController),
);

export {router as RegistrationRouter};
