// The table's sound, rebuilt after the owner called v1 "just annoying".
//
// What was wrong with v1, and the rules that replace it:
// - It made a sound PER CARD. A deal landed 27–36 clicks, a pickup 30, and every
//   rearrangement of a bot's hand clicked too. Now there is at most one sound per
//   move: one "place" when a play lands, one soft riffle for the whole deal, one
//   gather for a pickup. Cards moving around the table are otherwise silent.
// - It buzzed on every rejected click. Refusals are shown, never sounded.
// - Its noise bursts were bright and dry (high-passed hiss, sawtooth). Everything here
//   is low-passed, soft-attacked and quiet, through one master gain and a gentle
//   compressor, so nothing pokes out of the mix.
// - Only three moments are allowed to be noticeable: a burn, your turn arriving (a
//   quiet two-note wooden chime, because bots move on their own and you need to know
//   when to look), and the end of the game.
//
// All synthesized: the extension frame's CSP forbids loading audio files. The
// AudioContext is created lazily in unlock(), from a user gesture, because browsers
// refuse to start audio any other way.

const MASTER = 0.5

export class GameAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private noiseBuf: AudioBuffer | null = null
  private muted = false
  private last = new Map<string, number>()

  unlock(): void {
    if (this.muted) return
    if (!this.ctx) {
      try {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (!Ctor) return
        const ctx = new Ctor()
        const master = ctx.createGain()
        master.gain.value = MASTER
        const comp = ctx.createDynamicsCompressor()
        comp.threshold.value = -20
        comp.knee.value = 12
        comp.ratio.value = 3
        master.connect(comp)
        comp.connect(ctx.destination)
        const len = Math.floor(ctx.sampleRate * 0.6)
        const buf = ctx.createBuffer(1, len, ctx.sampleRate)
        const data = buf.getChannelData(0)
        // Brown-ish noise (integrated white noise): paper and cloth sound dull and soft,
        // which is what cards on wool sound like. White noise is what made v1 hiss.
        let v = 0
        for (let i = 0; i < len; i++) {
          v = (v + (Math.random() * 2 - 1) * 0.08) * 0.985
          data[i] = v * 3
        }
        this.ctx = ctx
        this.master = master
        this.noiseBuf = buf
      } catch {
        this.ctx = null
      }
    }
    if (this.ctx?.state === 'suspended') void this.ctx.resume().catch(() => {})
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    if (!this.ctx || !this.master) return
    // Ramp the shared gain so notes already scheduled (a chord's tail) go quiet too.
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setTargetAtTime(muted ? 0 : MASTER, now, 0.02)
  }

  get isMuted(): boolean {
    return this.muted
  }

  /** At most one of `key` per `gap` seconds, on the audio clock. */
  private admit(key: string, gap: number): boolean {
    const ctx = this.ctx
    if (!ctx || this.muted) return false
    const last = this.last.get(key) ?? -Infinity
    if (ctx.currentTime - last < gap && ctx.currentTime >= last) return false
    this.last.set(key, ctx.currentTime)
    return true
  }

  private jitter(cents: number): number {
    return 2 ** (((Math.random() * 2 - 1) * cents) / 1200)
  }

  private tone(freq: number, dur: number, gain: number, at = 0, type: OscillatorType = 'sine', attack = 0.008): void {
    const ctx = this.ctx
    if (!ctx || !this.master || this.muted) return
    const t = ctx.currentTime + at
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    env.gain.setValueAtTime(0.0001, t)
    env.gain.linearRampToValueAtTime(gain, t + attack)
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(env)
    env.connect(this.master)
    osc.onended = () => { osc.disconnect(); env.disconnect() }
    osc.start(t)
    osc.stop(t + dur + 0.05)
  }

  private rustle(dur: number, gain: number, cutoff: number, at = 0, attack = 0.01, cutoffTo?: number): void {
    const ctx = this.ctx
    if (!ctx || !this.master || this.muted || !this.noiseBuf) return
    const t = ctx.currentTime + at
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuf
    src.loop = true
    src.playbackRate.value = this.jitter(120)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(cutoff, t)
    if (cutoffTo) lp.frequency.exponentialRampToValueAtTime(cutoffTo, t + dur)
    const env = ctx.createGain()
    env.gain.setValueAtTime(0.0001, t)
    env.gain.linearRampToValueAtTime(gain, t + attack)
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(lp)
    lp.connect(env)
    env.connect(this.master)
    src.onended = () => { src.disconnect(); lp.disconnect(); env.disconnect() }
    src.start(t, Math.random() * 0.5)
    src.stop(t + dur + 0.05)
  }

  /** A card set lands on the pile: a soft, dull slap on wool. */
  place(): void {
    if (!this.admit('place', 0.06)) return
    const j = this.jitter(80)
    this.rustle(0.09, 0.22, 1400 * j, 0, 0.003)
    this.tone(150 * j, 0.07, 0.05)
  }

  /** The whole deal as one gentle riffle, not thirty clicks. */
  deal(): void {
    if (!this.admit('deal', 0.5)) return
    for (let i = 0; i < 9; i++) this.rustle(0.05, 0.08 + Math.random() * 0.04, 1800, i * 0.09 + Math.random() * 0.02, 0.004)
  }

  /** A blind card turns over. */
  reveal(): void {
    if (!this.admit('reveal', 0.1)) return
    this.rustle(0.12, 0.12, 2200, 0, 0.02, 900)
  }

  /** A pile slides into someone's hand. */
  gather(): void {
    if (!this.admit('gather', 0.2)) return
    this.rustle(0.32, 0.14, 1600, 0, 0.06, 500)
  }

  /** The pile burns: a warm, low whoomp that swells and settles. Noticeable, not loud. */
  burn(): void {
    if (!this.admit('burn', 0.3)) return
    this.rustle(0.55, 0.3, 700, 0, 0.05, 2400)
    this.tone(82, 0.45, 0.12, 0.02, 'sine', 0.04)
    this.tone(123, 0.35, 0.05, 0.05, 'triangle', 0.04)
  }

  /** Your turn: a quiet two-note wooden chime (a fifth, soft attack, no tail). */
  yourTurn(): void {
    if (!this.admit('turn', 0.4)) return
    this.tone(660, 0.18, 0.045, 0, 'triangle', 0.01)
    this.tone(990, 0.22, 0.035, 0.09, 'triangle', 0.01)
  }

  /** You got out (not first): a small warm major third. */
  out(): void {
    this.tone(523, 0.3, 0.06, 0, 'triangle')
    this.tone(659, 0.4, 0.05, 0.1, 'triangle')
  }

  /** You were first out: a short, bright, rising arpeggio. */
  won(): void {
    ;[523, 659, 784, 1047].forEach((f, i) => this.tone(f, i === 3 ? 0.6 : 0.25, 0.06, i * 0.1, 'triangle'))
  }

  /** You are the skitgubbe: a gentle falling pair, rueful rather than punishing. */
  lost(): void {
    this.tone(392, 0.35, 0.06, 0, 'triangle')
    this.tone(311, 0.55, 0.05, 0.18, 'triangle')
  }

  dispose(): void {
    if (this.ctx) void this.ctx.close().catch(() => {})
    this.ctx = null
    this.master = null
  }
}
