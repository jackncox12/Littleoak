'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppData, CalendarEvent, Task, GroceryList, GroceryItem, FamilyMember, Note } from './types';
import { loadData, saveData } from './storage';

interface AppContextType {
  data: AppData;
  // Family
  updateFamilyName: (name: string) => void;
  addMember: (member: FamilyMember) => void;
  updateMember: (member: FamilyMember) => void;
  removeMember: (id: string) => void;
  // Events
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  removeEvent: (id: string) => void;
  // Tasks
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  // Grocery
  addGroceryList: (list: GroceryList) => void;
  updateGroceryList: (list: GroceryList) => void;
  removeGroceryList: (id: string) => void;
  addGroceryItem: (listId: string, item: GroceryItem) => void;
  updateGroceryItem: (listId: string, item: GroceryItem) => void;
  removeGroceryItem: (listId: string, itemId: string) => void;
  toggleGroceryItem: (listId: string, itemId: string) => void;
  clearCheckedItems: (listId: string) => void;
  // Notes
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  removeNote: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadData());

  useEffect(() => {
    saveData(data);
  }, [data]);

  const updateData = useCallback((updater: (prev: AppData) => AppData) => {
    setData(updater);
  }, []);

  const updateFamilyName = (name: string) =>
    updateData(d => ({ ...d, familyName: name }));

  const addMember = (member: FamilyMember) =>
    updateData(d => ({ ...d, members: [...d.members, member] }));

  const updateMember = (member: FamilyMember) =>
    updateData(d => ({ ...d, members: d.members.map(m => m.id === member.id ? member : m) }));

  const removeMember = (id: string) =>
    updateData(d => ({ ...d, members: d.members.filter(m => m.id !== id) }));

  const addEvent = (event: CalendarEvent) =>
    updateData(d => ({ ...d, events: [...d.events, event] }));

  const updateEvent = (event: CalendarEvent) =>
    updateData(d => ({ ...d, events: d.events.map(e => e.id === event.id ? event : e) }));

  const removeEvent = (id: string) =>
    updateData(d => ({ ...d, events: d.events.filter(e => e.id !== id) }));

  const addTask = (task: Task) =>
    updateData(d => ({ ...d, tasks: [...d.tasks, task] }));

  const updateTask = (task: Task) =>
    updateData(d => ({ ...d, tasks: d.tasks.map(t => t.id === task.id ? task : t) }));

  const removeTask = (id: string) =>
    updateData(d => ({ ...d, tasks: d.tasks.filter(t => t.id !== id) }));

  const toggleTask = (id: string) =>
    updateData(d => ({
      ...d,
      tasks: d.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));

  const addGroceryList = (list: GroceryList) =>
    updateData(d => ({ ...d, groceryLists: [...d.groceryLists, list] }));

  const updateGroceryList = (list: GroceryList) =>
    updateData(d => ({ ...d, groceryLists: d.groceryLists.map(g => g.id === list.id ? list : g) }));

  const removeGroceryList = (id: string) =>
    updateData(d => ({ ...d, groceryLists: d.groceryLists.filter(g => g.id !== id) }));

  const addGroceryItem = (listId: string, item: GroceryItem) =>
    updateData(d => ({
      ...d,
      groceryLists: d.groceryLists.map(g =>
        g.id === listId ? { ...g, items: [...g.items, item] } : g
      )
    }));

  const updateGroceryItem = (listId: string, item: GroceryItem) =>
    updateData(d => ({
      ...d,
      groceryLists: d.groceryLists.map(g =>
        g.id === listId
          ? { ...g, items: g.items.map(i => i.id === item.id ? item : i) }
          : g
      )
    }));

  const removeGroceryItem = (listId: string, itemId: string) =>
    updateData(d => ({
      ...d,
      groceryLists: d.groceryLists.map(g =>
        g.id === listId ? { ...g, items: g.items.filter(i => i.id !== itemId) } : g
      )
    }));

  const toggleGroceryItem = (listId: string, itemId: string) =>
    updateData(d => ({
      ...d,
      groceryLists: d.groceryLists.map(g =>
        g.id === listId
          ? { ...g, items: g.items.map(i => i.id === itemId ? { ...i, checked: !i.checked } : i) }
          : g
      )
    }));

  const clearCheckedItems = (listId: string) =>
    updateData(d => ({
      ...d,
      groceryLists: d.groceryLists.map(g =>
        g.id === listId ? { ...g, items: g.items.filter(i => !i.checked) } : g
      )
    }));

  const addNote = (note: Note) =>
    updateData(d => ({ ...d, notes: [...d.notes, note] }));

  const updateNote = (note: Note) =>
    updateData(d => ({ ...d, notes: d.notes.map(n => n.id === note.id ? note : n) }));

  const removeNote = (id: string) =>
    updateData(d => ({ ...d, notes: d.notes.filter(n => n.id !== id) }));

  return (
    <AppContext.Provider value={{
      data,
      updateFamilyName, addMember, updateMember, removeMember,
      addEvent, updateEvent, removeEvent,
      addTask, updateTask, removeTask, toggleTask,
      addGroceryList, updateGroceryList, removeGroceryList,
      addGroceryItem, updateGroceryItem, removeGroceryItem,
      toggleGroceryItem, clearCheckedItems,
      addNote, updateNote, removeNote,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
