import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {NotificationDto} from '../dto/NotificationDto';

export type GetNotificationByIdFunction = (
    requestingUser: User,
    notificationId: string,
) => Promise<StatusDataContainer<NotificationDto>>;
