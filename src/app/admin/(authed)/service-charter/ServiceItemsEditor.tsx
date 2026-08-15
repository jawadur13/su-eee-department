'use client';

import { useState } from 'react';
import { Plus, X, ArrowUp, ArrowDown } from 'lucide-react';

export type ServiceStep = { text: string; linkLabel: string; linkHref: string };
export type ServiceItem = {
  title: string;
  scope: 'department' | 'university';
  steps: ServiceStep[];
  contactName: string;
  contactRole: string;
  contactPhone: string;
  contactEmail: string;
  contactRoom: string;
};

type Props = {
  value: ServiceItem[];
  onChange: (items: ServiceItem[]) => void;
};

const EMPTY_STEP: ServiceStep = { text: '', linkLabel: '', linkHref: '' };
const EMPTY_ITEM: ServiceItem = {
  title: '', scope: 'department', steps: [],
  contactName: '', contactRole: '', contactPhone: '', contactEmail: '', contactRoom: '',
};

function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

// serviceItems is stored as Prisma Json — normalize the loosely-typed
// value back into the editor's shape (missing/wrong-typed fields fall
// back to '' rather than throwing).
export function normalizeServiceItems(v: unknown): ServiceItem[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((r): r is Record<string, unknown> => typeof r === 'object' && r !== null)
    .map((r) => ({
      title: str(r.title),
      scope: r.scope === 'university' ? 'university' : 'department',
      steps: Array.isArray(r.steps)
        ? r.steps
            .filter((s): s is Record<string, unknown> => typeof s === 'object' && s !== null)
            .map((s) => ({ text: str(s.text), linkLabel: str(s.linkLabel), linkHref: str(s.linkHref) }))
        : [],
      contactName: str(r.contactName),
      contactRole: str(r.contactRole),
      contactPhone: str(r.contactPhone),
      contactEmail: str(r.contactEmail),
      contactRoom: str(r.contactRoom),
    }));
}

export default function ServiceItemsEditor({ value, onChange }: Props) {
  function addItem() { onChange([...value, { ...EMPTY_ITEM, steps: [] }]); }
  function updateItem(i: number, patch: Partial<ServiceItem>) {
    onChange(value.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  }
  function removeItem(i: number) { onChange(value.filter((_, idx) => idx !== i)); }
  function moveItem(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  function addStep(itemIdx: number) {
    const item = value[itemIdx];
    updateItem(itemIdx, { steps: [...item.steps, { ...EMPTY_STEP }] });
  }
  function updateStep(itemIdx: number, stepIdx: number, patch: Partial<ServiceStep>) {
    const item = value[itemIdx];
    updateItem(itemIdx, {
      steps: item.steps.map((s, idx) => (idx === stepIdx ? { ...s, ...patch } : s)),
    });
  }
  function removeStep(itemIdx: number, stepIdx: number) {
    const item = value[itemIdx];
    updateItem(itemIdx, { steps: item.steps.filter((_, idx) => idx !== stepIdx) });
  }
  function moveStep(itemIdx: number, stepIdx: number, dir: -1 | 1) {
    const item = value[itemIdx];
    const j = stepIdx + dir;
    if (j < 0 || j >= item.steps.length) return;
    const next = [...item.steps];
    [next[stepIdx], next[j]] = [next[j], next[stepIdx]];
    updateItem(itemIdx, { steps: next });
  }

  return (
    <div className="space-y-4">
      {value.length === 0 && (
        <p className="text-xs text-gray-500 italic">No service items yet.</p>
      )}

      {value.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Service #{i + 1}
            </span>
            <div className="flex items-center gap-0.5">
              <button type="button" onClick={() => moveItem(i, -1)} disabled={i === 0}
                      aria-label="Move up" className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 transition-colors">
                <ArrowUp size={14} />
              </button>
              <button type="button" onClick={() => moveItem(i, 1)} disabled={i === value.length - 1}
                      aria-label="Move down" className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 transition-colors">
                <ArrowDown size={14} />
              </button>
              <button type="button" onClick={() => removeItem(i)}
                      aria-label="Remove service" className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input type="text" value={item.title}
                     onChange={(e) => updateItem(i, { title: e.target.value })}
                     placeholder="Transcript Request"
                     className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Scope</label>
              <select value={item.scope}
                      onChange={(e) => updateItem(i, { scope: e.target.value as ServiceItem['scope'] })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-white">
                <option value="department">Department</option>
                <option value="university">University</option>
              </select>
            </div>
          </div>

          {/* Contact block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextInput label="Contact name" value={item.contactName}
                       onChange={(v) => updateItem(i, { contactName: v })} />
            <TextInput label="Contact role" value={item.contactRole}
                       onChange={(v) => updateItem(i, { contactRole: v })} />
            <TextInput label="Contact phone" value={item.contactPhone}
                       onChange={(v) => updateItem(i, { contactPhone: v })} />
            <TextInput label="Contact email" value={item.contactEmail} type="email"
                       onChange={(v) => updateItem(i, { contactEmail: v })} />
            <TextInput label="Contact room" value={item.contactRoom}
                       onChange={(v) => updateItem(i, { contactRoom: v })} />
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-600">Process steps</label>
            {item.steps.length === 0 && (
              <p className="text-xs text-gray-400 italic">No steps yet.</p>
            )}
            {item.steps.map((step, si) => (
              <div key={si} className="flex items-start gap-2 bg-white border border-gray-200 rounded-md p-2">
                <div className="flex-1 space-y-1.5">
                  <input type="text" value={step.text}
                         onChange={(e) => updateStep(i, si, { text: e.target.value })}
                         placeholder="Step text, e.g. Submit application form"
                         className="w-full px-2.5 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent" />
                  <div className="grid grid-cols-2 gap-1.5">
                    <input type="text" value={step.linkLabel}
                           onChange={(e) => updateStep(i, si, { linkLabel: e.target.value })}
                           placeholder="Link label (optional)"
                           className="w-full px-2.5 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent" />
                    <input type="text" value={step.linkHref}
                           onChange={(e) => updateStep(i, si, { linkHref: e.target.value })}
                           placeholder="Link URL (optional)"
                           className="w-full px-2.5 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent" />
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0 pt-1">
                  <button type="button" onClick={() => moveStep(i, si, -1)} disabled={si === 0}
                          aria-label="Move step up" className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 transition-colors">
                    <ArrowUp size={12} />
                  </button>
                  <button type="button" onClick={() => moveStep(i, si, 1)} disabled={si === item.steps.length - 1}
                          aria-label="Move step down" className="p-1 text-gray-400 hover:text-primary disabled:opacity-30 transition-colors">
                    <ArrowDown size={12} />
                  </button>
                  <button type="button" onClick={() => removeStep(i, si)}
                          aria-label="Remove step" className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addStep(i)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors">
              <Plus size={12} /> Add step
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addItem}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors">
        <Plus size={14} /> Add service
      </button>
    </div>
  );
}

function TextInput({
  label, value, onChange, type = 'text',
}: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
             className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-white" />
    </div>
  );
}
