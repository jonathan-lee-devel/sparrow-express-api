import mongoose from 'mongoose';

const {model, Schema} = mongoose;

/**
 * Model used to represent a logged-in user.zs
 */
export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    emailVerified: boolean;
}

const schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    unique: false,
  },
});

export const UserModel = model<User>('User', schema);
