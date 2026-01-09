import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",

    // Don't run tests inside these folders
    exclude: ["dist", "node_modules"],

    coverage: {
      provider: "v8",

      // Don't include these in coverage
      exclude: ["dist", "node_modules"],
    },
  },
});
