import { defineConfig } from "@playwright/test";
import { existsSync } from "fs";

const exe = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;

export default defineConfig({
  testDir: "tests",
  timeout: 45_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    launchOptions: { executablePath: exe },
  },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm run start", url: "http://localhost:3000/de", reuseExistingServer: true, timeout: 60_000, env: { RATE_LIMIT: "100", SITE_MODE: "preview" } },
});
