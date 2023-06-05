import mongoose from 'mongoose';

const {model, Schema} = mongoose;

/**
 * Data model representation of an organization.
 */
export interface Organization {
    id: string;
    name: string;
    memberEmails: Array<string>;
    administratorEmails: Array<string>;
}

const schema = new Schema<Organization>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  memberEmails: {},
  administratorEmails: {},
});

export const OrganizationModel = model<Organization>('Organization', schema);
