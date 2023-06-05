import mongoose from 'mongoose';
import {NotificationType} from '../enums/NotificationType';

const {model, Schema} = mongoose;

export interface Notification {
    id: string;
    targetUserEmail: string;
    title: string;
    content: string;
    timestamp: Date;
    type: NotificationType;
    isAcknowledged: boolean;
}

const schema = new Schema<Notification>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  targetUserEmail: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  content: {
    type: String,
    required: true,
    unique: false,
  },
  timestamp: {
    type: Date,
    required: true,
    unique: false,
  },
  type: {
    type: Number,
    required: true,
    unique: false,
  },
  isAcknowledged: {
    type: Boolean,
    required: true,
    unique: false,
  },
});

export const NotificationModel = model<Notification>('Notification', schema);
