'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, CheckSquare, ShoppingCart, Users, StickyNote, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/lib/AppContext';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/groceries', label: 'Groceries', icon: ShoppingCart },
  { href: '/notes', label: 'Notes', icon: StickyNote },
  { href: '/family', label: 'Family', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pendingTasks = data.tasks.filter(t => !t.completed).length;
  const groceryItems = data.groceryLists
    .filter(g => g.isActive)
    .reduce((acc, g) => acc + g.items.filter(i => !i.checked).length, 0);

  const badges: Record<string, number> = {
    '/tasks': pendingTasks,
    '/groceries': groceryItems,
  };

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌳</span>
          <span className="font-bold text-gray-800">{data.familyName}</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-gray-100">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌳</span>
            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-tight">{data.familyName}</h1>
              <p className="text-xs text-gray-500">Family Organiser</p>
            </div>
          </div>
        </div>

        {/* Members strip */}
        <div className="px-4 py-3 border-b border-gray-100 flex gap-2 flex-wrap">
          {data.members.map(m => (
            <div
              key={m.id}
              title={m.name}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2"
              style={{ borderColor: m.color, backgroundColor: m.color + '20' }}
            >
              {m.avatar}
            </div>
          ))}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            const badge = badges[href];
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${active
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {badge ? (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${active ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-700'}`}>
                    {badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">Little Oak Family Planner</p>
        </div>
      </aside>
    </>
  );
}
