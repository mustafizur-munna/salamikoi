import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  earlyAccess: true,
  environments: {
    dev: { url: process.env.DATABASE_URL },
  },
});
