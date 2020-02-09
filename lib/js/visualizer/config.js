class visualConfig {
	constructor(dotSize, width=window.innerWidth, height=window.innerHeight, bgColor='#2f4f4e') {
		this.dotSize = dotSize
		this.height = height
		this.width = width
		this.bgColor = bgColor
		this.clickBlacklist = []

		return this
	}
}
