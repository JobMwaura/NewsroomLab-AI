// ─── Prisma Client Singleton ────────────────────────
// Prevents multiple instances in development (hot reload).
// Prisma 7 — connection URL is configured in prisma.config.js
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
