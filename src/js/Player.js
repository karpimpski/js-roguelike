export default class {
	constructor(char) {
		this.char = char
	}

	/**
	 * Abstracted method; calls move method on player's character.
	 * 
	 * @param {int} dx - Change in x.
	 * @param {int} dy - Change in y.
	 */
	move(dx, dy) {
		this.char.move(dx, dy)
	}
}