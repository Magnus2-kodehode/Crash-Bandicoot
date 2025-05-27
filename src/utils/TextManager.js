export class TextManager {
  constructor(scene) {
    this.scene = scene
    this.textObjects = []
  }

  createText(x, y, text, style = {}) {
    const defaultStyle = {
      fontFamily: 'Zoinks',
      fontSize: '32px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
    }

    const mergedStyle = { ...defaultStyle, ...style }

    const textObj = this.scene.add.text(x, y, text, mergedStyle)
    textObj.setOrigin(0.5)
    textObj.setScrollFactor(0)

    this.textObjects.push(textObj)

    return textObj
  }

  destroyAll() {
    this.textObjects.forEach((text) => text.destroy())
    this.textObjects = []
  }
}
