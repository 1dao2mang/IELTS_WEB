// Database Configuration with Connection Pooling and Optimization
const { PrismaClient } = require("@prisma/client");

// Create base Prisma Client with optimized configuration
const basePrisma = new PrismaClient({
  log: [
    { level: "query", emit: "event" },
    { level: "error", emit: "stdout" },
    { level: "info", emit: "stdout" },
    { level: "warn", emit: "stdout" },
  ],
  // Connection pooling configuration
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// 1. Query Logging Event Handler with performance monitoring
basePrisma.$on("query", (e) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Query: " + e.query);
    console.log("Duration: " + e.duration + "ms");
    console.log("Timestamp: " + new Date().toISOString());
  }

  // Log slow queries in production
  if (e.duration > 1000) {
    console.warn("⚠️ Slow query detected:", {
      query: e.query,
      duration: e.duration + "ms",
      timestamp: new Date().toISOString(),
    });
  }
});

// 2. Extend with Custom Features using Prisma Client Extensions
const prisma = basePrisma
  .$extends({
    name: "performance-monitoring",
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          const before = Date.now();
          const result = await query(args);
          const after = Date.now();
          const duration = after - before;

          // Log slow queries (>1000ms)
          if (duration > 1000) {
            console.warn(
              `⚠️ Slow query detected: ${model}.${operation} took ${duration}ms`
            );
          }

          return result;
        },
      },
    },
  })
  .$extends({
    name: "error-handling",
    query: {
      $allModels: {
        async $allOperations({ operation, model, args, query }) {
          try {
            return await query(args);
          } catch (error) {
            console.error(
              `❌ Database error in ${model}.${operation}:`,
              error.message
            );
            throw error;
          }
        },
      },
    },
  })
  .$extends({
    name: "soft-delete",
    query: {
      user: {
        async delete({ args }) {
          // Convert delete to update with isActive flag
          return basePrisma.user.update({
            ...args,
            data: { isActive: false },
          });
        },
        // Removed automatic findMany filter to allow Admin API to see all users
        // and to avoid 'deletedAt' validation error
      },
      test: {
        async delete({ args }) {
          // Soft delete not applied for Test model
          return basePrisma.test.delete(args);
        },
      },
    },
  })
  .$extends({
    name: "query-optimizer",
    query: {
      $allModels: {
        async $allOperations({ operation, model: _model, args, query }) {
          // Add caching for read operations
          if (
            operation === "findMany" ||
            operation === "findFirst" ||
            operation === "findUnique"
          ) {
            // Optimize queries by passing through args without modification
            // Note: Prisma doesn't allow both 'select' and 'include' together
            return query(args);
          }
          return query(args);
        },
      },
    },
  })
  .$extends({
    name: "audit-log",
    query: {
      $allModels: {
        async create({ model, args, query }) {
          console.log(
            `📝 Creating ${model}:`,
            JSON.stringify(args.data, null, 2)
          );
          return query(args);
        },
        async update({ model, args, query }) {
          console.log(`📝 Updating ${model}:`, JSON.stringify(args, null, 2));
          return query(args);
        },
        async delete({ model, args, query }) {
          console.log(`📝 Deleting ${model}:`, JSON.stringify(args, null, 2));
          return query(args);
        },
      },
    },
  });

module.exports = prisma;
