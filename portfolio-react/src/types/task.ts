export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'completed';
export type Category = 'work' | 'personal' | 'shopping' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category?: Category;
  createdAt: Date;
  dueDate?: Date; 
  notes?: string;
}
