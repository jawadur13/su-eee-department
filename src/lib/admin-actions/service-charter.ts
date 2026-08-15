'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth-server';
import { serviceCharterCreateSchema, serviceCharterUpdateSchema } from '@/lib/validation';

async function requireAuth() {
  const session = await getSession();
  if (!session?.user) throw new Error('Not authenticated');
}

function revalidateServiceCharterSurfaces() {
  revalidatePath('/student-society/service-charter');
  revalidatePath('/admin/service-charter');
  revalidatePath('/admin');
  revalidatePath('/', 'layout');
}

export async function getServiceCharters() {
  return prisma.serviceCharter.findMany({
    orderBy: { displayOrder: 'asc' },
  });
}

export async function getServiceCharterBySlug(slug: string) {
  return prisma.serviceCharter.findUnique({
    where: { slug },
  });
}

export async function createServiceCharter(input: unknown) {
  await requireAuth();
  const parsed = serviceCharterCreateSchema.parse(input);

  const maxOrder = await prisma.serviceCharter.findFirst({
    orderBy: { displayOrder: 'desc' },
    select: { displayOrder: true },
  });

  const created = await prisma.serviceCharter.create({
    data: {
      ...parsed,
      displayOrder: parsed.displayOrder ?? (maxOrder?.displayOrder ?? 0) + 1,
    },
  });
  revalidateServiceCharterSurfaces();
  return created;
}

export async function updateServiceCharter(id: string, input: unknown) {
  await requireAuth();
  const parsed = serviceCharterUpdateSchema.parse(input);

  const updated = await prisma.serviceCharter.update({
    where: { id },
    data: parsed,
  });
  revalidateServiceCharterSurfaces();
  revalidatePath(`/admin/service-charter/${id}`);
  return updated;
}

export async function deleteServiceCharter(id: string) {
  await requireAuth();
  const deleted = await prisma.serviceCharter.delete({
    where: { id },
  });
  revalidateServiceCharterSurfaces();
  return deleted;
}

export async function reorderServiceCharters(ids: string[]) {
  await requireAuth();
  const updates = ids.map((id, idx) =>
    prisma.serviceCharter.update({
      where: { id },
      data: { displayOrder: idx },
    })
  );

  const result = await Promise.all(updates);
  revalidateServiceCharterSurfaces();
  return result;
}
