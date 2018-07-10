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

    this.createRoom(20, 13, -10, 10)
    this.tiles[20][17] = new Tile('green')

    this.createWall(0, 0, 10, 0)
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
    if (!this.tiles[x]) return
    else if(!this.tiles[x][y]) return
    return this.tiles[x][y].passable
  }

  drawTile(tile, x, y) {
    this.game.ctx.fillStyle = tile.color
    this.game.ctx.fillRect(x * config.tileSize, y * config.tileSize, config.tileSize, config.tileSize)
  }

  /**
   * Create a straight, impassable wall. Either width or height must be 0.
   * 
   * @param {int} x initial X value
   * @param {int} y initial Y value
   */
  createWall(x, y, width, height) {
    // if width and height are both defined, return
    if (width !== 0 && height !== 0) {
      console.log('Error: wall must be straight')
      return
    }

    const direction = width > 0 || height > 0 ?  1 : -1
    this.tiles[x][y] = new Tile('gray', false)

    for (let i = 1; i < Math.abs(width) || i < Math.abs(height); i++) {
      width !== 0 ? x += direction : y += direction
      this.tiles[x][y] = new Tile('gray', false)
    }
  }

  createRoom(x, y, width, height) {
    // if is defined as less than 1x1, return
    if (Math.abs(width) === 0 || Math.abs(height) === 0) {
      console.log("Error: Room must be at least 1x1")
      return
    }

    const heightOffset = height > 0 ? -1 : 1
    const widthOffset = width > 0 ? -1 : 1

    this.createWall(x, y, width, 0)
    this.createWall(x, y, 0, height)
    this.createWall(x, y + height + heightOffset, width, 0)
    this.createWall(x + width + widthOffset, y, 0, height)
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