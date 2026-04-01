'use client';

import { useState } from 'react';
import { Plus, Trash2, ShoppingCart, CheckCheck, Package } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { GroceryCategory, GroceryItem, GroceryList } from '@/lib/types';

const CATEGORIES: { value: GroceryCategory; label: string; emoji: string }[] = [
  { value: 'produce', label: 'Fresh Produce', emoji: '🥦' },
  { value: 'dairy', label: 'Dairy & Eggs', emoji: '🥛' },
  { value: 'meat', label: 'Meat & Fish', emoji: '🥩' },
  { value: 'bakery', label: 'Bakery', emoji: '🍞' },
  { value: 'frozen', label: 'Frozen', emoji: '❄️' },
  { value: 'pantry', label: 'Tins & Pantry', emoji: '🥫' },
  { value: 'beverages', label: 'Drinks', emoji: '🧃' },
  { value: 'household', label: 'Household', emoji: '🧴' },
  { value: 'personal', label: 'Personal Care', emoji: '🧼' },
  { value: 'other', label: 'Other', emoji: '🛒' },
];

function uid() { return Math.random().toString(36).slice(2, 10); }

export default function GroceriesPage() {
  const { data, addGroceryList, updateGroceryList, removeGroceryList,
    addGroceryItem, toggleGroceryItem, removeGroceryItem, clearCheckedItems } = useApp();

  const [activeListId, setActiveListId] = useState<string>(
    data.groceryLists.find(g => g.isActive)?.id || data.groceryLists[0]?.id || ''
  );
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<GroceryCategory>('other');
  const [newListName, setNewListName] = useState('');
  const [showNewList, setShowNewList] = useState(false);
  const [filterCat, setFilterCat] = useState<GroceryCategory | 'all'>('all');

  const activeList = data.groceryLists.find(g => g.id === activeListId);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !activeListId) return;
    addGroceryItem(activeListId, {
      id: uid(),
      name: newItemName.trim(),
      quantity: newItemQty.trim() || undefined,
      unit: newItemUnit.trim() || undefined,
      category: newItemCategory,
      checked: false,
    });
    setNewItemName('');
    setNewItemQty('');
    setNewItemUnit('');
  };

  const handleNewList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const list: GroceryList = {
      id: uid(),
      name: newListName.trim(),
      items: [],
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    addGroceryList(list);
    setActiveListId(list.id);
    setNewListName('');
    setShowNewList(false);
  };

  const filteredItems = activeList?.items.filter(i =>
    filterCat === 'all' ? true : i.category === filterCat
  ) || [];

  const groupedItems = CATEGORIES.reduce<Record<GroceryCategory, GroceryItem[]>>((acc, cat) => {
    acc[cat.value] = filteredItems.filter(i => i.category === cat.value);
    return acc;
  }, {} as Record<GroceryCategory, GroceryItem[]>);

  const uncheckedCount = activeList?.items.filter(i => !i.checked).length || 0;
  const totalCount = activeList?.items.length || 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Groceries</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {uncheckedCount} items to get · {totalCount - uncheckedCount} ticked
          </p>
        </div>
        <button
          onClick={() => setShowNewList(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} /> New List
        </button>
      </div>

      {/* List tabs */}
      {data.groceryLists.length > 0 && (
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {data.groceryLists.map(list => (
            <button
              key={list.id}
              onClick={() => setActiveListId(list.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeListId === list.id
                  ? 'bg-violet-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart size={14} />
              {list.name}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeListId === list.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                {list.items.filter(i => !i.checked).length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* New list form */}
      {showNewList && (
        <form onSubmit={handleNewList} className="bg-white rounded-2xl border border-violet-200 p-4 mb-5 flex gap-2">
          <input
            type="text"
            value={newListName}
            onChange={e => setNewListName(e.target.value)}
            placeholder="List name (e.g. Weekend Shop)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            autoFocus
          />
          <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700">
            Create
          </button>
          <button type="button" onClick={() => setShowNewList(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm">
            Cancel
          </button>
        </form>
      )}

      {!activeList && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <ShoppingCart size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No grocery list yet</p>
          <button onClick={() => setShowNewList(true)} className="mt-3 text-sm text-violet-600 font-medium">
            Create your first list
          </button>
        </div>
      )}

      {activeList && (
        <>
          {/* Progress + actions */}
          {totalCount > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{activeList.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => clearCheckedItems(activeListId)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <CheckCheck size={13} /> Clear ticked
                  </button>
                  <button
                    onClick={() => { if (confirm('Delete this list?')) { removeGroceryList(activeListId); setActiveListId(data.groceryLists[0]?.id || ''); } }}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} /> Delete list
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: totalCount > 0 ? `${((totalCount - uncheckedCount) / totalCount) * 100}%` : '0%' }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">{totalCount - uncheckedCount} of {totalCount} items ticked off</p>
            </div>
          )}

          {/* Add item form */}
          <form onSubmit={handleAddItem} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
            <p className="text-sm font-medium text-gray-700 mb-3">Add item</p>
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                placeholder="Item name"
                className="flex-1 min-w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="text"
                value={newItemQty}
                onChange={e => setNewItemQty(e.target.value)}
                placeholder="Qty"
                className="w-16 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="text"
                value={newItemUnit}
                onChange={e => setNewItemUnit(e.target.value)}
                placeholder="Unit"
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <select
                value={newItemCategory}
                onChange={e => setNewItemCategory(e.target.value as GroceryCategory)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
                ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </form>

          {/* Category filter pills */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterCat('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filterCat === 'all' ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >
              All ({activeList.items.length})
            </button>
            {CATEGORIES.filter(c => activeList.items.some(i => i.category === c.value)).map(c => (
              <button
                key={c.value}
                onClick={() => setFilterCat(filterCat === c.value ? 'all' : c.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filterCat === c.value ? 'bg-violet-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
              >
                {c.emoji} {c.label} ({activeList.items.filter(i => i.category === c.value).length})
              </button>
            ))}
          </div>

          {/* Items by category */}
          {activeList.items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <Package size={36} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-400">Your list is empty — add items above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {CATEGORIES.map(cat => {
                const items = groupedItems[cat.value];
                if (!items || items.length === 0) return null;
                return (
                  <div key={cat.value} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span className="text-sm font-semibold text-gray-700">{cat.label}</span>
                      <span className="text-xs text-gray-400 ml-auto">{items.filter(i => !i.checked).length} left</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors ${item.checked ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                        >
                          <button
                            onClick={() => toggleGroceryItem(activeListId, item.id)}
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                              item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-400'
                            }`}
                          >
                            {item.checked && <span className="text-white text-xs">✓</span>}
                          </button>
                          <span className={`flex-1 text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                            {item.name}
                          </span>
                          {(item.quantity || item.unit) && (
                            <span className="text-xs text-gray-400 shrink-0">
                              {item.quantity}{item.unit}
                            </span>
                          )}
                          <button
                            onClick={() => removeGroceryItem(activeListId, item.id)}
                            className="p-1 text-gray-300 hover:text-red-400 transition-colors shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
