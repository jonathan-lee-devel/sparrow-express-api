import mongoose from 'mongoose';

const {model, Schema} = mongoose;

/**
 * Data model representation of a request to join an organization.
 */
export interface OrganizationMembershipRequest {
    id: string;
    organizationId: string;
    requestingUserEmail: string;
    isApproved: boolean,
    approvingAdministratorEmail?: string;
}

const schema = new Schema<OrganizationMembershipRequest>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  organizationId: {
    type: String,
    required: true,
    unique: false,
  },
  requestingUserEmail: {
    type: String,
    required: true,
    unique: false,
  },
  isApproved: {
    type: Boolean,
    required: true,
    unique: false,
  },
  approvingAdministratorEmail: {
    type: String,
    required: false,
    unique: false,
  },
});

export const OrganizationMembershipRequestModel = model<OrganizationMembershipRequest>('OrganizationMembershipRequest', schema);
