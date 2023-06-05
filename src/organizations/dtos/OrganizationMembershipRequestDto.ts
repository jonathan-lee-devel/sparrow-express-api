/**
 * DTO which represents a request to join an organization.
 */
export interface OrganizationMembershipRequestDto {
    id: string;
    organizationId: string;
    requestingUserEmail: string;
    isApproved: boolean;
    approvingAdministratorEmail?: string;
}
