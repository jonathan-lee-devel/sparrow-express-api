import mongoose from 'mongoose';

const {model, Schema} = mongoose;

export interface Delivery {
    id: string;
    creatorEmail: string;
    assignedDriverEmail: string;
    organizationId: string;
    title: string;
    details: string;
    isDelivered: boolean;
}

const schema = new Schema<Delivery>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  creatorEmail: {
    type: String,
    required: true,
    unique: false,
  },
  assignedDriverEmail: {
    type: String,
    required: true,
    unique: false,
  },
  organizationId: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  details: {
    type: String,
    required: true,
    unique: false,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    unique: false,
  },
});

export const DeliveryModel = model<Delivery>('Delivery', schema);
