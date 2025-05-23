import { EventBus } from '../EventBus'

class InputManager {
  constructor() {
    this.enabled = true
    this.keyState = {}
    this.justPressed = {}

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)

    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown(event) {
    if (!this.enabled) return
    if (!this.keyState[event.key]) {
      this.justPressed[event.key] = true
    }
    this.keyState[event.key] = true
  }

  handleKeyUp(event) {
    if (!this.enabled) return
    this.keyState[event.key] = false
    this.justPressed[event.key] = false
  }

  isDown(key) {
    return !!this.keyState[key]
  }

  isAnyDown(keys) {
    return keys.some((key) => this.isDown(key))
  }

  isPressed(keys) {
    for (const key of keys) {
      if (this.justPressed[key]) {
        this.justPressed[key] = false
        return true
      }
    }
    return false
  }

  // Menu keybinds
  isMenuUpPressed() {
    return this.isPressed(['w', 'W', 'ArrowUp'])
  }
  isMenuDownPressed() {
    return this.isPressed(['s', 'S', 'ArrowDown'])
  }
  isMenuLeftPressed() {
    return this.isPressed(['a', 'A', 'ArrowLeft'])
  }
  isMenuRightPressed() {
    return this.isPressed(['d', 'D', 'ArrowRight'])
  }
  isMenuSelectPressed() {
    return this.isPressed(['Enter'])
  }
  isMenuBackPressed() {
    return this.isPressed(['Escape', 'Back'])
  }

  // Game keybinds
  isPausePressed() {
    return this.isPressed(['Escape'])
  }
  isMoveLeftPressed() {
    return this.isAnyDown(['a', 'A', 'ArrowLeft'])
  }
  isMoveRightPressed() {
    return this.isAnyDown(['d', 'D', 'ArrowRight'])
  }
  isJumpPressed() {
    return this.isPressed([' ', 'Space'])
  }
  isSpinAttackPressed() {
    return this.isPressed(['e', 'E', 'Shift'])
  }

  disable() {
    this.enabled = false
  }

  enable() {
    this.enabled = true
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    this.keyState = {}
  }
}

export const inputManager = new InputManager()
