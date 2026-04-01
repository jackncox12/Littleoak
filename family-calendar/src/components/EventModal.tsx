'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CalendarEvent, EventCategory } from '@/lib/types';
import { useApp } from '@/lib/AppContext';

const CATEGORIES: { value: EventCategory; label: string; emoji: string }[] = [
  { value: 'appointment', label: 'Appointment', emoji: '🏥' },
  { value: 'school', label: 'School', emoji: '🎒' },
  { value: 'sport', label: 'Sport', emoji: '⚽' },
  { value: 'family', label: 'Family', emoji: '🏠' },
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'holiday', label: 'Holiday', emoji: '✈️' },
  { value: 'other', label: 'Other', emoji: '📌' },
];

interface Props {
  event?: CalendarEvent | null;
  defaultDate?: string;
  onClose: () => void;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function EventModal({ event, defaultDate, onClose }: Props) {
  const { data, addEvent, updateEvent, removeEvent } = useApp();
  const [form, setForm] = useState<Partial<CalendarEvent>>({
    title: '',
    date: defaultDate || new Date().toISOString().split('T')[0],
    time: '',
    endTime: '',
    description: '',
    category: 'other',
    memberIds: [],
    recurring: 'none',
  });

  useEffect(() => {
    if (event) setForm(event);
  }, [event]);

  const set = (field: string, value: unknown) =>
    setForm(f => ({ ...f, [field]: value }));

  const toggleMember = (id: string) => {
    const ids = form.memberIds || [];
    set('memberIds', ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) return;
    const payload: CalendarEvent = {
      id: event?.id || uid(),
      title: form.title!,
      date: form.date!,
      time: form.time,
      endTime: form.endTime,
      description: form.description,
      category: form.category as EventCategory,
      memberIds: form.memberIds || [],
      recurring: form.recurring as CalendarEvent['recurring'],
    };
    if (event) {
      updateEvent(payload);
    } else {
      addEvent(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold text-gray-900">
            {event ? 'Edit Event' : 'New Event'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={form.title || ''}
              onChange={e => set('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Event title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                value={form.date || ''}
                onChange={e => set('date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={form.time || ''}
                onChange={e => set('time', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                value={form.endTime || ''}
                onChange={e => set('endTime', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Repeat</label>
              <select
                value={form.recurring || 'none'}
                onChange={e => set('recurring', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => set('category', c.value)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition-all ${
                    form.category === c.value
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who&apos;s involved?</label>
            <div className="flex flex-wrap gap-2">
              {data.members.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMember(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                    (form.memberIds || []).includes(m.id)
                      ? 'text-white'
                      : 'bg-white text-gray-600'
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
              value={form.description || ''}
              onChange={e => set('description', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              placeholder="Any notes..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            {event && (
              <button
                type="button"
                onClick={() => { removeEvent(event.id); onClose(); }}
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
              {event ? 'Save' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
