import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {resetPasswordValidationChain} from '../validation-chains/reset-password';
import {confirmPasswordResetController, resetPasswordController} from '../controllers';
import {confirmPasswordResetValidationChain} from '../validation-chains/confirm-password-reset';

const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/reset',
    false,
    resetPasswordValidationChain,
    makeExpressCallback(logger, resetPasswordController),
);

configureRoute(
    router,
    HttpRequestMethod.POST,
    '/reset/confirm',
    false,
    confirmPasswordResetValidationChain,
    makeExpressCallback(logger, confirmPasswordResetController),
);

export {router as PasswordResetRouter};
