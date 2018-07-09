import config from '../config.js'
import Tile from './Tile.js'

export default class {
  constructor(game) {
    this.game = game
    this.tiles = []
    this.characters = []


    // fill in tiles top to bottom, left to right
    for (let x = 0; x < config.mapWidth; x++) {
      this.tiles.push([])
      for (let y = 0; y < config.mapHeight; y++) {
        this.tiles[x].push(new Tile('green'))
      }
    }

    this.createWall(20, 20, 22, 20)
    this.createWall(24, 20, 26, 20)
    this.createWall(20, 20, 20, 25)
    this.createWall(26, 20, 26, 25)
    this.createWall(26, 25, 20, 25)
  }

  

  update() {
    this.tiles.forEach( (column, x) => {
      column.forEach((tile, y) => {
        this.drawTile(tile, x, y)
      })
    })
    this.characters.forEach( char => this.drawChar(char) )
  }

  passableTile(x, y) {
    return this.tiles[x][y].passable
  }

  drawTile(tile, x, y) {
    this.game.ctx.fillStyle = tile.color
    this.game.ctx.fillRect(x * config.tileSize, y * config.tileSize, config.tileSize, config.tileSize)
  }

  /**
   * Create a straight, impassable wall.
   * 
   * @param {int} x initial X value
   * @param {int} y initial Y value
   * @param {int} finalX final X value
   * @param {int} finalY final Y value
   */
  createWall(x, y, finalX, finalY) {
    // if coordinates given don't represent a straight line, return
    if (x !== finalX && y !== finalY) {
      console.log('Error: wall must be straight')
      return
    }

    this.tiles[x][y] = new Tile('gray', false)

    while (x !== finalX || y !== finalY) {
      if (finalX < x) x -= 1
      else if (finalX > x) x += 1
      else if (finalY < y) y -= 1
      else if (finalY > y) y += 1
      this.tiles[x][y] = new Tile('gray', false)
    }
  }

  addChar(char) {
    this.characters.push(char)
    this.update()
  }

  drawChar(char) {
    this.game.ctx.font = config.font
    this.game.ctx.fillStyle = char.color
    this.game.ctx.fillText(char.icon, char.x * config.tileSize, char.y * config.tileSize + config.tileSize)
  }
}