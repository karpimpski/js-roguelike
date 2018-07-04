import Map from './map/map.js'
import config from './config.js'

class Game {
  constructor() {
    this.canvas = this.initCanvas(config.mapWidth * config.tileSize, config.mapHeight * config.tileSize)
    this.ctx = this.canvas.getContext('2d')
    this.map = new Map(this)
  }

  initCanvas(width, height) {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    document.body.appendChild(canvas)
    return canvas
  }
}

const game = new Game()