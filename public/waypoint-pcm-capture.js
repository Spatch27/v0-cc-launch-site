class WaypointPcmCapture extends AudioWorkletProcessor {
  constructor() {
    super()
    this.pending = []
    this.pendingLength = 0
    this.chunkSize = Math.max(1, Math.round(sampleRate * 0.1))
  }

  process(inputs) {
    const channel = inputs[0] && inputs[0][0]
    if (channel && channel.length) {
      const copy = new Float32Array(channel)
      this.pending.push(copy)
      this.pendingLength += copy.length
      while (this.pendingLength >= this.chunkSize) {
        const chunk = new Float32Array(this.chunkSize)
        let offset = 0
        while (offset < this.chunkSize && this.pending.length) {
          const head = this.pending[0]
          const need = this.chunkSize - offset
          if (head.length <= need) {
            chunk.set(head, offset)
            offset += head.length
            this.pending.shift()
            this.pendingLength -= head.length
          } else {
            chunk.set(head.subarray(0, need), offset)
            this.pending[0] = head.subarray(need)
            this.pendingLength -= need
            offset += need
          }
        }
        this.port.postMessage(chunk, [chunk.buffer])
      }
    }
    return true
  }
}

registerProcessor("waypoint-pcm-capture", WaypointPcmCapture)
