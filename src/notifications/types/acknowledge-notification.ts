import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {NotificationDto} from '../dto/NotificationDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type AcknowledgeNotificationFunction = (
    requestingUser: User,
    notificationId: string,
) => Promise<StatusDataContainer<NotificationDto | ErrorDto>>;
