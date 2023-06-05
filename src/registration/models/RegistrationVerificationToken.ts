import mongoose from 'mongoose';

const {model, Schema} = mongoose;

export interface RegistrationVerificationToken {
    value: string;
    expiryDate: Date;
    userEmail: string;
}

const schema = new Schema<RegistrationVerificationToken>({
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
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
});

export const RegistrationVerificationTokenModel =
    model<RegistrationVerificationToken>(
        'RegistrationVerificationToken', schema,
    );
