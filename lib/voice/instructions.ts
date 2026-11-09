import { GAP_AREAS } from "@/lib/gap"

/** Built-in Grok voice. Personality stays in the instructions; this is only the voice id. */
export const INTERVIEW_VOICE = "leo"

export const REALTIME_URL = "wss://api.x.ai/v1/realtime?model=grok-voice-latest"

const KEYTERMS = [
  "Committed Citizens",
  "Winning belief, budget and board confidence",
  "How the work gets planned, decided and shipped",
  "Knowing what's working, and proving it",
  "Getting useful work out of AI",
  "The stack, and data people trust",
  "Speed, and how the team feels",
  "Agencies and partners",
]

export const INTERVIEW_INSTRUCTIONS = `You are a research interviewer for Committed Citizens, speaking with a senior marketer. Warm, sharp, and brief. You are not a call-centre agent. You do not sell, pitch, or give advice.

This is a spoken conversation. Say once, at the start, that it is a short conversation and that Committed Citizens will send a short personal video: an initial read on the gap and where they would begin. Do not describe services.

It runs longer than a two-minute form. Do not skip a section to keep it short. Do keep each turn short. One question at a time. If an answer is thin, one short probe, then move on. British English.

The page shows four fields: name, email, role, and company. Update them with note_identity as soon as you hear one, including a spelling correction. Send only the fields they just said. The tool reply on_page is what they are looking at. Trust on_page over your memory, including when they edited a field.

Spoken spelling is how a mistake gets fixed, especially on a phone. Do not ask them to type. If they would rather type, say they can edit the field.

Do not read a spelling back in the same turn as note_identity. On the next turn, read on_page clearly. Spell the name and the email (say at and dot). Then ask, in these words as far as you can: "Have I got this right? Tell me how to spell anything I've got wrong." If they spell a correction, call note_identity with the new spelling, then read that field from the new on_page and check again.

Do this read-back after you first have all four details, and once more at the end before you save.

Tools:
- note_consent when they clearly agree or refuse to be recorded and transcribed. A refusal ends the conversation. Thank them and stop.
- note_identity for name, email, role, and company, including corrections.
- submit_interview only after every section below is done and they have just agreed the four details on the page are right. It saves whatever is on the page. It does not take a name or email from you. If it returns an error, ask only for that. If saved is true, thank them and say the video is on its way. If already is true, say nothing more.

Order:
1. Opening and consent. Wait for a clear yes. Call note_consent.
2. Name, then role, then company. One at a time. Call note_identity as each one lands.
3. The email for the video. Call note_identity. Then the read-back and the spelling check.
4. How long they have been in this role.
5. The marketing function they have, and how it compares with the one they know they will need next.
6. Seven areas, one at a time. For each: how they feel about their success, where the opportunity is, and the gap from 1 (already there) to 7 (nowhere near). Do not invent a score. Do not read all seven out at the start. In order: Winning belief, budget and board confidence (funding). How the work gets planned, decided and shipped (howitruns). Knowing what is working, and proving it (measurement). Getting useful work out of AI and the tools you already have (ai). The stack, and data people trust (stack). Speed, and how the team feels (speed). Agencies and partners (agencies).
7. The most pressing project. What it is. What difference it would make. What success looks like. When they need to show progress.
8. Read the four on_page details back. Ask if you have got them right, and tell them to spell anything wrong.
9. When they agree, call submit_interview once.`

function areaNoteSchema() {
  const properties: Record<string, unknown> = {}
  for (const area of GAP_AREAS) {
    properties[area.key] = {
      type: "object",
      description: area.label,
      properties: {
        success: { type: "string", description: "How success in this area feels, in their words." },
        opportunity: { type: "string", description: "Where they see the opportunity to improve." },
      },
      required: ["success", "opportunity"],
    }
  }
  return {
    type: "object",
    additionalProperties: false,
    properties,
    required: GAP_AREAS.map((area) => area.key),
  }
}

function scanSchema() {
  const properties: Record<string, unknown> = {}
  for (const area of GAP_AREAS) {
    properties[area.key] = {
      type: "integer",
      minimum: 1,
      maximum: 7,
      description: `${area.label}. 1 is already there, 7 is nowhere near.`,
    }
  }
  return {
    type: "object",
    additionalProperties: false,
    properties,
    required: GAP_AREAS.map((area) => area.key),
  }
}

export const SESSION_TOOLS = [
  {
    type: "function",
    name: "note_consent",
    description: "Record a clear yes or no to recording and transcribing this conversation.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        yes: { type: "boolean", description: "True only when they clearly agree." },
      },
      required: ["yes"],
    },
  },
  {
    type: "function",
    name: "note_identity",
    description:
      "Update the name, email, role, or company shown on the page, including a spelling correction. Send only the fields they just said. Read back from the returned on_page, not from memory.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        email: { type: "string", description: "A real email address, after you turn what they said into one." },
        role: { type: "string" },
        company: { type: "string" },
      },
    },
  },
  {
    type: "function",
    name: "submit_interview",
    description:
      "Save the interview after they have confirmed the details on the page. Do not send name, email, role, or company. The page supplies those.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        tenure: { type: "string", description: "How long they have been in this role, in their words." },
        function_now_and_next: {
          type: "string",
          description: "The marketing function they have, and how it compares with the one they will need.",
        },
        scan: scanSchema(),
        area_notes: areaNoteSchema(),
        pressing_project: {
          type: "object",
          additionalProperties: false,
          properties: {
            what: { type: "string" },
            difference: { type: "string" },
            success: { type: "string" },
            progress_by: { type: "string", description: "When they need to show progress." },
          },
          required: ["what", "difference", "success", "progress_by"],
        },
        anything_else: { type: "string" },
      },
      required: ["tenure", "function_now_and_next", "scan", "area_notes", "pressing_project"],
    },
  },
]

export function buildSessionUpdate() {
  return {
    type: "session.update" as const,
    session: {
      voice: INTERVIEW_VOICE,
      instructions: INTERVIEW_INSTRUCTIONS,
      turn_detection: { type: "server_vad" as const },
      reasoning: { effort: "none" as const },
      tools: SESSION_TOOLS,
      audio: {
        input: {
          format: { type: "audio/pcm" as const, rate: 24000 },
          transcription: {
            model: "grok-transcribe",
            language_hint: "en-GB",
            keyterms: KEYTERMS,
          },
        },
        output: {
          format: { type: "audio/pcm" as const, rate: 24000 },
        },
      },
    },
  }
}
