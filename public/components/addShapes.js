import { startDrawPoint } from '../draw/addPoint.js';
import { startDrawLine } from '../draw/addLine.js';
import { startDrawPolygon } from '../draw/addPolygon.js';

const removeSelectionBtn = document.querySelector(
  "#remove-selection-from-input"
);
const shapeInputs = document.getElementsByName("select-shape");
shapeInputs.forEach((input) => {
  input.addEventListener("click", showRemoveSelectionBtn);
});
removeSelectionBtn.onclick = removeSelection;

function removeSelection() {
  shapeInputs.forEach((input) => {
    input.checked = false;
  });
}

function showRemoveSelectionBtn(e) {
  removeSelectionBtn.classList.remove("hidden");
  console.log(e.target.id);
  /* zacit kreslit na canvasu */
  activateCanvasDrawing(e.target.id);
}

function activateCanvasDrawing(shape) {
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

function hideRemoveSelectionBtn() {
  removeSelectionBtn.classList.add("hidden");
}

let zoomOutBtn = document.querySelector("#zoomOutBtn");
zoomOutBtn.onclick = resetZoom;

let deleteAllObjectsFromMapBtn = document.querySelector('#deleteAllObjectsFromMapBtn');
deleteAllObjectsFromMapBtn.onclick = deleteAllObjectsFromMap

function testingNewFeatures() {
  let objs = canvas.getObjects();
  console.log("objs: ", objs);
}

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