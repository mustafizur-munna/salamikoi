import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // @ts-expect-error - Prisma config types from @prisma/config fall behind CLI v7
  environments: {
    dev: { url: process.env.DATABASE_URL },
  },
});
