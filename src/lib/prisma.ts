import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.POSTGRES_URL ? `${process.env.POSTGRES_URL}?sslmode=require` : "";

let adapter: any = null;
if (process.env.NODE_ENV === "production" && connectionString) {
  const pool = new Pool({ connectionString });
  adapter = new PrismaPg(pool as any);
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
