/**
 * DTO which represents an invitation to join an organization.
 */
export interface OrganizationInvitationDto {
    organizationId: string;
    requestingUserEmail: string;
    isAccepted: boolean;
    value: string;
    expiryDate: Date;
    emailToInvite: string;
}
