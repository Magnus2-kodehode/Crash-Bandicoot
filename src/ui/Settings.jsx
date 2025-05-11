import { useState, useEffect } from 'react'
import { volumeManager } from '../utils/volumeManager'

export default function Settings({ onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [musicVolume, setMusicVolume] = useState(0.5)
  const [sfxVolume, setSfxVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(volumeManager.isMuted())

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

  useEffect(() => {
    // Load from localStorage if available
    const storedMusicVolume = localStorage.getItem('musicVolume')
    const storedSfxVolume = localStorage.getItem('sfxVolume')
    if (storedMusicVolume !== null) setMusicVolume(parseFloat(storedMusicVolume))
    if (storedSfxVolume !== null) setSfxVolume(parseFloat(storedSfxVolume))
  }, [])

  useEffect(() => {
    volumeManager.setMusicVolume(musicVolume)
    volumeManager.setSfxVolume(sfxVolume)
    volumeManager.applyVolumeToAllSounds(window.game)

    // Update Phaser audio volume if available
    if (window.game && window.game.sound) {
      window.game.sound.sounds.forEach((sound) => {
        if (sound.key.includes('music') || sound.name?.includes('music')) {
          sound.setVolume(musicVolume)
        } else {
          sound.setVolume(sfxVolume)
        }
      })
    }
  }, [musicVolume, sfxVolume])

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    volumeManager.setMuted(newMuted)
    volumeManager.applyVolumeToAllSounds(window.game)
  }

  return (
    <div className='settings'>
      <div className='settings-title'>Settings</div>

      <div className='settings-container'>
        <div className='settings-item'>
          <label className='settings-option'>Music Volume</label>
          <input
            className='settings-input'
            type='range'
            min='0'
            max='1'
            step='0.05'
            value={musicVolume}
            onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
          />
          <button className='settings-toggle' onClick={toggleMute}>
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>

        <div className='settings-item'>
          <label className='settings-option'>SFX Volume</label>
          <input
            className='settings-input'
            type='range'
            min='0'
            max='1'
            step='0.05'
            value={sfxVolume}
            onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
          />
        </div>

        <div className='settings-item'>
          <label className='settings-option'>Fullscreen</label>
          <button className='settings-input' onClick={toggleFullscreen}>
            {isFullscreen ? '' : ''}
          </button>
        </div>

        <div className='settings-item'>
          <button className='settings-button' onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
