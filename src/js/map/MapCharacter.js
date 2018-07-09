import config from '../config.js'

export default class {
  constructor(icon, color, x, y) {
    this.icon = icon
    this.color = color
    this.x = x
    this.y = y
  }

  move(dx, dy) {
    this.x += dx
    this.y += dy
  }
}