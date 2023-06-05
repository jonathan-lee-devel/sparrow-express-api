import express from 'express';
import {loggerConfig} from "../../main/config/logger/logger-config";
import {configureRoute} from "../../main/routes/configure-route";
import {HttpRequestMethod} from "../../main/enums/http-request-method";
import {makeExpressCallback} from "../../main/express-callbacks/express-callback";
// eslint-disable-next-line max-len
import {updateProfileValidationChain} from '../validation-chains/update-profile';
import {getProfileController, updateProfileController} from '../controllers';

// eslint-disable-next-line new-cap
const router = express.Router();

const logger = loggerConfig();

configureRoute(
    router,
    HttpRequestMethod.GET,
    '/',
    true,
    [],
    makeExpressCallback(logger, getProfileController),
);

configureRoute(
    router,
    HttpRequestMethod.PUT,
    '/update',
    true,
    updateProfileValidationChain,
    makeExpressCallback(logger, updateProfileController),
);

export {router as ProfileRouter};
