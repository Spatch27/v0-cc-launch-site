export const TARGET_RATE = 24000

export function resampleLinear(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (input.length === 0 || fromRate === toRate) return input
  const ratio = fromRate / toRate
  const outLength = Math.max(1, Math.round(input.length / ratio))
  const out = new Float32Array(outLength)
  const last = input.length - 1
  for (let i = 0; i < outLength; i++) {
    const position = i * ratio
    const left = Math.floor(position)
    const right = Math.min(left + 1, last)
    const mix = position - left
    out[i] = input[left] * (1 - mix) + input[right] * mix
  }
  return out
}

export function rms(samples: Float32Array): number {
  if (samples.length === 0) return 0
  let sum = 0
  for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i]
  return Math.sqrt(sum / samples.length)
}

export function floatToPcm16Base64(samples: Float32Array): { base64: string; bytes: number } {
  const bytes = new Uint8Array(samples.length * 2)
  const view = new DataView(bytes.buffer)
  for (let i = 0; i < samples.length; i++) {
    const sample = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(i * 2, sample < 0 ? Math.round(sample * 0x8000) : Math.round(sample * 0x7fff), true)
  }
  let binary = ""
  const step = 0x8000
  for (let i = 0; i < bytes.length; i += step) {
    binary += String.fromCharCode(...bytes.subarray(i, i + step))
  }
  return { base64: btoa(binary), bytes: bytes.length }
}

export function pcm16Base64ToFloat32(base64: string): Float32Array {
  const binary = atob(base64)
  const length = Math.floor(binary.length / 2)
  const out = new Float32Array(length)
  for (let i = 0; i < length; i++) {
    const lo = binary.charCodeAt(i * 2)
    const hi = binary.charCodeAt(i * 2 + 1)
    let value = (hi << 8) | lo
    if (value & 0x8000) value -= 0x10000
    out[i] = value < 0 ? value / 0x8000 : value / 0x7fff
  }
  return out
}

export function base64Bytes(value: string): number {
  const cleaned = value.replace(/\s/g, "")
  if (!cleaned) return 0
  const padding = cleaned.endsWith("==") ? 2 : cleaned.endsWith("=") ? 1 : 0
  return Math.max(0, Math.floor((cleaned.length * 3) / 4) - padding)
}
