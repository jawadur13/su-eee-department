'use server';

import { db } from '@/lib/db';
import { serviceCharterCreateSchema, serviceCharterUpdateSchema } from '@/lib/validation';

export async function getServiceCharters() {
  return db.serviceCharter.findMany({
    orderBy: { displayOrder: 'asc' },
  });
}

export async function getServiceCharterBySlug(slug: string) {
  return db.serviceCharter.findUnique({
    where: { slug },
  });
}

export async function createServiceCharter(input: unknown) {
  const parsed = serviceCharterCreateSchema.parse(input);

  const maxOrder = await db.serviceCharter.findFirst({
    orderBy: { displayOrder: 'desc' },
    select: { displayOrder: true },
  });

  return db.serviceCharter.create({
    data: {
      ...parsed,
      displayOrder: parsed.displayOrder ?? (maxOrder?.displayOrder ?? 0) + 1,
    },
  });
}

export async function updateServiceCharter(id: string, input: unknown) {
  const parsed = serviceCharterUpdateSchema.parse(input);

  return db.serviceCharter.update({
    where: { id },
    data: parsed,
  });
}

export async function deleteServiceCharter(id: string) {
  return db.serviceCharter.delete({
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
