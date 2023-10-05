selectMap.addEventListener('change', handleDisplayMap);

function handleDisplayMap(e) {
  debugger;
  if (selectMap.selectedIndex == 0) {
    canvas.clear()
    hideElement(canvasWrap);
    return;
  }
  showElement(canvasWrap);

  let indexCorrection = selectMap.selectedIndex - 1 // Kvůli první disabled options
  let mapElem = mapsWrap.children[indexCorrection] // Vyberu správnou mapu k vybranému option
  let mapImage = mapElem.querySelector('img')
  let imageData = mapImage.getAttribute('src')
  resizeMapToCanvas(imageData)
}

function resizeMapToCanvas(data) {
  canvas.clear()
  fabric.Image.fromURL(data, function(img) {
    img.scaleToWidth(750,true);
    img.selectable = false;
    img.hoverCursor = "default";
    canvas.setDimensions({width: 750, height: img.getScaledHeight()})
    canvas.add(img);
    canvas.sendToBack(img);
  })
}