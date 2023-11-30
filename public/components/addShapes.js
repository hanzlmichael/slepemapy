import { startDrawPoint } from '../draw/addPoint.js';
import { startDrawLine } from '../draw/addLine.js';
import { startDrawPolygon } from '../draw/addPolygon.js';
import { floodFill } from '../draw/magicWand.js';
import { canvas } from '../inits/canvas.js';
import { stopMouseWheelHandler } from './canvas.js';

const shapeInputs = document.getElementsByName("select-shape");
let zoomOutBtn = document.querySelector("#zoomOutBtn");
let deleteAllObjectsFromMapBtn = document.querySelector('#deleteAllObjectsFromMapBtn');
let activateMagicWandBtn = document.querySelector('#activateMagicWand');

export function initAddShapes() {
  shapeInputs.forEach((input) => {
    input.addEventListener("click", activateCanvasDrawing);
  });
  zoomOutBtn.onclick = resetZoom;
  deleteAllObjectsFromMapBtn.onclick = deleteAllObjectsFromMap
  activateMagicWandBtn.onclick = activeMagicWand;
}

export function removeSelection() {
  shapeInputs.forEach((input) => {
    input.checked = false;
  });
}

function activateCanvasDrawing(e) {
  let shape = e.target.id;
  if (shape == "point-shape") {
    startDrawPoint();
  }
  if (shape == "line-shape") {
    startDrawLine();
  }
  if (shape == "polygon-shape") {
    startDrawPolygon();
  }
}

export function resetZoom() {
  canvas.setViewportTransform([1,0,0,1,0,0])
}

function deleteAllObjectsFromMap() {
  let activeObjects = canvas.getActiveObjects(); 
  if (activeObjects.length) {
    activeObjects.forEach(function(object) {
      canvas.remove(object); 
    });
    canvas.discardActiveObject().renderAll(); 
  } else {
    canvas.forEachObject(function(object) {
      if (!(object.bg ===true)) {
        canvas.remove(object);
      }
    });
  }
}

function activeMagicWand() {
  stopMouseWheelHandler();
  resetZoom();
  setCursorToPointer(canvas)
  floodFill(true);
}

function setCursorToPointer(canvas) {
  canvas.getObjects().forEach(function(obj) {
    obj.set({moveCursor : 'url("/images/magicwandblack.png"), auto'});
    obj.set({hoverCursor : 'url("/images/magicwandblack.png"), auto'});
    obj.set({defaultCursor : 'url("/images/magicwandblack.png"), auto'});
  });
}

export function setsetCursorToPointerOff() {
  canvas.getObjects().forEach(function(obj) {
    obj.set({moveCursor : 'default'});
    obj.set({hoverCursor : 'default'});
    obj.set({defaultCursor : 'default'});
  });
  canvas.set({defaultCursor: 'default'});
  canvas.set({moveCursor: 'default'});
  canvas.set({hoverCursor: 'default'});
}

canvas.set({defaultCursor: 'url("./images/magicwandblack.png"), auto'});