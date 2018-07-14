export default class {
	constructor() {
		this.images = {}
		this.addImage('grass', '../img/grass.png')
		this.addImage('wall', '../img/wall.png')
		this.addImage('player', '../img/player.png')
	}

	addImage(key, path) {
		let image = new Image()
		image.src = path
		this.images[key] = image
	}

	getImage(key) {
		return this.images[key]
	}
}