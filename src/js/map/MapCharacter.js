export default class {
  constructor(img, x, y) {
    this.img = img
    this.x = x
    this.y = y
  }

  /**
   * Change x and y fields by a given amount to represent character movement.
   * 
   * @param {int} dx - Change in x.
   * @param {int} dy - Change in y.
   */
  move(dx, dy) {
    this.x += dx
    this.y += dy
  }
}