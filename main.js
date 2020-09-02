var cliqueVis = new CliqueVisualizer(new visualConfig(5), [])

function setup()
{
	cliqueVis.init('cliqueholder')
}

function draw()
{
	cliqueVis.setBackground()
	cliqueVis.drawPoints()
	cliqueVis.drawAddons()
	cliqueVis.showHUD()
}

function mousePressed()
{
	if (event.target.classList.contains('p5Canvas'))
		cliqueVis.modPoints(mouseButton, mouseX, mouseY)
}

function windowResized(){
	cliqueVis.recalculateWindow(windowWidth, windowHeight)
}

function dispatchAction(event) {
	cliqueVis.handleDispatch(event)
}
