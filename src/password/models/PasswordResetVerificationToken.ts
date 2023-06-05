import mongoose from 'mongoose';

const {model, Schema} = mongoose;

/**
 * Model for password reset verification token.
 */
export interface PasswordResetVerificationToken {
    value: string;
    expiryDate: Date;
    userEmail: string;
}

const schema = new Schema<PasswordResetVerificationToken>({
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

export const PasswordResetVerificationTokenModel =
    model<PasswordResetVerificationToken>(
        'PasswordResetVerificationToken', schema,
    );
