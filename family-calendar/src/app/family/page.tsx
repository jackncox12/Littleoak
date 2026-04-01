'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Users } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { FamilyMember } from '@/lib/types';

function uid() { return Math.random().toString(36).slice(2, 10); }

const PRESET_COLORS = [
  '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B',
  '#EF4444', '#EC4899', '#14B8A6', '#F97316',
];

const PRESET_AVATARS = ['👩', '👨', '🧒', '👧', '👦', '👩‍🦱', '👨‍🦱', '🧑', '👴', '👵', '🐶', '🐱'];

const MEMBER_ROLES: { value: FamilyMember['role']; label: string }[] = [
  { value: 'parent', label: 'Parent / Carer' },
  { value: 'child', label: 'Child' },
];

export default function FamilyPage() {
  const { data, updateFamilyName, addMember, updateMember, removeMember } = useApp();
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [familyNameDraft, setFamilyNameDraft] = useState(data.familyName);

  const blankMember = (): FamilyMember => ({
    id: uid(),
    name: '',
    color: PRESET_COLORS[data.members.length % PRESET_COLORS.length],
    avatar: '🧒',
    role: 'child',
  });

  const [form, setForm] = useState<FamilyMember>(blankMember);

  const startCreate = () => {
    setForm(blankMember());
    setEditingMember(null);
    setIsCreating(true);
  };

  const startEdit = (member: FamilyMember) => {
    setForm({ ...member });
    setEditingMember(member);
    setIsCreating(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editingMember) {
      updateMember(form);
    } else {
      addMember(form);
    }
    setIsCreating(false);
    setEditingMember(null);
  };

  const set = (field: string, value: string) =>
    setForm(f => ({ ...f, [field]: value }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Family</h1>
          <p className="text-gray-500 text-sm mt-0.5">{data.members.length} members</p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Family name */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-2xl">🌳</div>
          <div className="flex-1">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={familyNameDraft}
                  onChange={e => setFamilyNameDraft(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
                  autoFocus
                />
                <button
                  onClick={() => { updateFamilyName(familyNameDraft); setEditingName(false); }}
                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => { setFamilyNameDraft(data.familyName); setEditingName(false); }}
                  className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-bold text-gray-900 text-lg">{data.familyName}</p>
                  <p className="text-xs text-gray-400">Family name</p>
                </div>
                <button
                  onClick={() => setEditingName(true)}
                  className="p-1.5 text-gray-400 hover:text-violet-500 hover:bg-violet-50 rounded-lg transition-colors ml-2"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create / Edit form */}
      {isCreating && (
        <div className="bg-white rounded-2xl border-2 border-violet-200 shadow-md p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">{editingMember ? 'Edit member' : 'Add family member'}</h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="First name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="flex gap-2">
                {MEMBER_ROLES.map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => set('role', r.value)}
                    className={`flex-1 py-2 text-sm rounded-lg border-2 font-medium transition-all ${
                      form.role === r.value
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_AVATARS.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => set('avatar', a)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 transition-all ${
                    form.avatar === a ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Colour</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set('color', c)}
                  className={`w-8 h-8 rounded-full border-4 transition-all ${
                    form.color === c ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-4 p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2"
              style={{ borderColor: form.color, backgroundColor: form.color + '20' }}
            >
              {form.avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{form.name || 'Name'}</p>
              <p className="text-xs capitalize" style={{ color: form.color }}>{form.role}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              <Check size={15} /> {editingMember ? 'Save changes' : 'Add member'}
            </button>
            <button
              onClick={() => { setIsCreating(false); setEditingMember(null); }}
              className="flex items-center gap-1.5 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm transition-colors"
            >
              <X size={15} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Members list */}
      {data.members.length === 0 && !isCreating ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <Users size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No family members yet</p>
          <button onClick={startCreate} className="mt-3 text-sm text-violet-600 font-medium hover:text-violet-700">
            + Add your first member
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {data.members.map(member => {
            const memberTasks = data.tasks.filter(t => !t.completed && t.memberIds.includes(member.id));
            const memberEvents = data.events.filter(e => {
              const today = new Date().toISOString().split('T')[0];
              return e.date >= today && e.memberIds.includes(member.id);
            });
            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl border-2 shadow-sm p-5"
                style={{ borderColor: member.color + '40' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 shrink-0"
                    style={{ borderColor: member.color, backgroundColor: member.color + '15' }}
                  >
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full capitalize"
                          style={{ backgroundColor: member.color + '20', color: member.color }}
                        >
                          {member.role}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEdit(member)}
                          className="p-1.5 text-gray-400 hover:text-violet-500 hover:bg-violet-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => { if (confirm(`Remove ${member.name}?`)) removeMember(member.id); }}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{memberTasks.length}</p>
                        <p className="text-xs text-gray-400">open tasks</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{memberEvents.length}</p>
                        <p className="text-xs text-gray-400">upcoming events</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member's upcoming events preview */}
                {memberEvents.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <p className="text-xs font-medium text-gray-500 mb-2">Next up</p>
                    <div className="space-y-1.5">
                      {memberEvents.slice(0, 3).map(e => (
                        <div key={e.id} className="flex items-center gap-2 text-xs text-gray-600">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: member.color }}
                          />
                          <span className="truncate">{e.title}</span>
                          <span className="text-gray-400 shrink-0">{e.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Member's pending tasks preview */}
                {memberTasks.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <p className="text-xs font-medium text-gray-500 mb-2">Pending tasks</p>
                    <div className="space-y-1.5">
                      {memberTasks.slice(0, 3).map(t => (
                        <div key={t.id} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.priority === 'high' ? 'bg-red-400' : t.priority === 'medium' ? 'bg-amber-400' : 'bg-green-400'}`} />
                          <span className="truncate">{t.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
