import {loggerConfig} from '../../main/config/logger/logger-config';
import {makeCreateNotification} from './create-notification';
import {generatedId} from '../../util/id/services';
import {NotificationModel} from '../models/Notification';
import {makeGetUnacknowledgedNotifications} from './get-unacknowledged-notifications';
import {makeGetAllNotifications} from './get-all-notifications';
import {makeGetNotificationById} from './get-notification-by-id';
import {makeAcknowledgeNotification} from './acknowledge-notification';

const logger = loggerConfig();

export const createNotification = makeCreateNotification(
    logger,
    generatedId,
    NotificationModel,
);

export const getUnacknowledgedNotifications = makeGetUnacknowledgedNotifications(
    logger,
    NotificationModel,
);

export const getAllNotifications = makeGetAllNotifications(
    logger,
    NotificationModel,
);

export const getNotificationById = makeGetNotificationById(
    logger,
    NotificationModel,
);

export const acknowledgeNotification = makeAcknowledgeNotification(
    logger,
    NotificationModel,
);
