export type MicProcessing = {
  echoCancellation: boolean
  noiseSuppression: boolean
  autoGainControl: boolean
}

export function readMicProcessing(settings: {
  echoCancellation?: boolean
  noiseSuppression?: boolean
  autoGainControl?: boolean
}): MicProcessing {
  return {
    echoCancellation: settings.echoCancellation === true,
    noiseSuppression: settings.noiseSuppression === true,
    autoGainControl: settings.autoGainControl === true,
  }
}

/** Full duplex only when the browser applied echo cancellation and playback is on a path it can hear. */
export function duplexOpen(input: { echoCancellation: boolean; playback: "webrtc" | "direct" | "pending"; leak: boolean }): boolean {
  return input.echoCancellation && input.playback === "webrtc" && !input.leak
}

/** While the interviewer is audible, a half-duplex session must not upload the mic. */
export function shouldSendMic(duplex: boolean, assistantPlaying: boolean): boolean {
  return duplex || !assistantPlaying
}

/**
 * Speaker leakage is a raised, fairly flat level for the whole reply.
 * A person talking over it peaks harder, so barge-in stays full duplex.
 */
export function leakFromPlayback(input: {
  quietRms: number
  meanPlaybackRms: number
  peakPlaybackRms: number
  windows: number
}): boolean {
  if (input.windows < 5) return false
  const floor = Math.max(0.012, input.quietRms * 3.5)
  if (input.meanPlaybackRms <= floor) return false
  if (input.peakPlaybackRms >= 0.15) return false
  if (input.meanPlaybackRms > 0 && input.peakPlaybackRms > input.meanPlaybackRms * 2.5) return false
  return true
}
