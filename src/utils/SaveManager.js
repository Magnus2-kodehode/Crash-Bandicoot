const SAVE_KEY = 'crashbandicoot_save'

export const saveManager = {
  save(data) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data))
      console.log('Game saved.')
    } catch (err) {
      console.error('Failed to save game:', err)
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY)
      if (!raw) return null
      return JSON.parse(raw)
    } catch (err) {
      console.error('Failed to load game:', err)
      return null
    }
  },

  clear() {
    localStorage.removeItem(SAVE_KEY)
    console.log('Save cleared.')
  },

  hasSave() {
    return localStorage.getItem(SAVE_KEY) !== null
  },
}
