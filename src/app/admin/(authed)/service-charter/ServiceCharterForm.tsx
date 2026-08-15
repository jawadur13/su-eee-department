'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { ServiceCharter } from '@prisma/client';
import ImageUploader from '@/components/admin/ImageUploader';
import { createServiceCharter, updateServiceCharter } from '@/lib/admin-actions/service-charter';
import ServiceItemsEditor, {
  normalizeServiceItems,
  type ServiceItem,
} from './ServiceItemsEditor';

type FormState = {
  slug: string;
  title: string;
  shortTitle: string;
  department: string;
  coverUrl: string;
  coverPublicId: string;
  pdfUrl: string;
  pdfPublicId: string;
  serviceItems: ServiceItem[];
};

function toFormState(initial: ServiceCharter | null): FormState {
  return {
    slug: initial?.slug ?? '',
    title: initial?.title ?? 'Service Charter',
    shortTitle: initial?.shortTitle ?? '',
    department: initial?.department ?? 'Electrical and Electronics Engineering',
    coverUrl: initial?.coverUrl ?? '',
    coverPublicId: initial?.coverPublicId ?? '',
    pdfUrl: initial?.pdfUrl ?? '',
    pdfPublicId: initial?.pdfPublicId ?? '',
    serviceItems: normalizeServiceItems(initial?.serviceItems ?? []),
  };
}

// Drop visually-empty steps/contact fields back to null so the DB
// stores nothing rather than empty strings — mirrors the optional
// fields' nullable-string convention used across the admin CMS.
function cleanForSubmit(state: FormState) {
  return {
    slug: state.slug.trim(),
    title: state.title.trim(),
    shortTitle: state.shortTitle.trim(),
    department: state.department.trim(),
    coverUrl: state.coverUrl || null,
    coverPublicId: state.coverPublicId || null,
    pdfUrl: state.pdfUrl || null,
    pdfPublicId: state.pdfPublicId || null,
    serviceItems: state.serviceItems
      .filter((it) => it.title.trim())
      .map((it) => ({
        title: it.title.trim(),
        scope: it.scope,
        steps: it.steps
          .filter((s) => s.text.trim())
          .map((s) => ({
            text: s.text.trim(),
            linkLabel: s.linkLabel.trim() || null,
            linkHref: s.linkHref.trim() || null,
          })),
        contactName: it.contactName.trim() || null,
        contactRole: it.contactRole.trim() || null,
        contactPhone: it.contactPhone.trim() || null,
        contactEmail: it.contactEmail.trim() || null,
        contactRoom: it.contactRoom.trim() || null,
      })),
  };
}

export default function ServiceCharterForm({ initial }: { initial: ServiceCharter | null }) {
  const isEdit = !!initial;
  const router = useRouter();
  const [state, setState] = useState<FormState>(() => toFormState(initial));
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function patch(p: Partial<FormState>) {
    setState((s) => ({ ...s, ...p }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const payload = cleanForSubmit(state);
      if (isEdit) {
        await updateServiceCharter(initial!.id, payload);
        toast.success('Charter saved');
      } else {
        await createServiceCharter(payload);
        toast.success('Charter created');
      }
      router.push('/admin/service-charter');
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save';
      setError(message);
      toast.error(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card title="Basics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Slug" required monospace
                     value={state.slug} onChange={(v) => patch({ slug: v })}
                     placeholder="service-charter" />
          <TextField label="Short title" required
                     value={state.shortTitle} onChange={(v) => patch({ shortTitle: v })}
                     placeholder="EEE Service Charter" />
        </div>
        <TextField label="Title (full)" required
                   value={state.title} onChange={(v) => patch({ title: v })} />
        <TextField label="Department" required
                   value={state.department} onChange={(v) => patch({ department: v })} />
      </Card>

      <Card title="Cover image">
        <ImageUploader kind="service-charter-cover" name="cover"
                       initialUrl={state.coverUrl} initialPublicId={state.coverPublicId}
                       onChange={(url, publicId) => patch({ coverUrl: url, coverPublicId: publicId })} />
      </Card>

      <Card title="PDF (downloadable)">
        <ImageUploader kind="service-charter-pdf" name="pdf" accept="application/pdf"
                       initialUrl={state.pdfUrl} initialPublicId={state.pdfPublicId}
                       onChange={(url, publicId) => patch({ pdfUrl: url, pdfPublicId: publicId })} />
      </Card>

      <Card title="Service directory">
        <p className="text-xs text-gray-500 -mt-2">
          Each entry appears in the service directory on the public page, with its own
          process steps and contact details.
        </p>
        <ServiceItemsEditor value={state.serviceItems}
                             onChange={(items) => patch({ serviceItems: items })} />
      </Card>

      {error && (
        <div role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <Link href="/admin/service-charter" className="px-4 py-2.5 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">
          ← Back to service charter
        </Link>
        <button type="submit" disabled={pending}
                className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-5 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/40">
          {pending ? 'Saving…' : isEdit ? 'Save changes' : 'Create charter'}
        </button>
      </div>
    </form>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">{title}</h2>
      {children}
    </section>
  );
}

function TextField({
  label, value, onChange, required, placeholder, monospace,
}: { label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string; monospace?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
             required={required} placeholder={placeholder}
             className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent ${monospace ? 'font-mono' : ''}`} />
    </div>
  );
}
