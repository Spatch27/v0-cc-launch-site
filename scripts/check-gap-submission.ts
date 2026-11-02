import { GAP_AREAS, formatGapScanEmailHtml, readGapPerson, type GapScan } from "../lib/gap"
import { POST } from "../app/api/gap/route"

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message)
}

const scan = Object.fromEntries(GAP_AREAS.map((area) => [area.key, 4])) as GapScan
scan.funding = 7
scan.speed = 1

const areas = GAP_AREAS.map((area) => ({
  key: area.key,
  label: area.label,
  gap_size: scan[area.key],
  gap_size_label: "unused",
}))

const personWithExtras = readGapPerson({
  name: "  Ada Lovelace  ",
  email: " ada@example.com ",
  company: "Analytical Engines",
  role: "Founder",
  marketing_headcount: "12",
})
assert(personWithExtras?.name === "Ada Lovelace", "name is trimmed")
assert(personWithExtras?.email === "ada@example.com", "email is trimmed")
assert(personWithExtras && !("company" in personWithExtras), "company is not kept on the person")
assert(readGapPerson({ name: "Ada", email: "not-an-email" }) === null, "invalid email is rejected")
assert(readGapPerson({ name: "Ada" }) === null, "missing email is rejected")
assert(readGapPerson({ email: "ada@example.com" }) === null, "missing name is rejected")

const html = formatGapScanEmailHtml({
  person: { name: "Ada Lovelace", email: "ada@example.com" },
  anything_else: "First line\n<script>alert(1)</script>",
  must_achieve: "Ship faster",
  shows_the_gap: "Q4 launch",
  scan,
  widest_gaps: ["funding"],
  closest: "speed",
  areas,
  most_important: "ai",
})
assert(html.includes("Name: Ada Lovelace"), "email includes the name")
assert(html.includes("Email: ada@example.com"), "email includes the address")
assert(html.includes("Anything else we should know? First line<br>&lt;script&gt;alert(1)&lt;/script&gt;"), "comment is kept and escaped")
assert(!html.includes("Company:"), "email no longer asks for a company")
assert(!html.includes("Marketing headcount"), "email no longer asks for team size")
assert(!html.includes("Role:"), "email no longer asks for a role")

async function post(body: unknown) {
  const response = await POST(new Request("http://local.test/api/gap", { method: "POST", body: JSON.stringify(body) }))
  return { status: response.status, json: await response.json() }
}

async function main() {
  delete process.env.RESEND_API_KEY

  const validBody = {
    person: { name: "Ada Lovelace", email: "ada@example.com", company: "Should be ignored" },
    anything_else: "A note for the video",
    must_achieve: "Ship faster",
    scan,
    most_important: "ai",
    widest_gaps: ["funding", "not-an-area"],
    closest: "speed",
    shows_the_gap: "Q4 launch",
  }

  const accepted = await post(validBody)
  assert(
    accepted.status === 200 && accepted.json.success === true,
    `valid submission without company should succeed, got ${accepted.status} ${JSON.stringify(accepted.json)}`
  )

  const missingAchieve = await post({ ...validBody, must_achieve: "   " })
  assert(missingAchieve.status === 400, "blank question one is rejected")

  const missingShows = await post({ ...validBody, shows_the_gap: "" })
  assert(missingShows.status === 400, "blank question four is rejected")

  const missingEmail = await post({ ...validBody, person: { name: "Ada" } })
  assert(missingEmail.status === 400, "missing email is rejected")

  const badEmail = await post({ ...validBody, person: { name: "Ada", email: "ada" } })
  assert(badEmail.status === 400, "invalid email is rejected")

  const missingScan = await post({ ...validBody, scan: {} })
  assert(missingScan.status === 400, "missing scan is rejected")

  console.log("gap submission checks passed")
}

main()
