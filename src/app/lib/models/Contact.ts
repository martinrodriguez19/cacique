import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  project?: string;
  status: 'pending' | 'inProgress' | 'completed';
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    project: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'inProgress', 'completed'], 
      default: 'pending' 
    },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);