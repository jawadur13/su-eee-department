import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth-server';
import LeadPopupForm from './LeadPopupForm';

export const metadata = { title: 'Lead Popup Settings (CMS)' };

export default async function LeadPopupPage() {
  const session = await getSession();
  if (!session?.user) redirect('/admin/login');

  let settings = await prisma.leadPopupSettings.findUnique({
    where: { id: 'singleton' },
  });

  if (!settings) {
    settings = await prisma.leadPopupSettings.create({
      data: { id: 'singleton' },
    });
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="text-2xl font-display font-bold text-gray-900">Lead Collection Popup</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure the homepage lead collection popup that appears after a set delay.
        </p>
      </header>

      <LeadPopupForm initialData={settings} />

      <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="font-semibold text-gray-900">Leads Collected</h2>
        <p className="text-sm text-gray-600">
          View and manage leads collected through the popup form.
        </p>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          View All Leads →
        </Link>
      </div>
    </div>
  );
}
