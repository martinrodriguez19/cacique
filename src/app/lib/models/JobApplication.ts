import mongoose, { Document, Schema } from 'mongoose';

export interface IJobApplication extends Document {
  nombre: string;
  email: string;
  telefono: string;
  puesto: string;
  experiencia: string;
  mensaje?: string;
  cvUrl: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'rejected';
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    puesto: { type: String, required: true },
    experiencia: { type: String, required: true },
    mensaje: { type: String },
    cvUrl: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'reviewed', 'contacted', 'rejected'], 
      default: 'pending' 
    },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.JobApplication || 
  mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);