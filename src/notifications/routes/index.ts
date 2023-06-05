import express from 'express';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {
  acknowledgeNotificationController,
  getAllNotificationsController,
  getNotificationByIdController,
  getUnacknowledgedNotificationsController,
} from '../controllers';

const router = express.Router();

const logger = loggerConfig();

configureRoute(router, HttpRequestMethod.GET, '/unacknowledged', true, [], makeExpressCallback(logger, getUnacknowledgedNotificationsController));

configureRoute(router, HttpRequestMethod.GET, '/all', true, [], makeExpressCallback(logger, getAllNotificationsController));

configureRoute(router, HttpRequestMethod.GET, '/:notificationId', true, [], makeExpressCallback(logger, getNotificationByIdController));

configureRoute(router, HttpRequestMethod.PUT, '/acknowledge/:notificationId', true, [], makeExpressCallback(logger, acknowledgeNotificationController));

export {router as NotificationsRouter};
