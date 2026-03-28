// Prisma Utils - Helper functions for common operations
import prisma from "../../config/database.config";

/**
 * Execute operations in a transaction
 */
export async function executeTransaction<T>(
  operations: (tx: any) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(async (tx: any) => {
    return await operations(tx);
  });
}

/**
 * Paginated query helper
 */
export async function paginate<_T>(
  model: any,
  page: number = 1,
  limit: number = 10,
  where?: any,
  include?: any,
  orderBy?: any
) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      skip,
      take: limit,
      where,
      include,
      orderBy,
    }),
    model.count({ where }),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
}

/**
 * Soft delete helper
 */
export async function softDelete(model: any, id: string | number) {
  return await model.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

/**
 * Restore soft deleted record
 */
export async function restore(model: any, id: string | number) {
  return await model.update({
    where: { id },
    data: { deletedAt: null },
  });
}

/**
 * Batch operations helper
 */
export async function batchCreate<T>(model: any, data: T[]) {
  return await model.createMany({
    data,
    skipDuplicates: true,
  });
}

/**
 * Upsert helper (Create or Update)
 */
export async function upsertRecord<T>(
  model: any,
  where: any,
  create: T,
  update: T
) {
  return await model.upsert({
    where,
    create,
    update,
  });
}

/**
 * Execute raw SQL safely
 */
export async function executeRawQuery<T = any>(
  query: string,
  ...params: any[]
): Promise<T> {
  return await prisma.$queryRawUnsafe<T>(query, ...params);
}

/**
 * Check if record exists
 */
export async function exists(model: any, where: any): Promise<boolean> {
  const count = await model.count({ where });
  return count > 0;
}

/**
 * Find or create record
 */
export async function findOrCreate<T>(
  model: any,
  where: any,
  create: T
): Promise<{ record: T; created: boolean }> {
  const existing = await model.findUnique({ where });

  if (existing) {
    return { record: existing, created: false };
  }

  const newRecord = await model.create({ data: create });
  return { record: newRecord, created: true };
}

/**
 * Get database statistics
 */
export async function getDatabaseStats() {
  const stats = {
    users: await prisma.user.count(),
    tests: await prisma.test.count(),
    testAttempts: await prisma.testAttempt.count(),
    questions: await prisma.question.count(),
    writingSubmissions: await prisma.writingSubmission.count(),
    speakingRecords: await prisma.speakingRecord.count(),
  };

  return stats;
}

/**
 * Clear all data (for testing only)
 */
export async function clearAllData() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Cannot clear data in production!");
  }

  const tableNames = Object.keys(prisma).filter(
    (key) => !key.startsWith("_") && !key.startsWith("$")
  );

  for (const tableName of tableNames) {
    try {
      await (prisma as any)[tableName].deleteMany();
      console.log(`✅ Cleared ${tableName}`);
    } catch (error) {
      console.log(`⚠️ Could not clear ${tableName}`);
    }
  }
}
