import GameMap from './map/GameMap.js'
import MapCharacter from './map/MapCharacter.js'
import config from './config.js'
import Player from './Player.js'

class Game {
  constructor() {
    this.canvas = this.initCanvas(config.mapWidth * config.tileSize, config.mapHeight * config.tileSize)
    this.ctx = this.canvas.getContext('2d')
    this.gameMap = new GameMap(this)
    this.setListeners()
    this.player = new Player(new MapCharacter('@', 'white', 24, 17))
    this.gameMap.addChar(this.player.char)
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
      if (code === 100 || code === 37) this.movePlayer(-1, 0) // left
      if (code === 102 || code === 39) this.movePlayer(1, 0) // right
      if (code === 104 || code === 38) this.movePlayer(0, -1) // up
      if (code === 98 || code === 40) this.movePlayer(0, 1) // down
      if (code === 103) this.movePlayer(-1, -1) // up-left
      if (code === 105) this.movePlayer(1, -1) // up-right
      if (code === 97) this.movePlayer(-1, 1) // down-left
      if (code === 99) this.movePlayer(1, 1) // down-right

      // this.movePlayer(1, 1)
      this.gameMap.update()
    })

    
  }

  movePlayer(dx, dy) {
    this.player.move(dx, dy)
    this.gameMap.update()
    // console.log(this.gameMap.findTile(this.player.char.x + dx * config.tileSize, this.player.char.y + dy * config.tileSize))
  }
}

const game = new Game()