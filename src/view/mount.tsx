import type { ViewContext } from 'agent-code-extension-api'
import { createRoot } from 'react-dom/client'

import { AgentPanel } from '../agents/AgentPanel'
import { GameAudio } from '../game/audio'
import { Skitgubbe } from '../game/Skitgubbe'
import styles from '../styles.css?inline'

const STYLE_ID = 'agent-code-skitgubbe-styles'

function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = styles
  document.head.append(el)
}

/** The API v2 view mount. One view, one game, so there is no router: the host
 *  opens the modal from "Play Skitgubbe" and the table is the whole surface. */
export function mountSkitgubbe(element: HTMLElement, context: ViewContext): () => void {
  injectStyles()

  // Browsers only start audio from a user gesture. Any key or pointer inside the
  // frame counts, so the first card played can already make a sound.
  const audio = new GameAudio()
  const unlock = () => audio.unlock()
  window.addEventListener('keydown', unlock)
  window.addEventListener('pointerdown', unlock)

  const root = createRoot(element)
  // The agent column sits INSIDE .sg-frame so the host measures one surface:
  // it sizes (and if needed scales) the modal from the frame's width, and a
  // second top-level box would be laid out outside that measurement.
  root.render(
    <div className="sg-frame sg-frame-with-agents">
      <Skitgubbe api={context.api} audio={audio} />
      <AgentPanel sessions={context.api.sessions} />
    </div>,
  )

  return () => {
    window.removeEventListener('keydown', unlock)
    window.removeEventListener('pointerdown', unlock)
    audio.dispose()
    // Deferred: unmounting a React root synchronously from inside the host's own
    // effect cleanup warns and can drop effects.
    queueMicrotask(() => root.unmount())
  }
}
