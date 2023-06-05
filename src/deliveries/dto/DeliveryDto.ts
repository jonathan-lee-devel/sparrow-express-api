export interface DeliveryDto {
    id: string;
    creatorEmail: string;
    assignedDriverEmail: string;
    organizationId: string;
    title: string;
    details: string;
    isDelivered: boolean;
}
