export default class {
	constructor(game, char) {
		this.game = game
		this.char = char
	}

	move(dx, dy) {
		this.char.move(dx, dy)
		this.game.map.update()
	}
}