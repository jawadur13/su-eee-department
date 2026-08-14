import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth-server';

export const metadata = { title: 'Leads (CMS)' };

export default async function LeadsPage() {
  const session = await getSession();
  if (!session?.user) redirect('/admin/login');

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <header>
        <h1 className="text-2xl font-display font-bold text-gray-900">Leads</h1>
        <p className="mt-1 text-sm text-gray-500">
          Leads collected from the homepage popup form. ({leads.length} total)
        </p>
      </header>

      {leads.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-gray-500">No leads collected yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Mobile</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Program</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{lead.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <a href={`tel:${lead.mobileNumber}`} className="text-primary hover:underline">
                      {lead.mobileNumber}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lead.interestedProgram}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                        {lead.email}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
