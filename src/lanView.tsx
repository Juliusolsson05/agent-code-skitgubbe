import { defineView } from 'agent-code-extension-api'
import { createRoot } from 'react-dom/client'
import { LanApp, type LanApi } from './lan/LanApp'
import { GameAudio } from './game/audio'
import { AgentPanel } from './agents/AgentPanel'
import styles from './styles.css?inline'
export default defineView({
  mount(element, context) {
    const style = document.createElement('style'); style.textContent = styles; document.head.append(style)
    const audio = new GameAudio()
    const unlock = () => audio.unlock()
    window.addEventListener('pointerdown', unlock); window.addEventListener('keydown', unlock)
    const root = createRoot(element)
    // Only the Agent Code view gets the agent column: lan/browser.tsx renders
    // LanApp alone for friends joining from a plain browser, who have no
    // Agent Code to ask.
    root.render(
      <div className="sg-lan-with-agents">
        <LanApp api={context.api as unknown as LanApi} audio={audio} />
        <AgentPanel sessions={context.api.sessions} />
      </div>,
    )
    return () => {
      window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock)
      audio.dispose(); style.remove(); queueMicrotask(() => root.unmount())
    }
  },
})
