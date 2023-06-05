export interface NotificationDto {
    id: string;
    targetUserEmail: string;
    title: string;
    content: string;
    timestamp: Date;
    type: string;
    isAcknowledged: boolean;
}
