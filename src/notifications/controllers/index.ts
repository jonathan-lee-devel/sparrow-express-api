import {makeGetUnacknowledgedNotificationsController} from './get-unacknowldged-notifications';
import {
  acknowledgeNotification,
  getAllNotifications,
  getNotificationById,
  getUnacknowledgedNotifications,
} from '../services';
import {makeGetAllNotificationsController} from './get-all-notifications';
import {makeGetNotificationByIdController} from './get-notification-by-id';
import {makeAcknowledgeNotificationController} from './acknowledge-notification';

export const getUnacknowledgedNotificationsController =
    makeGetUnacknowledgedNotificationsController(getUnacknowledgedNotifications);

export const getAllNotificationsController =
    makeGetAllNotificationsController(getAllNotifications);

export const getNotificationByIdController =
    makeGetNotificationByIdController(getNotificationById);

export const acknowledgeNotificationController =
    makeAcknowledgeNotificationController(acknowledgeNotification);
