import config from '../config.js'
import Tile from './Tile.js'
import Images from '../Images.js'

/**
 * Represents the game map.
 */
export default class GameMap {
  constructor(game) {
    this.game = game
    this.images = new Images()
    this.tiles = []
    this.characters = []
    this.setupMap()
  }

  /**
   * Draws all tiles and characters.
   */
  update() {
    this.tiles.forEach( (column, x) => {
      column.forEach((tile, y) => {
        this.drawTile(tile, x, y)
      })
    })
    this.characters.forEach( char => this.drawChar(char) )
  }

  /**
   * Creates tilemap and store it in tiles field.
   */
  setupMap() {
    // fill in tiles top to bottom, left to right
    for (let x = 0; x < config.mapWidth; x++) {
      this.tiles.push([])
      for (let y = 0; y < config.mapHeight; y++) {
        this.tiles[x].push(new Tile(this.images.getImage('grass')))
      }
    }

    this.createRoom(20, 13, -10, 10)
    this.tiles[20][17] = new Tile(this.images.getImage('grass'))

    this.createWall(0, 0, 10, 0)
  }

  /**
   * Determines if a given tile can be walked on.
   * 
   * @param {int} x - X coordinate.
   * @param {int} y - Y coordinate.
   */
  passableTile(x, y) {
    if (!this.tiles[x]) return
    else if(!this.tiles[x][y]) return
    return this.tiles[x][y].passable
  }

  /**
   * Creates a vertical or horizontal impassable wall. Either width or height must be 0.
   * 
   * @param {int} x - Initial X value.
   * @param {int} y - Initial Y value.
   */
  createWall(x, y, width, height) {
    // if width and height are both defined, return
    if (width !== 0 && height !== 0) {
      console.log('Error: wall must be straight')
      return
    }

    const direction = width > 0 || height > 0 ?  1 : -1
    this.tiles[x][y] = new Tile(this.images.getImage('wall'), false)

    for (let i = 1; i < Math.abs(width) || i < Math.abs(height); i++) {
      width !== 0 ? x += direction : y += direction
      this.tiles[x][y] = new Tile(this.images.getImage('wall'), false)
    }
  }

  /**
   * Creates a rectangular room.
   * 
   * @param {int} x      - X coordinate.
   * @param {int} y      - Y coordinate.
   * @param {int} width  - Room width.
   * @param {int} height - Room height.
   */
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

  /**
   * Adds a map character to characters field.
   * 
   * @param {MapCharacter} char - Character to add.
   */
  addChar(char) {
    this.characters.push(char)
    this.update()
  }

  /**
   * Draws a tile on the map.
   * 
   * @param {Tile} tile - Tile object to draw.
   * @param {int}    x  - X coordinate. 
   * @param {int}    y  - Y coordinate.
   */
  drawTile(tile, x, y) {
    this.game.ctx.drawImage(tile.img, x * config.tileSize, y * config.tileSize)
  }

  /**
   * Draws a map character on map.
   * 
   * @param {MapCharacter} char - Character to draw.
   */
  drawChar(char) {
    this.game.ctx.drawImage(char.img, char.x * config.tileSize, char.y * config.tileSize, config.tileSize, config.tileSize)
  }
}