import config from '../config.js'

export default class {
  constructor(x, y, color, passable = true) {
    this.x = x * config.tileSize
    this.y = y * config.tileSize
    this.color = color
    this.passable = passable
  }
}