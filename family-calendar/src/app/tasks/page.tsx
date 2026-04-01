'use client';

import { useState } from 'react';
import { format, parseISO, isPast } from 'date-fns';
import { Plus, Filter, CheckCircle2, Circle } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import TaskModal from '@/components/TaskModal';
import { Task, TaskCategory } from '@/lib/types';

const CATEGORY_EMOJI: Record<TaskCategory, string> = {
  chores: '🧹', school: '📚', work: '💼', health: '❤️', finance: '💰', general: '📋',
};

const PRIORITY_STYLES = {
  high: { dot: 'bg-red-500', badge: 'bg-red-50 text-red-600', label: 'High' },
  medium: { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-600', label: 'Medium' },
  low: { dot: 'bg-green-400', badge: 'bg-green-50 text-green-600', label: 'Low' },
};

export default function TasksPage() {
  const { data, toggleTask } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null | undefined>(undefined);
  const [filterMember, setFilterMember] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(false);

  const filtered = data.tasks.filter(t => {
    if (!showCompleted && t.completed) return false;
    if (showCompleted && !t.completed) return false;
    if (filterMember !== 'all' && !t.memberIds.includes(filterMember)) return false;
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    return true;
  });

  const grouped = filtered.reduce<Record<string, Task[]>>((acc, task) => {
    const key = task.priority;
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  const priorityOrder = ['high', 'medium', 'low'] as const;

  const completedCount = data.tasks.filter(t => t.completed).length;
  const totalCount = data.tasks.length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {data.tasks.filter(t => !t.completed).length} pending · {completedCount} done
          </p>
        </div>
        <button
          onClick={() => { setEditingTask(null); setShowModal(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Progress bar */}
      {totalCount > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall progress</span>
            <span className="text-sm text-gray-500">{completedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-violet-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Filter size={14} />
        </div>
        {/* Member filter */}
        <button
          onClick={() => setFilterMember('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterMember === 'all' ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          Everyone
        </button>
        {data.members.map(m => (
          <button
            key={m.id}
            onClick={() => setFilterMember(filterMember === m.id ? 'all' : m.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border-2 ${filterMember === m.id ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            style={filterMember === m.id ? { backgroundColor: m.color, borderColor: m.color } : { borderColor: m.color + '40' }}
          >
            {m.avatar} {m.name}
          </button>
        ))}
        <div className="w-px bg-gray-200 mx-1" />
        {/* Completed toggle */}
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${showCompleted ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          {showCompleted ? '✅ Completed' : '⬜ Pending'}
        </button>
      </div>

      {/* Task groups */}
      {!showCompleted && (
        <div className="space-y-6">
          {priorityOrder.map(priority => {
            const tasks = grouped[priority] || [];
            if (tasks.length === 0) return null;
            const style = PRIORITY_STYLES[priority];
            return (
              <div key={priority}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {style.label} Priority
                  </h3>
                  <span className="text-xs text-gray-400">({tasks.length})</span>
                </div>
                <div className="space-y-2">
                  {tasks.map(task => <TaskCard key={task.id} task={task} onEdit={() => setEditingTask(task)} />)}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-gray-500 font-medium">All done! Nothing pending.</p>
              <button
                onClick={() => { setEditingTask(null); setShowModal(true); }}
                className="mt-4 text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                + Add a new task
              </button>
            </div>
          )}
        </div>
      )}

      {/* Completed tasks */}
      {showCompleted && (
        <div className="space-y-2">
          {filtered.map(task => <TaskCard key={task.id} task={task} onEdit={() => setEditingTask(task)} />)}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">No completed tasks yet</p>
            </div>
          )}
        </div>
      )}

      {(showModal || editingTask !== undefined) && (
        <TaskModal
          task={editingTask ?? null}
          onClose={() => { setShowModal(false); setEditingTask(undefined); }}
        />
      )}
    </div>
  );
}

function TaskCard({ task, onEdit }: { task: Task; onEdit: () => void }) {
  const { data, toggleTask } = useApp();
  const members = data.members.filter(m => task.memberIds.includes(m.id));
  const isOverdue = !task.completed && task.dueDate && isPast(parseISO(task.dueDate + 'T23:59:59'));

  return (
    <div className={`bg-white rounded-xl border shadow-sm p-4 flex items-start gap-3 hover:border-violet-200 transition-colors ${task.completed ? 'opacity-60' : ''} ${isOverdue ? 'border-red-200' : 'border-gray-100'}`}>
      <button
        onClick={() => toggleTask(task.id)}
        className="mt-0.5 shrink-0 text-gray-300 hover:text-violet-500 transition-colors"
      >
        {task.completed
          ? <CheckCircle2 size={20} className="text-emerald-500" />
          : <Circle size={20} />}
      </button>
      <div className="flex-1 min-w-0 cursor-pointer" onClick={onEdit}>
        <div className="flex items-start gap-2 flex-wrap">
          <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </p>
          {isOverdue && !task.completed && (
            <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-medium">Overdue</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs text-gray-400">{CATEGORY_EMOJI[task.category]} {task.category}</span>
          {task.dueDate && (
            <span className={`text-xs ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
              · Due {format(parseISO(task.dueDate), 'd MMM')}
            </span>
          )}
          {task.notes && <span className="text-xs text-gray-400">· 📝 Note</span>}
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {members.map(m => (
          <div
            key={m.id}
            title={m.name}
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white"
            style={{ backgroundColor: m.color + '30', borderColor: m.color + '50' }}
          >
            {m.avatar}
          </div>
        ))}
      </div>
    </div>
  );
}
