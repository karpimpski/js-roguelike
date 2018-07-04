import config from '../config.js'
import Tile from './Tile.js'

export default class {
  constructor(game) {
    this.game = game
    this.tiles = []
    this.characters = []


    // fill in tiles top to bottom, left to right
    for (let y = 0; y < config.mapHeight; y++) {
      for (let x = 0; x < config.mapWidth; x++) {
        this.tiles.push(new Tile(x, y, '#0B6623'))
      }
    }
  }

  update() {
    this.tiles.forEach( tile => this.drawTile(tile) )
    this.characters.forEach( char => this.drawChar(char) )
  }

  drawTile(tile) {
    this.game.ctx.fillStyle = tile.color
    this.game.ctx.fillRect(tile.x, tile.y, config.tileSize, config.tileSize)
  }

  addChar(char) {
    this.characters.push(char)
    this.update()
  }

  drawChar(char) {
    this.game.ctx.font = config.font
    this.game.ctx.fillStyle = char.color
    this.game.ctx.fillText(char.icon, char.x, char.y)
  }
}