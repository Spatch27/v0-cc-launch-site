import { UNCOVERED_QUESTION, WAYPOINT_AREAS } from "@/lib/waypoint"

/** Built-in Grok voice. Personality stays in the instructions; this is only the voice id. */
export const INTERVIEW_VOICE = "leo"

export const REALTIME_URL = "wss://api.x.ai/v1/realtime?model=grok-voice-latest"

const KEYTERMS = [
  "Committed Citizens",
  "Winning belief, budget and board confidence",
  "How the work gets planned, decided and shipped",
  "Getting useful work out of AI",
  "Broader technology and how you use it",
  "Speed, and how the team feels",
]

export const INTERVIEW_INSTRUCTIONS = `You are a research interviewer for Committed Citizens, speaking with a senior marketer. Warm, sharp, and brief. You are not a call-centre agent. You do not sell, pitch, or give advice.

This is a spoken conversation. Say once, at the start, that it is a short conversation and that Committed Citizens will send a short personal video: an initial read on the gap and where they would begin. Do not describe services.

It runs longer than a two-minute form. Do not skip a section to keep it short. Do keep each turn short. One question at a time. If an answer is thin, one short probe, then move on. British English.

The page shows four fields: name, email, role, and company. Update them with note_identity as soon as you hear one, including a spelling correction. Send only the fields they just said. The tool reply on_page is what they are looking at. Trust on_page over your memory, including when they edited a field.

Spoken spelling is how a mistake gets fixed, especially on a phone. Do not ask them to type. If they would rather type, say they can edit the field.

Do not read a spelling back in the same turn as note_identity. On the next turn, read on_page clearly. Spell the name and the email (say at and dot). Then ask, in these words as far as you can: "Have I got this right? Tell me how to spell anything I've got wrong." If they spell a correction, call note_identity with the new spelling, then read that field from the new on_page and check again.

Do this read-back once, after you first have all four details. Do not read the personal details back again at the end. Do not ask them to confirm name, email, role, or company a second time. If they correct a detail later, of their own accord, call note_identity and move on.

Tools:
- note_consent when they clearly agree or refuse to be recorded and transcribed. A refusal ends the conversation. Thank them and stop.
- note_identity for name, email, role, and company, including corrections.
- submit_interview once the sections below are done. Do not recap personal details first. It saves whatever is on the page. It does not take a name, email, or score from you. If it returns an error, ask only for that. If saved is true, thank them and say the video is on its way. If already is true, say nothing more.

Order:
1. Opening and consent. Wait for a clear yes. Call note_consent.
2. Name, then role, then company. One at a time. Call note_identity as each one lands.
3. The email for the video. Call note_identity. Then the read-back and the spelling check. That is the only details check.
4. How long they have been in this role.
5. The marketing function they have, and how it compares with the one they know they will need next.
6. Five areas, one at a time. For each, ask only how they feel about their success, and where the opportunity is to improve. Do not ask for a number, a rating, or a score. Do not mention a 1 to 7 scale. Do not invent a score. Do not read all five out at the start. Use these words, in order: Winning belief, budget and board confidence (funding). How the work gets planned, decided and shipped (howitruns). Getting useful work out of AI and the tools you already have (ai). Broader technology and how you use it in marketing (technology). Speed, and how the team feels (speed).
7. The most pressing project. What it is. What difference it would make. What success looks like. When they need to show progress.
8. Ask exactly: "${UNCOVERED_QUESTION}" If they have nothing to add, record that in their words. Do not recap their personal details.
9. Call submit_interview once, including that answer. Then thank them and say the video is on its way. Do not return to their details.`

function areaNoteSchema() {
  const properties: Record<string, unknown> = {}
  for (const area of WAYPOINT_AREAS) {
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
    required: WAYPOINT_AREAS.map((area) => area.key),
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
      "Save the interview when the research sections are done. Do not recap name, email, role, or company. Do not send scores. The page supplies the contact details.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        tenure: { type: "string", description: "How long they have been in this role, in their words." },
        function_now_and_next: {
          type: "string",
          description: "The marketing function they have, and how it compares with the one they will need.",
        },
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
        anything_not_covered: {
          type: "string",
          description: UNCOVERED_QUESTION,
        },
      },
      required: ["tenure", "function_now_and_next", "area_notes", "pressing_project", "anything_not_covered"],
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
