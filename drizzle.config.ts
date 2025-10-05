import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema/src/models/*.ts",
  out: "./lib/schema/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:postgres@localhost:5432/codoing",
  },
});
