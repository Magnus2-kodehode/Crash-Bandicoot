import React, { useState, useEffect, useRef } from 'react'
import { EventBus } from '../EventBus'
import { inputManager } from '../utils/InputManager'
import { volumeManager } from '../utils/VolumeManager'

export default function Settings({ onClose }) {
  const iM = inputManager
  const vM = volumeManager

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [musicVolume, setMusicVolume] = useState(0.5)
  const [sfxVolume, setSfxVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(vM.isMuted())
  const [selectedIndex, setSelectedIndex] = useState(0)

  const refItems = [
    useRef(null), // Music volume slider
    useRef(null), // Music mute button
    useRef(null), // SFX volume slider
    useRef(null), // SFX mute button
    useRef(null), // Fullscreen button
    useRef(null), // Back button
  ]

  const toggleFullscreen = () => {
    const elem = document.documentElement
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.()
      elem.webkitRequestFullscreen?.()
      elem.msRequestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      document.webkitExitFullscreen?.()
      document.msExitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    vM.setMuted(newMuted)
    vM.applyVolumeToAllSounds(window.game)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (iM.isMenuDownPressed()) {
        setSelectedIndex((i) => (i + 1) % refItems.length)
      } else if (iM.isMenuUpPressed()) {
        setSelectedIndex((i) => (i - 1 + refItems.length) % refItems.length)
      } else if (iM.isMenuLeftPressed()) {
        const el = refItems[selectedIndex]?.current
        if (el?.type === 'range') {
          const newVal = Math.max(0, parseFloat(el.value) - 0.05)
          el.value = newVal
          el.dispatchEvent(new Event('input', { bubbles: true }))
        }
      } else if (iM.isMenuRightPressed()) {
        const el = refItems[selectedIndex]?.current
        if (el?.type === 'range') {
          const newVal = Math.min(1, parseFloat(el.value) + 0.05)
          el.value = newVal
          el.dispatchEvent(new Event('input', { bubbles: true }))
        }
      } else if (iM.isMenuSelectPressed()) {
        refItems[selectedIndex]?.current?.click()
      } else if (iM.isMenuBackPressed()) {
        onClose()
      }
    }, 150)
    return () => clearInterval(interval)
  }, [selectedIndex, onClose])

  useEffect(() => {
    refItems[selectedIndex]?.current?.focus()
  }, [selectedIndex])

  useEffect(() => {
    vM.setMusicVolume(musicVolume)
    vM.setSfxVolume(sfxVolume)
    vM.applyVolumeToAllSounds(window.game)
  }, [musicVolume, sfxVolume])

  useEffect(() => {
    EventBus.emit('show-settings-menu')
    return () => {
      EventBus.emit('hide-settings-menu')
    }
  }, [])

  return (
    <div className='settings'>
      <div className='settings-title'>Settings</div>

      <div className='settings-container'>
        <div className='settings-item'>
          <div className='settings-option'>Music Volume</div>
          <input
            className='settings-range'
            type='range'
            min='0'
            max='1'
            step='0.05'
            value={musicVolume}
            ref={refItems[0]}
            onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
          />
          <button className='settings-toggle' ref={refItems[1]} onClick={toggleMute}>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>

        <div className='settings-item'>
          <div className='settings-option'>SFX Volume</div>
          <input
            className='settings-range'
            type='range'
            min='0'
            max='1'
            step='0.05'
            value={sfxVolume}
            ref={refItems[2]}
            onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
          />
          <button className='settings-toggle' ref={refItems[3]} onClick={toggleMute}>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>

        <div className='settings-item'>
          <div className='settings-option'>Fullscreen</div>
          <button className='settings-toggle' ref={refItems[4]} onClick={toggleFullscreen}>
            {isFullscreen ? 'yes' : 'no'}
          </button>
        </div>

        <div className='settings-item'>
          <button className='settings-button' ref={refItems[5]} onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
