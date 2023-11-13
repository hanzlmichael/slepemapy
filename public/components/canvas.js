import { canvas } from '../inits/canvas.js';
import { selectMap, hideElement, showElement, mapsWrap } from '../inits/definitions.js';
import { canvasWrap, test } from '../components/questionBar.js';
import { setShapes } from '../components/question.js';

export function initCanvas() {
  selectMap.addEventListener('change', handleDisplayMap);
}

function handleDisplayMap() {
  if (selectMap.selectedIndex == 0) {
    canvas.clear()
    hideElement(canvasWrap);
    return;
  }
  showElement(canvasWrap);

  let mapId = selectMap.value;
  let mapSrc = findMapSrcByMapId(mapId);
  resizeMapToCanvas(mapSrc);
}

function findMapSrcByMapId(mapId) {
  let len = test.maps.length;
  for (let i = 0; i < len; i++) {
    if (mapId === test.maps[i].mapId) {
      return test.maps[i].data;
    }
  }
  return null;
}

function resizeMapToCanvas(data) {
  canvas.clear()
  fabric.Image.fromURL(data, function(img) {
    img.scaleToWidth(750,true);
    img.selectable = false;
    img.myTest = "test";
    img.defaultCursor = "default";
    img.moveCursor = "default";
    canvas.defaultCursor = "default";
    canvas.moveCursor = "default";
    canvas.setDimensions({width: 750, height: img.getScaledHeight()})
    canvas.add(img);
    canvas.sendToBack(img);
    img.bg = true;
    canvas.renderAll();
    console.log('renderALL---test1');
    testResizeMapToCanvas();
  })
  setShapes();
  //testResizeMapToCanvas();
}


export function testResizeMapToCanvas() {
  let mapId = selectMap.value;
  let mapSrc = findMapSrcByMapId(mapId);
  fabric.Image.fromURL(mapSrc, function(img) {
    img.scaleToWidth(750,true);
    img.selectable = false;
    img.defaultCursor = "default";
    img.moveCursor = "default";
    canvas.defaultCursor = "default";
    canvas.moveCursor = "default";
    img.myTest = "test";
    canvas.setDimensions({width: 750, height: img.getScaledHeight()})
    canvas.add(img);
    canvas.sendToBack(img);
    img.bg = true;
    canvas.renderAll();
  })
}

export function stopMouseWheelHandler() {
  canvas.off('mouse:wheel');
}