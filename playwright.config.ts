import { defineConfig } from "@playwright/test"

const viewport = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
}

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: "http://127.0.0.1:3000",
  },
  webServer: {
    command: "pnpm exec next dev --port 3000 --webpack",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop", use: { viewport: viewport.desktop } },
    { name: "mobile", use: { viewport: viewport.mobile, hasTouch: true, isMobile: true } },
    { name: "desktop-reduced-motion", use: { viewport: viewport.desktop, reducedMotion: "reduce" } },
    { name: "mobile-reduced-motion", use: { viewport: viewport.mobile, hasTouch: true, isMobile: true, reducedMotion: "reduce" } },
  ],
})
