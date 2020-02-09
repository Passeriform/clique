class CliqueVisualizer {
	constructor(vconf, initPoints=[], initAddons={}) {
		this.meta = vconf
		this.canvas = null

		this.points = [...initPoints]
		this.addons = {...initAddons}

		return this
	}

	init(parent=null) {
		this.canvas = createCanvas(this.meta.width, this.meta.height)

		if (parent != null)
			this.canvas.parent(parent)

		return this.canvas
	}

	recalculateWindow() {
		this.meta = new visualConfig(5)
		resizeCanvas(windowWidth, windowHeight)
		this.addons = recalculateActions(this, this.addons)
	}

	setBackground(bgColor=this.meta.bgColor) {
		background(bgColor)
	}

	drawPoints() {
		for (let ppoint of this.points) {
			ellipse(ppoint.x, ppoint.y, this.meta.dotSize, this.meta.dotSize)
		}
	}

	drawAddons() {
		for (let addon in this.addons) {
			for(let aline of this.addons[addon]) {
				stroke(200)
				strokeWeight(1)
				line(aline.x1, aline.y1, aline.x2, aline.y2)
			}
		}
	}

	getPoints() {
		return this.points
	}

	modPoints(action, actx, acty) {
		if (actx <= this.meta.width && acty <= this.meta.height) {
			if (!({'x': actx, 'y': acty} in this.meta.clickBlacklist)) {
				if (action == LEFT)
					this.points.push({'x': actx, 'y': acty});
				else if (action == RIGHT)
					this.points.pop();
			}
		}

		this.addons = recalculateActions(this, this.addons)
	}

	modAddons(action, ptarray) {
		this.addons[action] = ptarray
		print(this.addons)
	}

	handleDispatch(event) {
		let action = event.target.value
		let toggle = event.target.checked

		let retLines = performAction(this, action, toggle)

		this.modAddons(action, retLines)
	}

	showHUD() {
		let n = this.points.length

		stroke(255);
		strokeWeight(2);
		fill(255);
		noStroke();
		textSize(16);
		textFont('Segoe UI');
		text('X: ' + mouseX, 5, 21);
		text('Y: ' + mouseY, 5, 42);
		text('Points: ' + n, 5, 68);
	}
}
