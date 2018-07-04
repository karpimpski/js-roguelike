import Map from './map/map.js'
import MapCharacter from './map/MapCharacter.js'
import config from './config.js'
import Player from './Player.js'

class Game {
  constructor() {
    this.canvas = this.initCanvas(config.mapWidth * config.tileSize, config.mapHeight * config.tileSize)
    this.ctx = this.canvas.getContext('2d')
    this.map = new Map(this)
    this.setListeners()
    this.player = new Player(this, new MapCharacter('@', 'white', 24, 17))
    this.map.addChar(this.player.char)
  }

  initCanvas(width, height) {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    document.body.appendChild(canvas)
    return canvas
  }

  setListeners() {
    document.addEventListener('keydown', (e) => {
      const code = e.keyCode
      if (code === 100 || code === 37) this.player.move(-1, 0) // left
      if (code === 102 || code === 39) this.player.move(1, 0) // right
      if (code === 104 || code === 38) this.player.move(0, -1) // up
      if (code === 98 || code === 40) this.player.move(0, 1) // down
      if (code === 103) this.player.move(-1, -1) // up-left
      if (code === 105) this.player.move(1, -1) // up-right
      if (code === 97) this.player.move(-1, 1) // down-left
      if (code === 99) this.player.move(1, 1) // down-right
    })
  }
}

const game = new Game()