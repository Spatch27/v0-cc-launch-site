export type SpeakerReference = {
  close: () => void
}

/**
 * Play assistant audio through a local WebRTC loopback and an audio element.
 * Browser echo cancellation only hears playout that belongs to a WebRTC track.
 * AudioContext.destination is not that reference, so it is not used here.
 */
export function attachSpeakerReference(track: MediaStreamTrack, audio: HTMLAudioElement): Promise<SpeakerReference> {
  if (typeof RTCPeerConnection === "undefined") return Promise.reject(new Error("WebRTC is unavailable"))

  const sender = new RTCPeerConnection()
  const receiver = new RTCPeerConnection()
  let settled = false

  const close = () => {
    sender.onicecandidate = null
    receiver.onicecandidate = null
    receiver.ontrack = null
    sender.close()
    receiver.close()
    audio.srcObject = null
  }

  return new Promise((resolve, reject) => {
    const finish = (err?: Error) => {
      if (settled) return
      settled = true
      if (err) {
        close()
        reject(err)
        return
      }
      resolve({ close })
    }

    const timer = window.setTimeout(() => finish(new Error("Speaker reference timed out")), 3000)

    sender.onicecandidate = (event) => {
      if (event.candidate) void receiver.addIceCandidate(event.candidate).catch(() => undefined)
    }
    receiver.onicecandidate = (event) => {
      if (event.candidate) void sender.addIceCandidate(event.candidate).catch(() => undefined)
    }
    receiver.ontrack = (event) => {
      const remote = event.streams[0] ?? new MediaStream([event.track])
      if ("playoutDelayHint" in event.track) {
        ;(event.track as MediaStreamTrack & { playoutDelayHint?: number }).playoutDelayHint = 0
      }
      audio.srcObject = remote
      void audio
        .play()
        .then(() => {
          window.clearTimeout(timer)
          finish()
        })
        .catch((err: unknown) => {
          window.clearTimeout(timer)
          finish(err instanceof Error ? err : new Error("Speaker playback was blocked"))
        })
    }

    sender.addTrack(track, new MediaStream([track]))
    void sender
      .createOffer()
      .then(async (offer) => {
        await sender.setLocalDescription(offer)
        await receiver.setRemoteDescription(offer)
        const answer = await receiver.createAnswer()
        await receiver.setLocalDescription(answer)
        await sender.setRemoteDescription(answer)
      })
      .catch((err: unknown) => {
        window.clearTimeout(timer)
        finish(err instanceof Error ? err : new Error("Speaker reference failed"))
      })
  })
}
