import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Notification} from '../models/Notification';
import {AcknowledgeNotificationFunction} from '../types/acknowledge-notification';
import {User} from '../../main/models/User';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {NotificationType} from '../enums/NotificationType';
import {errorMessageToDto} from '../../common/use-cases/errors';

export const makeAcknowledgeNotification = (
    logger: bunyan,
    NotificationModel: Model<Notification>,
): AcknowledgeNotificationFunction => {
  return async function acknowledgeNotification(
      requestingUser: User,
      notificationId: string) {
    try {
      logger.info(`Acknowledge notification with ID: ${notificationId}`);
      const notificationModel = await NotificationModel.findOne({id: notificationId}, {__v: 0});
      if (!notificationModel) {
        return returnNotFound();
      }
      if (notificationModel.targetUserEmail !== requestingUser.email) {
        return returnForbidden();
      }
      if (notificationModel.isAcknowledged) {
        return {
          status: 400,
          data: errorMessageToDto('Notification is already acknowledged'),
        };
      }
      notificationModel.isAcknowledged = true;
      await notificationModel.save();
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
