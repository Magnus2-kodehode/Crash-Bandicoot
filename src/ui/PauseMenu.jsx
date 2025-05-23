import { useState, useEffect } from 'react'
import { inputManager } from '../utils/InputManager'
import { saveManager } from '../utils/SaveManager'
import { gameState } from '../GameState'

const options = ['Resume', 'Restart', 'Settings', 'Main Menu', 'Save and Quit']

export default function PauseMenu({ onResume, onSettings, onQuit }) {
  const [selected, setSelected] = useState(0)
  const saveData = {
    // level: '',
    // lives: gameState.lives,
    // score: gameState.score,
    // position: { x: player.x, y: player.y },
  }
  const iM = inputManager

  useEffect(() => {
    const interval = setInterval(() => {
      if (iM.isMenuBackPressed()) {
        onResume()
      } else if (iM.isMenuSelectPressed()) {
        handleSelect()
      } else if (iM.isMenuUpPressed()) {
        setSelected((i) => (i - 1 + options.length) % options.length)
      } else if (iM.isMenuDownPressed()) {
        setSelected((i) => (i + 1) % options.length)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [selected])

  const handleSelect = () => {
    const option = options[selected]
    if (option === 'Resume') onResume()
    if (option === 'Restart') window.location.reload()
    if (option === 'Settings') onSettings()
    if (option === 'Main Menu') onQuit()
    if (option === 'Save and Quit') {
      saveManager.save(saveData)
    }
  }

  return (
    <div className='pause-menu'>
      <div className='menu-title'>Paused</div>
      <div className='pause-options'>
        {options.map((option, i) => (
          <div
            className='pause-option'
            style={{ color: i === selected ? '#ffccoo' : '#fff' }}
            key={option}
          >
            {i === selected ? '> ' : ''}
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}
