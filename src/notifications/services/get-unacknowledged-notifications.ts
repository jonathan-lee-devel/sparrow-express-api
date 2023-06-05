import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification';
import {User} from '../../main/models/User';
import {returnInternalServerError} from '../../common/use-cases/status-data-container';
import {GetUnacknowledgedNotificationsFunction} from '../types/get-unacknowledged-notifications';
import {NotificationDto} from '../dto/NotificationDto';
import {NotificationType} from '../enums/NotificationType';

export const makeGetUnacknowledgedNotifications = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): GetUnacknowledgedNotificationsFunction => {
  return async function getUnacknowledgedNotifications(
      requestingUser: User,
  ) {
    try {
      const notificationModels: Notification[] = await NotificationModel.find({
        targetUserEmail: requestingUser.email,
        isAcknowledged: false,
      });
      logger.info(`GET unacknowledged notifications for user with e-mail: <${requestingUser.email}>`);
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
