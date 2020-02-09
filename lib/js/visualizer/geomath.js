function elementWiseOp(operation='+', ...arrays) {
  const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0)
  const result = Array.from({ length: n })
  return result.map((_, elementidx) => {
    return arrays.map(array => array[elementidx] || 0).reduce((prod, x) => {
      switch (operation) {
        case '+':
          return prod + x
          break;

        case '-':
          return prod - x
          break;

        case '*':
          return prod * x
          break;

        case '/':
          return prod / x
          break;
      }
    }, (operation==='+'||operation==='-') ? 0 : 1)
  })
}

function summation(...arrays) {
  let modArray = elementWiseOp('*', ...arrays)
  return modArray.reduce((sum, a) => sum + a, 0)
}

function getRegression(ptarray, dispHeight, dispWidth) {
  let n = ptarray.length
  let xarr = ptarray.map(pt => pt.x)
  let yarr = ptarray.map(pt => pt.y)

  let sumxx = summation(xarr, xarr)
  let sumxy = summation(xarr, yarr)
  let sumx = summation(xarr)
  let sumy = summation(yarr)

	let slope = ((n * sumxy) - (sumx * sumy)) / ((n * sumxx) - (sumx * sumx));
	let intercept = (sumy - (slope * sumx)) / n;

	return [{'x1': 0, 'y1': intercept, 'x2': dispWidth, 'y2': slope * dispWidth + intercept}];
}
