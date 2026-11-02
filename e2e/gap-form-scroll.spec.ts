import { expect, test, type Page } from "@playwright/test"

/**
 * Submit is always intercepted. These tests must never reach the real /api/gap
 * handler, which can email production when RESEND_API_KEY is set.
 */
test.beforeEach(async ({ page }) => {
  await page.route("**/api/gap", async (route) => {
    if (route.request().method() !== "POST") {
      await route.continue()
      return
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    })
  })
  await page.goto("/gap")
  await page.evaluate(() => {
    document.getElementById("CybotCookiebotDialog")?.remove()
    document.getElementById("CybotCookiebotDialogBodyUnderlay")?.remove()
  })
  await page.getByRole("button", { name: /send me the video/i }).waitFor()
})

async function scrollToSubmit(page: Page) {
  await page.getByRole("button", { name: /send me the video/i }).scrollIntoViewIfNeeded()
  await page.waitForFunction(() => {
    const state = (window as Window & { __gapSettle?: { y: number; n: number } }).__gapSettle ?? { y: -1, n: 0 }
    const y = Math.round(window.scrollY)
    state.n = y === state.y ? state.n + 1 : 0
    state.y = y
    ;(window as Window & { __gapSettle?: { y: number; n: number } }).__gapSettle = state
    return state.n >= 2
  })
}

/** Target border-box sits just below the fixed header (scroll-margin clearance). */
async function expectPinnedBelowHeader(page: Page, selector: string) {
  await page.waitForFunction((sel) => {
    const state = (window as Window & { __gapPin?: { y: number; n: number } }).__gapPin ?? { y: -1, n: 0 }
    const header = document.querySelector("header")
    const target = document.querySelector(sel)
    if (!header || !target) return false
    const delta = target.getBoundingClientRect().top - header.getBoundingClientRect().bottom
    const y = Math.round(window.scrollY)
    const aligned = delta >= 8 && delta <= 28
    state.n = aligned && y === state.y ? state.n + 1 : 0
    state.y = y
    ;(window as Window & { __gapPin?: { y: number; n: number } }).__gapPin = state
    return state.n >= 2
  }, selector)
}

async function expectClearOfChrome(page: Page, selector: string) {
  const box = await page.locator(selector).boundingBox()
  const header = await page.locator("header").boundingBox()
  expect(box).not.toBeNull()
  expect(header).not.toBeNull()
  expect(box!.y).toBeGreaterThanOrEqual(header!.y + header!.height - 1)
  const viewport = page.viewportSize()
  expect(viewport).not.toBeNull()
  const mobileNav = page.locator(".cc-mobile-navigation")
  if (await mobileNav.isVisible()) {
    const nav = await mobileNav.boundingBox()
    expect(nav).not.toBeNull()
    expect(box!.y + box!.height).toBeLessThanOrEqual(nav!.y + 1)
  } else {
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height + 1)
  }
}

test("empty submit scrolls to the first incomplete question and shows its error", async ({ page }) => {
  let posts = 0
  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("/api/gap")) posts += 1
  })

  await scrollToSubmit(page)
  await page.getByRole("button", { name: /send me the video/i }).click()

  const alert = page.locator("#gap-most-important-error")
  await expect(alert).toHaveText("Choose the most important area of focus.")
  await expect(page.locator("#most_important")).toBeFocused()
  await expect(page.locator("#most_important")).toHaveAttribute("aria-invalid", "true")
  await expectPinnedBelowHeader(page, "#gap-q3-block")
  await expectClearOfChrome(page, "#gap-most-important-error")
  expect(posts).toBe(0)
})

test("missing name scrolls to the name field, not a later email field", async ({ page }) => {
  await page.selectOption("#most_important", "funding")
  await scrollToSubmit(page)
  await page.getByRole("button", { name: /send me the video/i }).click()

  await expect(page.locator("#gap-name-error")).toHaveText("Name and email are required.")
  await expect(page.locator("#name")).toBeFocused()
  await expect(page.locator("#email")).not.toBeFocused()
  await expectPinnedBelowHeader(page, "#gap-name-field")
  await expectClearOfChrome(page, "#gap-name-error")
})

test("invalid email scrolls to the email field and shows the message", async ({ page }) => {
  await page.selectOption("#most_important", "funding")
  await page.locator("#name").fill("Tim Example")
  await page.locator("#email").fill("not-an-email")
  await scrollToSubmit(page)
  await page.getByRole("button", { name: /send me the video/i }).click()

  await expect(page.locator("#gap-email-error")).toHaveText("Enter a valid email address.")
  await expect(page.locator("#email")).toBeFocused()
  await expectPinnedBelowHeader(page, "#gap-email-field")
  await expectClearOfChrome(page, "#gap-email-error")
})

test("successful submit scrolls the thank-you message below the fixed header", async ({ page }) => {
  let mockedPosts = 0
  await page.unroute("**/api/gap")
  await page.route("**/api/gap", async (route) => {
    expect(route.request().method()).toBe("POST")
    mockedPosts += 1
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    })
  })

  await page.selectOption("#most_important", "funding")
  await page.locator("#name").fill("Tim Example")
  await page.locator("#email").fill("tim@example.com")
  await scrollToSubmit(page)
  const scrollBefore = await page.evaluate(() => Math.round(window.scrollY))
  await page.getByRole("button", { name: /send me the video/i }).click()

  const success = page.locator("#gap-success")
  await expect(success).toBeVisible()
  await expect(success).toContainText("Thanks — the video is on its way.")
  await expect(success).toBeFocused()
  await expectPinnedBelowHeader(page, "#gap-success")
  await expectClearOfChrome(page, "#gap-success h2")
  const scrollAfter = await page.evaluate(() => Math.round(window.scrollY))
  expect(scrollAfter).toBeLessThan(scrollBefore)
  expect(mockedPosts).toBe(1)
  await expect(page.getByRole("button", { name: /send me the video/i })).toHaveCount(0)
})
