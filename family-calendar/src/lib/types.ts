export interface FamilyMember {
  id: string;
  name: string;
  color: string;
  avatar: string;
  role: 'parent' | 'child';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  time?: string; // HH:MM
  endTime?: string;
  description?: string;
  category: EventCategory;
  memberIds: string[]; // which family members
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly';
  color?: string;
}

export type EventCategory =
  | 'appointment'
  | 'school'
  | 'sport'
  | 'family'
  | 'work'
  | 'birthday'
  | 'holiday'
  | 'other';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  category: TaskCategory;
  memberIds: string[];
  notes?: string;
  createdAt: string;
}

export type TaskCategory =
  | 'chores'
  | 'school'
  | 'work'
  | 'health'
  | 'finance'
  | 'general';

export interface GroceryItem {
  id: string;
  name: string;
  quantity?: string;
  unit?: string;
  category: GroceryCategory;
  checked: boolean;
  addedBy?: string; // memberId
  notes?: string;
}

export type GroceryCategory =
  | 'produce'
  | 'dairy'
  | 'meat'
  | 'bakery'
  | 'frozen'
  | 'pantry'
  | 'beverages'
  | 'household'
  | 'personal'
  | 'other';

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  createdAt: string;
  isActive: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  memberIds: string[];
  pinned: boolean;
}

export interface AppData {
  familyName: string;
  members: FamilyMember[];
  events: CalendarEvent[];
  tasks: Task[];
  groceryLists: GroceryList[];
  notes: Note[];
}
