import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {NotificationDto} from '../dto/NotificationDto';

export type GetUnacknowledgedNotificationsFunction = (
    requestingUser: User,
) => Promise<StatusDataContainer<NotificationDto[]>>;
