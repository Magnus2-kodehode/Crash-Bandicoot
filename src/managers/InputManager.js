export class InputManager {
  constructor(scene) {
    this.scene = scene

    this.keys = {
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      leftArrow: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      rightArrow: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      jump: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      jumpArrow: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      jumpW: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      spin: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      // Add pause keys
      pause: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
      pauseP: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
      // Add menu navigation keys
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      select: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    }
  }

  isLeftPressed() {
    return this.keys.left.isDown || this.keys.leftArrow.isDown
  }

  isRightPressed() {
    return this.keys.right.isDown || this.keys.rightArrow.isDown
  }

  isJumpJustPressed() {
    return (
      Phaser.Input.Keyboard.JustDown(this.keys.jump) ||
      Phaser.Input.Keyboard.JustDown(this.keys.jumpArrow) ||
      Phaser.Input.Keyboard.JustDown(this.keys.jumpW)
    )
  }

  isSpinJustPressed() {
    return Phaser.Input.Keyboard.JustDown(this.keys.spin)
  }

  isUpJustPressed() {
    return Phaser.Input.Keyboard.JustDown(this.keys.up)
  }

  isDownJustPressed() {
    return Phaser.Input.Keyboard.JustDown(this.keys.down)
  }

  isSelectJustPressed() {
    return Phaser.Input.Keyboard.JustDown(this.keys.select)
  }
}
