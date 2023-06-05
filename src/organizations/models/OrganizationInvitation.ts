import mongoose from 'mongoose';

const {model, Schema} = mongoose;

/**
 * Data model representation of an invitation to join an organization.
 */
export interface OrganizationInvitation {
    id: string;
    organizationId: string;
    requestingUserEmail: string;
    isAccepted: boolean;
    value: string;
    expiryDate: Date;
    emailToInvite: string;
}

const schema = new Schema<OrganizationInvitation>({
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
  isAccepted: {
    type: Boolean,
    required: true,
    unique: false,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
  expiryDate: {
    type: Date,
    required: true,
    unique: false,
  },
  emailToInvite: {
    type: String,
    required: true,
    unique: false,
  },
});

export const OrganizationInvitationModel = model<OrganizationInvitation>('OrganizationInvitation', schema);
