import { useRef, useState, useEffect } from 'react'
import Phaser from 'phaser'
import { PhaserGame } from './PhaserGame'
import { EventBus } from './EventBus'
import { inputManager } from './utils/InputManager'
import UI from './ui/UI'

export default function App() {
  const [showScore, setShowScore] = useState(false)
  const [showPauseMenu, setShowPauseMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBossCutscene, setShowBossCutscene] = useState(false)
  const [showBossSubtitle, setShowBossSubtitle] = useState(false)

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef()

  const changeScene = () => {
    const scene = phaserRef.current.scene

    if (scene) {
      scene.changeScene()
    }
  }

  // Event emitted from the PhaserGame component
  const currentScene = (scene) => {
    setShowScore(scene.scene.key === 'Game')
  }

  useEffect(() => {
    const togglePause = () => {
      setShowPauseMenu((prev) => !prev)
    }

    EventBus.on('toggle-pause-menu', togglePause)
    return () => {
      EventBus.off('toggle-pause-menu', togglePause)
    }
  })

  useEffect(() => {
    const handleShowSettings = () => {
      setShowSettings(true)
    }

    EventBus.on('show-settings-menu', handleShowSettings)
    return () => {
      EventBus.off('show-settings-menu', handleShowSettings)
    }
  }, [])

  const closeSettings = () => {
    setShowSettings(false)
  }

  return (
    <div id='app'>
      {/* <div className='header'>
        <div className='title'>Crash Bandicoot: Pixel Pandemonium</div>
        <div className='buttons'>
          <div>
            <button className='button' onClick={changeScene}>
              Change Scene
            </button>
          </div>
        </div>
      </div> */}
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene}>
        <UI
          showHUD={showScore}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          showPauseMenu={showPauseMenu}
          setShowPauseMenu={setShowPauseMenu}
          showCutscene={showBossCutscene}
          showSubtitles={showBossSubtitle}
          onCloseSettings={closeSettings}
        />
      </PhaserGame>
    </div>
  )
}
