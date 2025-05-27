import { useState, useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { PhaserGame } from './PhaserGame'
import { EventBus } from './EventBus'

export default function App() {
  const phaserRef = useRef()

  const changeScene = () => {
    const scene = phaserRef.current.scene

    if (scene) {
      scene.changeScene()
    }
  }

  useEffect(() => {
    const togglePause = () => {}

    EventBus.on('toggle-pause-menu', togglePause)
    return () => {
      EventBus.off('toggle-pause-menu', togglePause)
    }
  }, [])

  return (
    <div id='app'>
      <PhaserGame ref={phaserRef} />
    </div>
  )
}
