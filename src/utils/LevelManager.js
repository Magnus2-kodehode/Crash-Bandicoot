export class LevelManager {
  constructor({ platforms, crates, traps, score }) {
    this.platforms = platforms
    this.crates = crates
    this.traps = traps
    this.score = score
    this.tntTimers = []
  }

  get platformGrassGroup() {
    return this.platforms?.platformGrassGroup
  }

  get platformWoodGroup() {
    return this.platforms?.platformWoodGroup
  }

  get platformStoneGroup() {
    return this.platforms?.platformStoneGroup
  }

  get wallStoneGroup() {
    return this.platforms?.wallStoneGroup
  }

  get boxGroup() {
    return this.crates?.boxGroup
  }

  get boxWumpaFruitGroup() {
    return this.crates?.fruitBoxGroup
  }

  get tntGroup() {
    return this.crates?.tntGroup
  }

  get spikesBottomGroup() {
    return this.traps?.spikesBottom
  }

  get spikesTopGroup() {
    return this.traps?.spikesTop
  }

  get spikesLeftGroup() {
    return this.traps?.spikesLeft
  }

  get spikesRightGroup() {
    return this.traps?.spikesRight
  }

  get waterGroup() {
    return this.traps?.waterGroup
  }

  get fruitGroup() {
    return this.score?.fruitGroup
  }

  tntCountdown(tnt) {
    return this.crates.tntCountdown(tnt)
  }

  explodeTNT(tnt) {
    return this.crates?.explodeTNT?.(tnt)
  }

  clearTNTTimers() {
    return this.crates?.clearTNTTimers?.()
  }

  resetLevel() {}
}
