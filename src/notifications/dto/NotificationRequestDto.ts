import {NotificationType} from '../enums/NotificationType';

export interface NotificationRequestDto {
    targetUserEmail: string;
    title: string;
    content: string;
    timestamp: Date;
    type: NotificationType;
    isAcknowledged: boolean;
}
