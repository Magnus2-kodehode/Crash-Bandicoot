export const volumeManager = {
  getMusicVolume() {
    const value = parseFloat(localStorage.getItem('musicVolume'))
    return isNaN(value) ? 0.5 : value
  },
  getSfxVolume() {
    const value = parseFloat(localStorage.getItem('sfxVolume'))
    return isNaN(value) ? 0.5 : value
  },
  setMusicVolume(volume) {
    localStorage.setItem('musicVolume', volume)
  },
  setSfxVolume(volume) {
    localStorage.setItem('sfxVolume', volume)
  },
  isMuted() {
    return localStorage.getItem('isMuted') === 'true'
  },
  setMuted() {
    localStorage.setItem('isMuted', value ? 'true' : 'false')
  },
  applyVolumeToAllSounds(game) {
    if (!game || !game.sound) return

    const musicVol = this.isMuted() ? 0 : this.getMusicVolume()
    const sfxVol = this.isMuted() ? 0 : this.getSfxVolume()

    game.sound.sounds.forEach((sound) => {
      const isMusic = sound.key.includes('music') || sound.name?.includes('music')
      sound.setVolume(isMusic ? musicVol : sfxVol)
    })
  },
}
