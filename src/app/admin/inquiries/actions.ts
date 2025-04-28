/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/app/lib/mongoose';
import Contact, { IContact } from '@/app/lib/models/Contact';

export async function getContacts(status?: string, read?: boolean) {
  try {
    await connectToDatabase();
    
    const query: any = {};
    if (status) query.status = status;
    if (read !== undefined) query.read = read;
    
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(contacts)) };
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return { success: false, error: error.message };
  }
}

export async function getContactById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid contact ID' };
    }

    await connectToDatabase();
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return { success: false, error: 'Contact not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(contact)) };
  } catch (error: any) {
    console.error('Error fetching contact:', error);
    return { success: false, error: error.message };
  }
}

export async function updateContactStatus(id: string, status: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid contact ID' };
    }

    await connectToDatabase();
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    
    if (!contact) {
      return { success: false, error: 'Contact not found' };
    }
    
    revalidatePath('/admin/inquiries');
    revalidatePath(`/admin/inquiries/${id}`);
    
    return { success: true, data: JSON.parse(JSON.stringify(contact)) };
  } catch (error: any) {
    console.error('Error updating contact status:', error);
    return { success: false, error: error.message };
  }
}

export async function markContactAsRead(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid contact ID' };
    }

    await connectToDatabase();
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { $set: { read: true } },
      { new: true }
    );
    
    if (!contact) {
      return { success: false, error: 'Contact not found' };
    }
    
    revalidatePath('/admin/inquiries');
    revalidatePath(`/admin/inquiries/${id}`);
    
    return { success: true, data: JSON.parse(JSON.stringify(contact)) };
  } catch (error: any) {
    console.error('Error marking contact as read:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteContact(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { success: false, error: 'Invalid contact ID' };
    }

    await connectToDatabase();
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      return { success: false, error: 'Contact not found' };
    }
    
    revalidatePath('/admin/inquiries');
    
    return { success: true, message: 'Contact deleted successfully' };
  } catch (error: any) {
    console.error('Error deleting contact:', error);
    return { success: false, error: error.message };
  }
}


// Get counts for dashboard
export async function getContactCounts() {
  try {
    await connectToDatabase();
    
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ read: false });
    const pending = await Contact.countDocuments({ status: 'pending' });
    const inProgress = await Contact.countDocuments({ status: 'inProgress' });
    const completed = await Contact.countDocuments({ status: 'completed' });
    
    return { 
      success: true, 
      data: { total, unread, pending, inProgress, completed } 
    };
  } catch (error: any) {
    console.error('Error fetching contact counts:', error);
    return { success: false, error: error.message };
  }
}