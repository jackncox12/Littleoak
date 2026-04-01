'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Plus, Pin, Trash2, Edit2, X, Check } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { Note } from '@/lib/types';

function uid() { return Math.random().toString(36).slice(2, 10); }

export default function NotesPage() {
  const { data, addNote, updateNote, removeNote } = useApp();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });

  const today = new Date().toISOString().split('T')[0];

  const sorted = [...data.notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.updatedAt.localeCompare(a.updatedAt);
  });

  const startCreate = () => {
    setForm({ title: '', content: '' });
    setEditingNote(null);
    setIsCreating(true);
  };

  const startEdit = (note: Note) => {
    setForm({ title: note.title, content: note.content });
    setEditingNote(note);
    setIsCreating(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingNote) {
      updateNote({ ...editingNote, title: form.title, content: form.content, updatedAt: today });
    } else {
      addNote({
        id: uid(),
        title: form.title.trim(),
        content: form.content.trim(),
        createdAt: today,
        updatedAt: today,
        memberIds: [],
        pinned: false,
      });
    }
    setIsCreating(false);
    setEditingNote(null);
    setForm({ title: '', content: '' });
  };

  const togglePin = (note: Note) => {
    updateNote({ ...note, pinned: !note.pinned });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-500 text-sm mt-0.5">{data.notes.length} notes</p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
        >
          <Plus size={16} /> New Note
        </button>
      </div>

      {/* Create / Edit form */}
      {isCreating && (
        <div className="bg-white rounded-2xl border-2 border-violet-200 shadow-md p-5 mb-6">
          <input
            type="text"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Note title"
            className="w-full text-lg font-semibold text-gray-900 border-none outline-none mb-3 placeholder:text-gray-300"
            autoFocus
          />
          <textarea
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            placeholder="Write your note here..."
            rows={6}
            className="w-full text-sm text-gray-700 border-none outline-none resize-none placeholder:text-gray-300"
          />
          <div className="flex gap-2 pt-3 border-t border-gray-100 mt-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              <Check size={15} /> {editingNote ? 'Save changes' : 'Save note'}
            </button>
            <button
              onClick={() => { setIsCreating(false); setEditingNote(null); }}
              className="flex items-center gap-1.5 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm transition-colors"
            >
              <X size={15} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes grid */}
      {sorted.length === 0 && !isCreating && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-gray-500 font-medium">No notes yet</p>
          <p className="text-gray-400 text-sm mt-1">Great for emergency numbers, routines, reminders</p>
          <button onClick={startCreate} className="mt-4 text-sm text-violet-600 font-medium hover:text-violet-700">
            + Create your first note
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(note => (
          <div
            key={note.id}
            className={`bg-white rounded-2xl border shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow ${note.pinned ? 'border-amber-200' : 'border-gray-100'}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-sm flex-1 leading-snug">{note.title}</h3>
              <button
                onClick={() => togglePin(note)}
                className={`p-1 rounded-lg transition-colors shrink-0 ${note.pinned ? 'text-amber-500 bg-amber-50' : 'text-gray-300 hover:text-amber-400'}`}
                title={note.pinned ? 'Unpin' : 'Pin'}
              >
                <Pin size={14} />
              </button>
            </div>
            <p className="text-sm text-gray-600 flex-1 whitespace-pre-wrap leading-relaxed line-clamp-6">
              {note.content || <span className="text-gray-300 italic">Empty note</span>}
            </p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
              <span className="text-xs text-gray-400">
                {format(parseISO(note.updatedAt), 'd MMM yyyy')}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => startEdit(note)}
                  className="p-1.5 text-gray-400 hover:text-violet-500 hover:bg-violet-50 rounded-lg transition-colors"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => { if (confirm('Delete this note?')) removeNote(note.id); }}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
