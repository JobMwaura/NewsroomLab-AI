// ─── Prisma Client Singleton ────────────────────────
// Prisma 7 requires a driver adapter (e.g. @prisma/adapter-pg).
// In demo/build mode without a configured adapter the constructor throws;
// we catch that and export null so the build succeeds and API routes
// return 500 → frontend falls back to demo data.
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis

function makePrisma() {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    })
  } catch (e) {
    console.warn("[prisma] Client unavailable (Prisma 7 needs a driver adapter):", e.message)
    return null
  }
}

export const prisma = globalForPrisma.prisma ?? makePrisma()

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma
}
