import { AppData, FamilyMember, CalendarEvent, Task, GroceryList, Note } from './types';

const STORAGE_KEY = 'littleoak_family_data';

const DEFAULT_MEMBERS: FamilyMember[] = [
  { id: 'm1', name: 'Mum', color: '#8B5CF6', avatar: '👩', role: 'parent' },
  { id: 'm2', name: 'Dad', color: '#3B82F6', avatar: '👨', role: 'parent' },
  { id: 'm3', name: 'Child 1', color: '#10B981', avatar: '🧒', role: 'child' },
  { id: 'm4', name: 'Child 2', color: '#F59E0B', avatar: '👧', role: 'child' },
];

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

const DEFAULT_DATA: AppData = {
  familyName: 'Our Family',
  members: DEFAULT_MEMBERS,
  events: [
    {
      id: 'e1',
      title: 'School Run',
      date: today,
      time: '08:30',
      endTime: '09:00',
      category: 'school',
      memberIds: ['m1', 'm3', 'm4'],
      recurring: 'daily',
    },
    {
      id: 'e2',
      title: 'Football Practice',
      date: tomorrow,
      time: '16:00',
      endTime: '17:30',
      category: 'sport',
      memberIds: ['m3'],
      description: 'Bring water bottle and shin pads',
    },
    {
      id: 'e3',
      title: 'Family Dinner',
      date: tomorrow,
      time: '18:30',
      category: 'family',
      memberIds: ['m1', 'm2', 'm3', 'm4'],
    },
    {
      id: 'e4',
      title: 'Doctor Appointment',
      date: nextWeek,
      time: '10:00',
      endTime: '10:30',
      category: 'appointment',
      memberIds: ['m4'],
      description: 'Annual check-up',
    },
  ],
  tasks: [
    {
      id: 't1',
      title: 'Tidy bedroom',
      completed: false,
      priority: 'medium',
      category: 'chores',
      memberIds: ['m3'],
      createdAt: today,
    },
    {
      id: 't2',
      title: 'Pay electricity bill',
      completed: false,
      priority: 'high',
      dueDate: nextWeek,
      category: 'finance',
      memberIds: ['m2'],
      createdAt: today,
    },
    {
      id: 't3',
      title: 'Wash school uniforms',
      completed: false,
      priority: 'high',
      dueDate: tomorrow,
      category: 'chores',
      memberIds: ['m1'],
      createdAt: today,
    },
    {
      id: 't4',
      title: 'Book dentist appointment',
      completed: false,
      priority: 'medium',
      category: 'health',
      memberIds: ['m1', 'm2'],
      createdAt: today,
    },
  ],
  groceryLists: [
    {
      id: 'g1',
      name: 'Weekly Shop',
      isActive: true,
      createdAt: today,
      items: [
        { id: 'gi1', name: 'Milk', quantity: '2', unit: 'litres', category: 'dairy', checked: false },
        { id: 'gi2', name: 'Bread', quantity: '1', unit: 'loaf', category: 'bakery', checked: false },
        { id: 'gi3', name: 'Eggs', quantity: '12', unit: '', category: 'dairy', checked: false },
        { id: 'gi4', name: 'Bananas', quantity: '1', unit: 'bunch', category: 'produce', checked: true },
        { id: 'gi5', name: 'Chicken fillets', quantity: '500', unit: 'g', category: 'meat', checked: false },
        { id: 'gi6', name: 'Pasta', quantity: '2', unit: 'packs', category: 'pantry', checked: false },
        { id: 'gi7', name: 'Washing powder', quantity: '1', unit: 'box', category: 'household', checked: false },
        { id: 'gi8', name: 'Orange juice', quantity: '1', unit: 'carton', category: 'beverages', checked: false },
      ],
    },
  ],
  notes: [
    {
      id: 'n1',
      title: 'Emergency Numbers',
      content: 'GP Surgery: 01234 567890\nSchool: 01234 567891\nNanny: 07700 900123',
      createdAt: today,
      updatedAt: today,
      memberIds: ['m1', 'm2'],
      pinned: true,
    },
  ],
};

export function loadData(): AppData {
  if (typeof window === 'undefined') return DEFAULT_DATA;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_DATA;
    return JSON.parse(stored) as AppData;
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveData(data: AppData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
