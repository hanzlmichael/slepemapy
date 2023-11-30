import { canvas } from '../inits/canvas.js';
import { selectMap, hideElement, showElement, mapsWrap } from '../inits/definitions.js';
import { canvasWrap, test } from '../components/questionBar.js';
import { setShapes } from '../components/question.js';

const zoomInBtn = document.querySelector('#zoom-in-btn')
const zoomOutBtn = document.querySelector('#zoom-out-btn')
const moveNorthBtn = document.querySelector('#move-north');
const moveSouthBtn = document.querySelector('#move-south');
const moveWestBtn = document.querySelector('#move-west');
const moveEastBtn = document.querySelector('#move-east');
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);
moveNorthBtn.addEventListener('click', moveNorthSouth);
moveSouthBtn.addEventListener('click', moveNorthSouth);
moveWestBtn.addEventListener('click', moveWestEast);
moveEastBtn.addEventListener('click', moveWestEast);

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
    fixResizeMapToCanvas();
  })
  setShapes();
}


export function fixResizeMapToCanvas() {
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

function zoomIn() {
  let zoom = canvas.getZoom();
  zoom *= 1.1; // Zvětšení o 10%
  if (zoom > 20) zoom = 20; // Omezení maximálního přiblížení
  canvas.zoomToPoint({ x: canvas.getWidth() / 2, y: canvas.getHeight() / 2 }, zoom);
}

function zoomOut() {
  let zoom = canvas.getZoom();
  zoom *= 0.9; 
  if (zoom < 0.5) zoom = 0.5; // Omezení maximálního přiblížení
  canvas.zoomToPoint({ x: canvas.getWidth() / 2, y: canvas.getHeight() / 2 }, zoom);
}


function moveWestEast(e) {
  debugger;
  let direction = e.target.id;
  // Získání aktuální transformační matice
    const currentTransform = canvas.viewportTransform.slice();
    console.log(currentTransform);
    console.log('W: ', canvas.width)
    // Určení posunu v ose X
    const moveX = direction === 'move-east' ? -20 : 20;
    //const moveY = direction === 'Nahoru' ? -10 : 10;

    // Přidání posunu k aktuální transformační matici
    currentTransform[4] += moveX;
    //currentTransform[5] += moveY;

        // Omezení pohybu na šířku canvasu
      if (currentTransform[4] > 0) {
          currentTransform[4] = 0;
      } else if (currentTransform[4] < canvas.width * (1 - canvas.getZoom())) {
          currentTransform[4] = canvas.width * (1 - canvas.getZoom());
      }

    // Nastavení nové transformační matice
    canvas.setViewportTransform(currentTransform);

    // Aktualizace pohledu
    canvas.requestRenderAll();
}


function moveNorthSouth(e) {
  let direction = e.target.id;
  const currentTransform = canvas.viewportTransform.slice();
  console.log(currentTransform)
  const moveY = direction === 'move-south' ? -20 : 20;
  currentTransform[5] += moveY;
  if (currentTransform[5] > 0) {
          currentTransform[5] = 0;
      } else if (currentTransform[5] < canvas.height * (1 - canvas.getZoom())) {
          currentTransform[5] = canvas.height * (1 - canvas.getZoom());
      }

    // Nastavení nové transformační matice
    canvas.setViewportTransform(currentTransform);

    // Aktualizace pohledu
    canvas.requestRenderAll();
}