import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/waypoint")
  await page.evaluate(() => {
    document.getElementById("CybotCookiebotDialog")?.remove()
    document.getElementById("CybotCookiebotDialogBodyUnderlay")?.remove()
  })
})

test("spoken interview page can be checked and corrected without hiding the written form", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1, name: /where.s the gap in your marketing/i })).toBeVisible()
  await expect(page.getByText(/headphones are best/i)).toHaveCount(0)
  await expect(page.getByText(/answer itself/i)).toHaveCount(0)
  await expect(page.getByText(/tell me how to spell anything i.ve got wrong/i)).toBeVisible()
  await expect(page.getByText(/you can edit a field too/i)).toBeVisible()

  const name = page.locator("#waypoint-name")
  await name.fill("Ada Lovelace")
  await expect(name).toHaveValue("Ada Lovelace")
  await expect(page.locator("#waypoint-email")).toHaveAttribute("type", "email")
  await expect(page.locator("#waypoint-role")).toBeVisible()
  await expect(page.locator("#waypoint-company")).toBeVisible()
  await expect(page.getByRole("checkbox", { name: /recorded and transcribed/i })).toBeVisible()

  await page.getByRole("button", { name: "Send me the video" }).click()
  await expect(page.getByText(/keep talking for a moment/i)).toBeVisible()

  await page.getByRole("button", { name: "Start the conversation" }).click()
  await expect(page.locator("body")).toContainText(/connecting…|microphone|voice interviews are unavailable/i)

  await page.goto("/gap")
  await expect(page.getByRole("heading", { name: "What must marketing achieve that it cannot reliably do today?" })).toBeVisible()
  await expect(page.getByRole("button", { name: /send me the video/i })).toBeVisible()
})
