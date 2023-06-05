import {NotificationRequestDto} from '../dto/NotificationRequestDto';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {NotificationDto} from '../dto/NotificationDto';

export type CreateNotificationFunction = (
    notification: NotificationRequestDto,
) => Promise<StatusDataContainer<NotificationDto>>;
