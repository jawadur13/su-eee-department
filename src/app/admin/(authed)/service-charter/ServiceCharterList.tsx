'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Edit2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { useConfirm } from '@/components/admin/ConfirmDialogProvider';
import { reorderServiceCharters, deleteServiceCharter } from '@/lib/admin-actions/service-charter';

type Item = { id: string; title: string; department: string; displayOrder: number };

export default function ServiceCharterList({ items: initialItems }: { items: Item[] }) {
  const [items, setItems] = useState(initialItems);
  const confirm = useConfirm();

  async function onDelete(id: string, title: string) {
    const ok = await confirm({
      title: 'Delete charter?',
      message: `Delete "${title}"? This cannot be undone.`,
      confirmLabel: 'Delete',
    });
    if (!ok) return;

    try {
      await deleteServiceCharter(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success('Charter deleted');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete');
    }
  }

  async function onReorder(newOrder: Item[]) {
    setItems(newOrder);
    try {
      await reorderServiceCharters(newOrder.map((i) => i.id));
      toast.success('Order saved');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to reorder');
      setItems(initialItems);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {items.length === 0 ? (
        <div className="p-8 text-center text-gray-500 text-sm">No charters yet</div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <li key={item.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <button className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400">
                <GripVertical size={16} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{item.title}</div>
                <div className="text-xs text-gray-500 truncate">{item.department}</div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/service-charter/${item.id}`}
                  className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </Link>
                <button
                  onClick={() => onDelete(item.id, item.title)}
                  className="p-2 hover:bg-red-50 rounded text-gray-600 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
