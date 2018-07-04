import config from '../config.js'
import Tile from './tile.js';

export default class {
  constructor(game) {
    this.game = game
    this.tiles = []

    // fill in tiles top to bottom, left to right
    for (let y = 0; y < config.mapHeight; y++) {
      this.tiles.push([])
      for (let x = 0; x < config.mapWidth; x++) {
        this.tiles[y][x] = new Tile(x, y, '#0B6623')
        this.drawTile(this.tiles[y][x])
      }
    }
  }

  drawTile(tile) {
    this.game.ctx.fillStyle = tile.color
    this.game.ctx.fillRect(tile.x, tile.y, config.tileSize, config.tileSize)
  }
}