import bunyan from 'bunyan';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {Model} from 'mongoose';
import {CreateNotificationFunction} from '../types/create-notification';
import {NotificationRequestDto} from '../dto/NotificationRequestDto';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {returnInternalServerError} from '../../common/use-cases/status-data-container';
import {Notification} from '../models/Notification';
import {NotificationType} from '../enums/NotificationType';

export const makeCreateNotification = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    NotificationModel: Model<Notification>,
): CreateNotificationFunction => {
  return async function createNotification(
      notification: NotificationRequestDto,
  ) {
    logger.info(`Request to create new notification`);
    const newNotification: Notification = {
      id: await generateId(DEFAULT_ID_LENGTH),
      ...notification,
    };

    try {
      await new NotificationModel(newNotification).save();
      logger.info(`Successfully created new notification with ID: ${newNotification.id}`);
      return {
        status: 201,
        data: {
          id: newNotification.id,
          title: newNotification.title,
          content: newNotification.content,
          targetUserEmail: newNotification.targetUserEmail,
          isAcknowledged: newNotification.isAcknowledged,
          type: NotificationType[newNotification.type],
          timestamp: newNotification.timestamp,
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
