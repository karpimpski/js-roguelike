export default class {
  constructor(x, y, color, passable = true) {
    this.x = x * 10
    this.y = y * 10
    this.color = color
    this.passable = passable
  }
}