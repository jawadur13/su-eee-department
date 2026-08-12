'use server';

import { prisma } from '@/lib/db';
import { serviceCharterCreateSchema, serviceCharterUpdateSchema } from '@/lib/validation';

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
  const parsed = serviceCharterCreateSchema.parse(input);

  const maxOrder = await prisma.serviceCharter.findFirst({
    orderBy: { displayOrder: 'desc' },
    select: { displayOrder: true },
  });

  return prisma.serviceCharter.create({
    data: {
      ...parsed,
      displayOrder: parsed.displayOrder ?? (maxOrder?.displayOrder ?? 0) + 1,
    },
  });
}

export async function updateServiceCharter(id: string, input: unknown) {
  const parsed = serviceCharterUpdateSchema.parse(input);

  return prisma.serviceCharter.update({
    where: { id },
    data: parsed,
  });
}

export async function deleteServiceCharter(id: string) {
  return prisma.serviceCharter.delete({
    where: { id },
  });
}

export async function reorderServiceCharters(ids: string[]) {
  const updates = ids.map((id, idx) =>
    db.serviceCharter.update({
      where: { id },
      data: { displayOrder: idx },
    })
  );

  return Promise.all(updates);
}
