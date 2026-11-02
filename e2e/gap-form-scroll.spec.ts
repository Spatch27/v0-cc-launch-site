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

const SLIDER_KEYS = ["funding", "howitruns", "measurement", "ai", "stack", "speed", "agencies"] as const

function trackPosts(page: Page) {
  let posts = 0
  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("/api/gap")) posts += 1
  })
  return () => posts
}

async function submitFromBottom(page: Page) {
  await scrollToSubmit(page)
  await page.getByRole("button", { name: /send me the video/i }).click()
}

async function fillQuestion1(page: Page) {
  await page.locator("#must_achieve").fill("Ship campaigns faster")
}

async function touchSlider(page: Page, key: string) {
  await page.locator(`#gap-area-${key}`).getByRole("button", { name: /^Set gap size to 3,/ }).click()
}

async function touchAllSliders(page: Page) {
  for (const key of SLIDER_KEYS) await touchSlider(page, key)
}

async function fillThrough(page: Page, stop: "q1" | "q2" | "q3" | "q4" | "name") {
  if (stop === "q1") return
  await fillQuestion1(page)
  if (stop === "q2") return
  await touchAllSliders(page)
  if (stop === "q3") return
  await page.selectOption("#most_important", "funding")
  if (stop === "q4") return
  await page.locator("#shows_the_gap").fill("Q4 launch approvals stall")
  if (stop === "name") return
}

async function expectLanding(page: Page, target: string, focus: string, errorSelector: string, message: string) {
  const alert = page.locator(errorSelector)
  await expect(alert).toHaveText(message)
  await expect(page.locator(focus)).toBeFocused()
  await expect(page.locator(focus)).toHaveAttribute("aria-invalid", "true")
  await expectPinnedBelowHeader(page, target)
  await expectClearOfChrome(page, errorSelector)
}

test("empty submit lands on question one", async ({ page }) => {
  const posts = trackPosts(page)
  await expect(page.locator("#must_achieve")).toHaveAttribute("aria-required", "true")
  await expect(page.locator("#must_achieve")).toHaveAttribute("required", "")
  await expect(page.getByText("Anything else we should know? (optional)")).toBeVisible()
  await expect(page.locator("#anything_else")).not.toHaveAttribute("required", "")

  await submitFromBottom(page)

  await expectLanding(
    page,
    "#gap-q1-block",
    "#must_achieve",
    "#must_achieve-error",
    "Tell us what marketing must achieve."
  )
  await expect(page.locator("#gap-q1-block")).not.toContainText("*")
  expect(posts()).toBe(0)
})

test("question one filled stops on the first untouched gap slider", async ({ page }) => {
  const posts = trackPosts(page)
  await fillThrough(page, "q2")
  await submitFromBottom(page)

  await expectLanding(
    page,
    "#gap-q2",
    "#gap-slider-funding",
    "#gap-scan-error",
    "Select the gap size for each area."
  )
  expect(posts()).toBe(0)
})

test("a later untouched slider is the next incomplete item", async ({ page }) => {
  const posts = trackPosts(page)
  await fillThrough(page, "q2")
  await touchSlider(page, "funding")
  await submitFromBottom(page)

  await expectLanding(
    page,
    "#gap-area-howitruns",
    "#gap-slider-howitruns",
    "#gap-scan-error",
    "Select the gap size for each area."
  )
  expect(posts()).toBe(0)
})

test("questions one and two filled stop on question three", async ({ page }) => {
  const posts = trackPosts(page)
  await fillThrough(page, "q3")
  await submitFromBottom(page)

  await expectLanding(
    page,
    "#gap-q3-block",
    "#most_important",
    "#gap-most-important-error",
    "Choose the most important area of focus."
  )
  expect(posts()).toBe(0)
})

test("questions one to three filled stop on question four", async ({ page }) => {
  const posts = trackPosts(page)
  await fillThrough(page, "q4")
  await submitFromBottom(page)

  await expectLanding(
    page,
    "#gap-q4-block",
    "#shows_the_gap",
    "#shows_the_gap-error",
    "Name a campaign or piece of work that shows the gap."
  )
  expect(posts()).toBe(0)
})

test("questions filled and name missing stops on name, not email", async ({ page }) => {
  const posts = trackPosts(page)
  await fillThrough(page, "name")
  await submitFromBottom(page)

  await expect(page.locator("#gap-name-error")).toHaveText("Name and email are required.")
  await expect(page.locator("#name")).toBeFocused()
  await expect(page.locator("#email")).not.toBeFocused()
  await expectPinnedBelowHeader(page, "#gap-name-field")
  await expectClearOfChrome(page, "#gap-name-error")
  expect(posts()).toBe(0)
})

test("invalid email scrolls to the email field and shows the message", async ({ page }) => {
  const posts = trackPosts(page)
  await fillThrough(page, "name")
  await page.locator("#name").fill("Tim Example")
  await page.locator("#email").fill("not-an-email")
  await submitFromBottom(page)

  await expectLanding(page, "#gap-email-field", "#email", "#gap-email-error", "Enter a valid email address.")
  expect(posts()).toBe(0)
})

test("successful submit scrolls the thank-you message below the fixed header", async ({ page }) => {
  let mockedPosts = 0
  await page.unroute("**/api/gap")
  await page.route("**/api/gap", async (route) => {
    expect(route.request().method()).toBe("POST")
    mockedPosts += 1
    const body = route.request().postData() ?? ""
    expect(body).toContain("Ship campaigns faster")
    expect(body).not.toContain("anything_else\":\"")
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    })
  })

  await fillThrough(page, "name")
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
