import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";

  if (url.startsWith("file:")) {
    // Local development — SQLite via better-sqlite3
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3") as typeof import("@prisma/adapter-better-sqlite3");
    const adapter = new PrismaBetterSqlite3({ url });
    return new PrismaClient({ adapter });
  }

  // Production (Vercel / Neon) — PostgreSQL over WebSocket/HTTP
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaNeon } = require("@prisma/adapter-neon") as typeof import("@prisma/adapter-neon");
  const adapter = new PrismaNeon({ connectionString: url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
