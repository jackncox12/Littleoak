'use client';

import { useState, useMemo } from 'react';
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isToday, parseISO, isSameDay, addMonths, subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import EventModal from '@/components/EventModal';
import { CalendarEvent } from '@/lib/types';

const CATEGORY_COLORS: Record<string, string> = {
  appointment: '#EF4444',
  school: '#3B82F6',
  sport: '#10B981',
  family: '#8B5CF6',
  work: '#6B7280',
  birthday: '#F59E0B',
  holiday: '#06B6D4',
  other: '#6B7280',
};

const CATEGORY_EMOJI: Record<string, string> = {
  appointment: '🏥', school: '🎒', sport: '⚽', family: '🏠',
  work: '💼', birthday: '🎂', holiday: '✈️', other: '📌',
};

export default function CalendarPage() {
  const { data } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null | undefined>(undefined);
  const [newEventDate, setNewEventDate] = useState<string | undefined>(undefined);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsForDay = (day: Date) =>
    data.events.filter(e => {
      try { return isSameDay(parseISO(e.date), day); } catch { return false; }
    });

  const selectedDayEvents = selectedDay
    ? data.events
        .filter(e => { try { return isSameDay(parseISO(e.date), selectedDay); } catch { return false; } })
        .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
    : [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 text-sm mt-0.5">{format(currentMonth, 'MMMM yyyy')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => { setNewEventDate(undefined); setEditingEvent(null); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors ml-2"
          >
            <Plus size={16} /> Add Event
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7">
            {days.map(day => {
              const dayEvents = eventsForDay(day);
              const isSelected = selectedDay && isSameDay(day, selectedDay);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const todayDay = isToday(day);
              return (
                <div
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[80px] p-1.5 border-b border-r border-gray-50 cursor-pointer transition-colors
                    ${isSelected ? 'bg-violet-50' : 'hover:bg-gray-50'}
                    ${!isCurrentMonth ? 'opacity-40' : ''}
                  `}
                >
                  <div className={`
                    w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium mb-1 mx-auto
                    ${todayDay ? 'bg-violet-600 text-white' : isSelected ? 'bg-violet-100 text-violet-700' : 'text-gray-700'}
                  `}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        onClick={e => { e.stopPropagation(); setEditingEvent(event); }}
                        className="text-xs px-1.5 py-0.5 rounded-md truncate cursor-pointer hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: (CATEGORY_COLORS[event.category] || '#6B7280') + '20',
                          color: CATEGORY_COLORS[event.category] || '#6B7280',
                        }}
                      >
                        {event.time && <span className="font-medium">{event.time} </span>}
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-400 px-1">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day detail panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900">
              {selectedDay ? format(selectedDay, 'EEEE, d MMMM') : 'Select a day'}
            </h2>
          </div>
          {!selectedDay && (
            <p className="px-5 py-8 text-sm text-gray-400 text-center">Click a day to see its events</p>
          )}
          {selectedDay && selectedDayEvents.length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-gray-400 mb-3">Nothing planned</p>
              <button
                onClick={() => { setNewEventDate(format(selectedDay, 'yyyy-MM-dd')); setEditingEvent(null); }}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                + Add event
              </button>
            </div>
          )}
          <div className="divide-y divide-gray-50">
            {selectedDayEvents.map(event => {
              const members = data.members.filter(m => event.memberIds.includes(m.id));
              return (
                <div
                  key={event.id}
                  className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setEditingEvent(event)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{CATEGORY_EMOJI[event.category]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      {(event.time || event.endTime) && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {event.time}{event.endTime && ` – ${event.endTime}`}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{event.description}</p>
                      )}
                      {event.recurring && event.recurring !== 'none' && (
                        <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">
                          🔄 {event.recurring}
                        </span>
                      )}
                    </div>
                  </div>
                  {members.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-2 ml-8">
                      {members.map(m => (
                        <span
                          key={m.id}
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: m.color + '20', color: m.color }}
                        >
                          {m.avatar} {m.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {selectedDay && selectedDayEvents.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-50">
              <button
                onClick={() => { setNewEventDate(format(selectedDay, 'yyyy-MM-dd')); setEditingEvent(null); }}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
              >
                <Plus size={14} /> Add another event
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {Object.entries(CATEGORY_EMOJI).map(([cat, emoji]) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            {emoji} <span className="capitalize">{cat}</span>
          </div>
        ))}
      </div>

      {editingEvent !== undefined && (
        <EventModal
          event={editingEvent}
          defaultDate={newEventDate}
          onClose={() => { setEditingEvent(undefined); setNewEventDate(undefined); }}
        />
      )}
    </div>
  );
}
