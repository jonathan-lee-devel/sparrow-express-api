import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification';
import {User} from '../../main/models/User';
import {GetAllNotificationsFunction} from '../types/get-all-notifications';
import {returnInternalServerError} from '../../common/use-cases/status-data-container';
import {NotificationDto} from '../dto/NotificationDto';
import {NotificationType} from '../enums/NotificationType';

export const makeGetAllNotifications = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): GetAllNotificationsFunction => {
  return async function getAllNotifications(
      requestingUser: User,
  ) {
    try {
      const notificationModels: Notification[] = await NotificationModel.find({
        targetUserEmail: requestingUser.email,
      });
      logger.info(`GET all notifications for user with e-mail: <${requestingUser.email}>`);
      if (!notificationModels) {
        return returnInternalServerError();
      }
      const notificationDtos: NotificationDto[] = [];
      for (const notificationModel of notificationModels) {
        notificationDtos.push({
          id: notificationModel.id,
          targetUserEmail: notificationModel.targetUserEmail,
          title: notificationModel.title,
          content: notificationModel.content,
          isAcknowledged: notificationModel.isAcknowledged,
          type: NotificationType[notificationModel.type],
          timestamp: notificationModel.timestamp,
        });
      }

      return {
        status: 200,
        data: notificationDtos,
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
