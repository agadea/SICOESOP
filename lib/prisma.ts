import { PrismaClient } from '../lib/generated/prisma';

// Previene múltiples instancias de PrismaClient en desarrollo (Next.js hot reload)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
