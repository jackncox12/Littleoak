'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task, TaskCategory } from '@/lib/types';
import { useApp } from '@/lib/AppContext';

const CATEGORIES: { value: TaskCategory; label: string; emoji: string }[] = [
  { value: 'chores', label: 'Chores', emoji: '🧹' },
  { value: 'school', label: 'School', emoji: '📚' },
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'health', label: 'Health', emoji: '❤️' },
  { value: 'finance', label: 'Finance', emoji: '💰' },
  { value: 'general', label: 'General', emoji: '📋' },
];

interface Props {
  task?: Task | null;
  onClose: () => void;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function TaskModal({ task, onClose }: Props) {
  const { data, addTask, updateTask, removeTask } = useApp();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<Partial<Task>>({
    title: '',
    priority: 'medium',
    category: 'general',
    memberIds: [],
    dueDate: '',
    notes: '',
  });

  useEffect(() => {
    if (task) setForm(task);
  }, [task]);

  const set = (field: string, value: unknown) =>
    setForm(f => ({ ...f, [field]: value }));

  const toggleMember = (id: string) => {
    const ids = form.memberIds || [];
    set('memberIds', ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) return;
    const payload: Task = {
      id: task?.id || uid(),
      title: form.title!,
      completed: task?.completed || false,
      priority: form.priority as Task['priority'],
      category: form.category as TaskCategory,
      memberIds: form.memberIds || [],
      dueDate: form.dueDate,
      notes: form.notes,
      createdAt: task?.createdAt || today,
    };
    if (task) {
      updateTask(payload);
    } else {
      addTask(payload);
    }
    onClose();
  };

  const priorityColors = {
    low: 'border-green-400 bg-green-50 text-green-700',
    medium: 'border-amber-400 bg-amber-50 text-amber-700',
    high: 'border-red-400 bg-red-50 text-red-700',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold text-gray-900">
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task *</label>
            <input
              type="text"
              value={form.title || ''}
              onChange={e => set('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="What needs to be done?"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set('priority', p)}
                  className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium capitalize transition-all ${
                    form.priority === p ? priorityColors[p] : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {p === 'high' ? '🔴' : p === 'medium' ? '🟡' : '🟢'} {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => set('category', c.value)}
                  className={`flex items-center gap-1.5 p-2 rounded-lg border text-xs font-medium transition-all ${
                    form.category === c.value
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={form.dueDate || ''}
              onChange={e => set('dueDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign to</label>
            <div className="flex flex-wrap gap-2">
              {data.members.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMember(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                    (form.memberIds || []).includes(m.id) ? 'text-white' : 'bg-white text-gray-600'
                  }`}
                  style={
                    (form.memberIds || []).includes(m.id)
                      ? { backgroundColor: m.color, borderColor: m.color }
                      : { borderColor: m.color + '60' }
                  }
                >
                  {m.avatar} {m.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={form.notes || ''}
              onChange={e => set('notes', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              placeholder="Any notes..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            {task && (
              <button
                type="button"
                onClick={() => { removeTask(task.id); onClose(); }}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
            )}
            <div className="flex-1" />
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              {task ? 'Save' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
