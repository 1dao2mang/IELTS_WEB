// Prisma Utils - Helper functions for common operations
const prisma = require("../../config/database.config");

/**
 * Execute operations in a transaction
 */
async function executeTransaction(
  operations
) {
  return await prisma.$transaction(async (tx) => {
    return await operations(tx);
  });
}

/**
 * Paginated query helper
 */
async function paginate(
  model,
  page = 1,
  limit = 10,
  where,
  include,
  orderBy
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
async function softDelete(model, id) {
  return await model.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

/**
 * Restore soft deleted record
 */
async function restore(model, id) {
  return await model.update({
    where: { id },
    data: { deletedAt: null },
  });
}

/**
 * Batch operations helper
 */
async function batchCreate(model, data) {
  return await model.createMany({
    data,
    skipDuplicates: true,
  });
}

/**
 * Upsert helper (Create or Update)
 */
async function upsertRecord(
  model,
  where,
  create,
  update
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
async function executeRawQuery(
  query,
  ...params
) {
  return await prisma.$queryRawUnsafe(query, ...params);
}

/**
 * Check if record exists
 */
async function exists(model, where) {
  const count = await model.count({ where });
  return count > 0;
}

/**
 * Find or create record
 */
async function findOrCreate(
  model,
  where,
  create
) {
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
async function getDatabaseStats() {
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
async function clearAllData() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Cannot clear data in production!");
  }

  const tableNames = Object.keys(prisma).filter(
    (key) => !key.startsWith("_") && !key.startsWith("$")
  );

  for (const tableName of tableNames) {
    try {
      await (prisma)[tableName].deleteMany();
      console.log(`✅ Cleared ${tableName}`);
    } catch (error) {
      console.log(`⚠️ Could not clear ${tableName}`);
    }
  }
}

module.exports = { executeTransaction, paginate, softDelete, restore, batchCreate, upsertRecord, executeRawQuery, exists, findOrCreate, getDatabaseStats, clearAllData };
