import { startDrawPoint } from '../draw/addPoint.js';
import { startDrawLine } from '../draw/addLine.js';
import { startDrawPolygon } from '../draw/addPolygon.js';

const shapeInputs = document.getElementsByName("select-shape");
shapeInputs.forEach((input) => {
  input.addEventListener("click", activateCanvasDrawing);
});

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

let zoomOutBtn = document.querySelector("#zoomOutBtn");
zoomOutBtn.onclick = resetZoom;

let deleteAllObjectsFromMapBtn = document.querySelector('#deleteAllObjectsFromMapBtn');
deleteAllObjectsFromMapBtn.onclick = deleteAllObjectsFromMap

function resetZoom() {
  canvas.setViewportTransform([1,0,0,1,0,0])
}

function deleteAllObjectsFromMap() {
  let activeObjects = canvas.getActiveObjects(); // get array of selected objects
  if (activeObjects.length) {
    activeObjects.forEach(function(object) {
      canvas.remove(object); // remove each selected object from the canvas
    });
    canvas.discardActiveObject().renderAll(); // clear selection and redraw canvas
  } else {
    canvas.forEachObject(function(object) {
      if (!(object instanceof fabric.Image)) {
        canvas.remove(object);
      }
    });
  }
}
