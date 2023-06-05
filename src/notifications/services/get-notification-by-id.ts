import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification';
import {GetNotificationByIdFunction} from '../types/get-notification-by-id';
import {User} from '../../main/models/User';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {NotificationType} from '../enums/NotificationType';

export const makeGetNotificationById = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): GetNotificationByIdFunction => {
  return async function getNotificationById(
      requestingUser: User,
      notificationId: string) {
    try {
      logger.info(`GET notification with ID: ${notificationId}`);
      const notificationModel = await NotificationModel.findOne({id: notificationId}, {__v: 0});
      if (!notificationModel) {
        return returnNotFound();
      }
      if (notificationModel.targetUserEmail !== requestingUser.email) {
        return returnForbidden();
      }
      return {
        status: 200,
        data: {
          targetUserEmail: notificationModel.targetUserEmail,
          title: notificationModel.title,
          content: notificationModel.content,
          isAcknowledged: notificationModel.isAcknowledged,
          timestamp: notificationModel.timestamp,
          id: notificationModel.id,
          type: NotificationType[notificationModel.type],
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
