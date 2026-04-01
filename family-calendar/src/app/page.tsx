'use client';

import { useState } from 'react';
import { format, isToday, isTomorrow, parseISO, isThisWeek } from 'date-fns';
import { Plus, CalendarDays, CheckSquare, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import EventModal from '@/components/EventModal';
import TaskModal from '@/components/TaskModal';

const CATEGORY_EMOJI: Record<string, string> = {
  appointment: '🏥', school: '🎒', sport: '⚽', family: '🏠',
  work: '💼', birthday: '🎂', holiday: '✈️', other: '📌',
};

function dateLabel(dateStr: string) {
  const d = parseISO(dateStr);
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  return format(d, 'EEE d MMM');
}

export default function Dashboard() {
  const { data, toggleTask } = useApp();
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const upcomingEvents = data.events
    .filter(e => e.date >= today)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return (a.time || '').localeCompare(b.time || '');
    })
    .slice(0, 6);

  const pendingTasks = data.tasks
    .filter(t => !t.completed)
    .sort((a, b) => {
      const pri = { high: 0, medium: 1, low: 2 };
      return pri[a.priority] - pri[b.priority];
    })
    .slice(0, 5);

  const activeList = data.groceryLists.find(g => g.isActive);
  const uncheckedItems = activeList?.items.filter(i => !i.checked) || [];
  const totalItems = activeList?.items.length || 0;
  const checkedCount = totalItems - uncheckedItems.length;

  const todayEvents = data.events.filter(e => e.date === today);
  const weekEvents = data.events.filter(e => {
    try { return isThisWeek(parseISO(e.date), { weekStartsOn: 1 }); } catch { return false; }
  });
  const highPriorityTasks = data.tasks.filter(t => !t.completed && t.priority === 'high').length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'} 👋
        </h1>
        <p className="text-gray-500 mt-1">{format(new Date(), 'EEEE, d MMMM yyyy')}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <CalendarDays size={16} className="text-violet-600" />
            </div>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{todayEvents.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">events</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <CalendarDays size={16} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">This week</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{weekEvents.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">events</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <CheckSquare size={16} className="text-red-600" />
            </div>
            <span className="text-sm text-gray-500">Urgent tasks</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{highPriorityTasks}</p>
          <p className="text-xs text-gray-400 mt-0.5">high priority</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <ShoppingCart size={16} className="text-emerald-600" />
            </div>
            <span className="text-sm text-gray-500">Groceries</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{uncheckedItems.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">items to get</p>
        </div>
      </div>

      {/* Quick add row */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setShowEventModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Event
        </button>
        <button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Task
        </button>
        <Link
          href="/groceries"
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ShoppingCart size={16} /> Groceries
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900">Upcoming Events</h2>
            <Link href="/calendar" className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingEvents.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-400">No upcoming events</p>
            )}
            {upcomingEvents.map(event => {
              const members = data.members.filter(m => event.memberIds.includes(m.id));
              return (
                <div key={event.id} className="px-5 py-3 flex items-start gap-3">
                  <div className="text-lg mt-0.5">{CATEGORY_EMOJI[event.category] || '📌'}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {dateLabel(event.date)}
                      {event.time && ` · ${event.time}`}
                      {event.endTime && `–${event.endTime}`}
                    </p>
                  </div>
                  <div className="flex -space-x-1 shrink-0">
                    {members.slice(0, 3).map(m => (
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
            })}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900">Pending Tasks</h2>
            <Link href="/tasks" className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingTasks.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-400">All caught up! 🎉</p>
            )}
            {pendingTasks.map(task => {
              const members = data.members.filter(m => task.memberIds.includes(m.id));
              const priorityDot = { high: 'bg-red-500', medium: 'bg-amber-400', low: 'bg-green-400' };
              return (
                <div key={task.id} className="px-5 py-3 flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-violet-500 transition-colors shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[task.priority]}`} />
                      <span className="text-xs text-gray-400 capitalize">{task.priority}</span>
                      {task.dueDate && (
                        <span className="text-xs text-gray-400">· Due {format(parseISO(task.dueDate), 'd MMM')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex -space-x-1 shrink-0">
                    {members.slice(0, 3).map(m => (
                      <div
                        key={m.id}
                        title={m.name}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white"
                        style={{ backgroundColor: m.color + '30' }}
                      >
                        {m.avatar}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grocery snapshot */}
        {activeList && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="font-semibold text-gray-900">🛒 {activeList.name}</h2>
              <Link href="/groceries" className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1">
                Open list <ArrowRight size={14} />
              </Link>
            </div>
            <div className="px-5 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{checkedCount} of {totalItems} items ticked</span>
                <span className="text-sm font-medium text-gray-700">{uncheckedItems.length} remaining</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: totalItems > 0 ? `${(checkedCount / totalItems) * 100}%` : '0%' }}
                />
              </div>
              <div className="space-y-1.5">
                {uncheckedItems.slice(0, 5).map(item => (
                  <div key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                    {item.name}
                    {item.quantity && <span className="text-gray-400 text-xs">({item.quantity}{item.unit})</span>}
                  </div>
                ))}
                {uncheckedItems.length > 5 && (
                  <p className="text-xs text-gray-400 pt-1">+{uncheckedItems.length - 5} more items</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Family members */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900">Family</h2>
            <Link href="/family" className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1">
              Manage <ArrowRight size={14} />
            </Link>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            {data.members.map(member => {
              const memberTasks = data.tasks.filter(t => !t.completed && t.memberIds.includes(member.id)).length;
              const memberEvents = data.events.filter(e => e.date >= today && e.memberIds.includes(member.id)).length;
              return (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 rounded-xl border-2"
                  style={{ borderColor: member.color + '30', backgroundColor: member.color + '08' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2"
                    style={{ borderColor: member.color, backgroundColor: member.color + '20' }}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                    <p className="text-xs text-gray-400">{memberTasks} tasks · {memberEvents} events</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showEventModal && <EventModal onClose={() => setShowEventModal(false)} />}
      {showTaskModal && <TaskModal onClose={() => setShowTaskModal(false)} />}
    </div>
  );
}
