'use server';

import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/app/lib/mongoose';
import JobApplication, { IJobApplication } from '@/app/lib/models/JobApplication';

export async function getJobApplications(status?: string, read?: boolean) {
  try {
    await connectToDatabase();
    
    const query: any = {};
    if (status) query.status = status;
    if (read !== undefined) query.read = read;
    
    const applications = await JobApplication.find(query).sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(applications)) };
  } catch (error: any) {
    console.error('Error fetching job applications:', error);
    return { success: false, error: error.message };
  }
}

export async function getJobApplicationById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid job application ID' };
    }

    await connectToDatabase();
    const application = await JobApplication.findById(id);
    
    if (!application) {
      return { success: false, error: 'Job application not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(application)) };
  } catch (error: any) {
    console.error('Error fetching job application:', error);
    return { success: false, error: error.message };
  }
}

export async function updateJobApplicationStatus(id: string, status: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid job application ID' };
    }

    await connectToDatabase();
    
    const application = await JobApplication.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    
    if (!application) {
      return { success: false, error: 'Job application not found' };
    }
    
    revalidatePath('/admin/job-applications');
    revalidatePath(`/admin/job-applications/${id}`);
    
    return { success: true, data: JSON.parse(JSON.stringify(application)) };
  } catch (error: any) {
    console.error('Error updating job application status:', error);
    return { success: false, error: error.message };
  }
}

export async function markJobApplicationAsRead(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid job application ID' };
    }

    await connectToDatabase();
    
    const application = await JobApplication.findByIdAndUpdate(
      id,
      { $set: { read: true } },
      { new: true }
    );
    
    if (!application) {
      return { success: false, error: 'Job application not found' };
    }
    
    revalidatePath('/admin/job-applications');
    revalidatePath(`/admin/job-applications/${id}`);
    
    return { success: true, data: JSON.parse(JSON.stringify(application)) };
  } catch (error: any) {
    console.error('Error marking job application as read:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteJobApplication(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid job application ID' };
    }

    await connectToDatabase();
    const application = await JobApplication.findByIdAndDelete(id);
    
    if (!application) {
      return { success: false, error: 'Job application not found' };
    }
    
    revalidatePath('/admin/job-applications');
    
    return { success: true, message: 'Job application deleted successfully' };
  } catch (error: any) {
    console.error('Error deleting job application:', error);
    return { success: false, error: error.message };
  }
}

// Get counts for dashboard
export async function getJobApplicationCounts() {
  try {
    await connectToDatabase();
    
    const total = await JobApplication.countDocuments();
    const unread = await JobApplication.countDocuments({ read: false });
    const pending = await JobApplication.countDocuments({ status: 'pending' });
    const reviewed = await JobApplication.countDocuments({ status: 'reviewed' });
    const contacted = await JobApplication.countDocuments({ status: 'contacted' });
    const rejected = await JobApplication.countDocuments({ status: 'rejected' });
    
    return { 
      success: true, 
      data: { total, unread, pending, reviewed, contacted, rejected } 
    };
  } catch (error: any) {
    console.error('Error fetching job application counts:', error);
    return { success: false, error: error.message };
  }
}