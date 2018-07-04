import config from '../config.js'

export default class {
  constructor(icon, color, x, y) {
    this.icon = icon
    this.color = color
    this.x = x * config.tileSize
    this.y = y * config.tileSize + config.tileSize
  }

  move(dx, dy) {
    this.x += dx * config.tileSize
    this.y += dy * config.tileSize
  }
}