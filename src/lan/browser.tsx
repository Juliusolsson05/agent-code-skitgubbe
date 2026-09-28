import { createRoot } from 'react-dom/client'
import { LanApp } from './LanApp'
import { GameAudio } from '../game/audio'
import './browser.css'
const audio = new GameAudio()
window.addEventListener('pointerdown', () => audio.unlock())
window.addEventListener('keydown', () => audio.unlock())
createRoot(document.getElementById('app')!).render(<LanApp audio={audio} />)
// Desktop/tablet browser guests use the same intrinsic table as the extension.
// Scale the complete surface, never squeeze cards independently of hit targets.
const fit = () => {
  const app = document.getElementById('app')!
  const scale = Math.min(1, (innerWidth - 16) / 1240, (innerHeight - 16) / 904)
  app.style.transform = `scale(${scale})`
  app.style.marginTop = `${Math.max(8, (innerHeight - 904 * scale) / 2)}px`
  app.style.marginLeft = `${Math.max(8, (innerWidth - 1240 * scale) / 2)}px`
}
window.addEventListener('resize', fit); fit()
