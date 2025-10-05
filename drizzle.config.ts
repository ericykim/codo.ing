import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema",
  out: "./lib/schema/migrations",
  dialect: "postgresql",
});
