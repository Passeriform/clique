const actions = [
  {'action': 'grid', 'callback':'toggleGrid'},
  {'action': 'pca', 'callback':'togglePCA'},
  {'action': 'mca', 'callback':'toggleMCA'},
  {'action': 'regression', 'callback':'toggleRegression'}
]

function listActions() {
  let actionList = []
  for (action of actions) {
    actionList.push(action.action)
  }

  return actionList
}

function performAction(CliqueVisObj, option, toggleState) {
  if (toggleState === false)
    return []

  for (action of actions) {
    if (action.action === option) {                 // Check if action defined
      let func = window[action.callback];

      if (typeof func === 'function')
        return func(CliqueVisObj)
    }
  }
}

function recalculateActions(CliqueVisObj, prevActions) {
  let newActions = {}

  for (option in prevActions) {
    let prevLineArray = prevActions[option]

    for (action of actions) {
      if (action.action === option) {
        if (Array.isArray(prevLineArray) && prevLineArray.length) {
          let func = window[action.callback];

          if (typeof func === 'function')
            newActions[action.action] = func(CliqueVisObj)
        }
      }
    }
  }

  return newActions
}

function toggleGrid(CliqueVisObj, divisions=20) {
  let h = CliqueVisObj.canvas.height
  let w = CliqueVisObj.canvas.width

  cell = min(h, w)

  let gridLines = []

  for (xpos = 0; xpos <= w; xpos += (cell/divisions)) {
    gridLines.push({'x1': xpos, 'y1': 0, 'x2': xpos, 'y2': h})
  }

  for (ypos = 0; ypos <= h; ypos += (cell/divisions)) {
    gridLines.push({'x1': 0, 'y1': ypos, 'x2': w, 'y2': ypos})
  }

  return gridLines
}

function toggleRegression(CliqueVisObj) {
  let points = CliqueVisObj.getPoints()

  let h = CliqueVisObj.canvas.height
  let w = CliqueVisObj.canvas.width

  return getRegression(points, h, w)
}
