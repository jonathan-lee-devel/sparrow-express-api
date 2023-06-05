import express from 'express';
import {configureLoginRoute} from './login-route';
import {configureLogoutRoute} from './logout-route';
import {loggerConfig} from '../config/logger/logger-config';

const router = express.Router();

const logger = loggerConfig();

configureLoginRoute(router, logger, '/login');

configureLogoutRoute(router, logger, '/logout');

export {router as AuthRouter};
