import GameMap from './map/GameMap.js'
import MapCharacter from './map/MapCharacter.js'
import config from './config.js'
import Player from './Player.js'
import Images from './Images.js'

class Game {
  constructor() {
    this.canvas = this.initCanvas()
    this.ctx = this.canvas.getContext('2d')
    this.images = new Images()
    this.gameMap = new GameMap(this)
    this.setListeners()
    this.player = new Player(new MapCharacter(this.images.getImage('player'), 24, 17))
    this.gameMap.addChar(this.player.char)
  }

  /**
   * Creates game canvas based on configured width and height and returns it.
   */
  initCanvas() {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', config.mapWidth * config.tileSize)
    canvas.setAttribute('height', config.mapHeight * config.tileSize)
    document.body.appendChild(canvas)
    return canvas
  }

  /**
   * Sets keyboard listeners.
   */
  setListeners() {
    document.addEventListener('keydown', (e) => {
      const code = e.keyCode
      if (code === 100 || code === 37) this.movePlayer(-1, 0) // left
      if (code === 102 || code === 39) this.movePlayer(1, 0) // right
      if (code === 104 || code === 38) this.movePlayer(0, -1) // up
      if (code === 98 || code === 40)  this.movePlayer(0, 1) // down
      if (code === 103)                this.movePlayer(-1, -1) // up-left
      if (code === 105)                this.movePlayer(1, -1) // up-right
      if (code === 97)                 this.movePlayer(-1, 1) // down-left
      if (code === 99)                 this.movePlayer(1, 1) // down-right
    })

    document.addEventListener('mousedown', (e) => {
      const pos = this.getMousePos(e)
      const xDiff = this.player.char.x * config.tileSize - pos.x
      const yDiff = this.player.char.y * config.tileSize - pos.y

      if(Math.abs(xDiff) + Math.abs(yDiff) > 0) {
        if(Math.abs(xDiff) > Math.abs(yDiff)) {
          if(xDiff > 0) this.movePlayer(-1, 0)
          else this.movePlayer(1, 0)
        } 
        else {
          if(yDiff > 0) this.movePlayer(0, -1)
          else this.movePlayer(0, 1)
        }
      }
      console.log(pos.x + ", " + pos.y)

      console.log(this.player.char.x * config.tileSize)
    })
  }

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  /**
   * After checking that the requested tile is passable, calls the player move method.
   * 
   * @param {int} dx - Change in x.
   * @param {int} dy - Change in y.
   */
  movePlayer(dx, dy) {
    if (!this.gameMap.passableTile(this.player.char.x + dx, this.player.char.y + dy)) return
    this.player.move(dx, dy)
    this.gameMap.update()
  }
}

const game = new Game()