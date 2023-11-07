console.log('here');
import { initDefinitions } from "./definitions.js";
import { initAddShapes } from "../components/addShapes.js";
import { initAnswer, onlyOne } from "../components/answer.js";
import { initCanvas } from "../components/canvas.js";
import { initMapLoader } from "../components/mapLoader.js";
import { initPageSwitcher } from "../components/pageSwitcher.js";
import { initPoints } from "../components/points.js";
import { initQuestion } from "../components/question.js";
import { initQuestionBar } from "../components/questionBar.js";
import { initSaveBtn } from "../components/saveTestBtn.js";
import { initGlobalPrototypeSettings } from '../draw/globalPrototypeSetting.js';
import { canvas,  } from '../inits/canvas.js';
import { activateZooming } from "../draw/globalPrototypeSetting.js";
import { resetZoom } from '../components/addShapes.js';
import { test } from '../components/questionBar.js';
import {testResizeMapToCanvas} from '../components/canvas.js';

initDefinitions();
initAddShapes();
initAnswer();
initCanvas();
initMapLoader();
initPageSwitcher();
initPoints();
initQuestion();
initQuestionBar();
initSaveBtn();

initGlobalPrototypeSettings();

window.onlyOne = onlyOne;
/* window.canvas = canvas;
window.test = test; */

let testBtn = document.querySelector('#testing');
testBtn.addEventListener('click', testCanvas)

function testCanvas() {
  console.log('yeee')
  let objs = canvas.getObjects();
  console.log('objs ', objs);
  objs[1].set({ fill: 'rgb(0, 255, 0)' });
        // Aktualizujeme plátno
        canvas.renderAll();

 /*  debugger;
  console.log(canvas.getObjects());
  console.log(canvas.getObjects().length);
  stopMouseWheelHandler();
  findFirstImageOnCanvas(canvas.getObjects()); */
}

function findFirstImageOnCanvas(objects) {
 /*  let firstImage = null;

  canvas.forEachObject(function (object) {
    if (object instanceof fabric.Image && object.bg === true) {
      firstImage = object;
      canvas.renderAll(); 
    }
  }); */

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].bg === true) {
      objects[i].selectable = false;
      objects[i].hoverCursor = "default";
      canvas.sendToBack(objects[i]);
      canvas.requestRenderAll;
    }

      if (objects[i].selectable === false && objects[i].bg !== true) {
        canvas.remove(objects[i]);
      }
    }
  
  canvas.renderAll();  
  activateZooming();
}


function stopMouseWheelHandler() {
  canvas.off('mouse:wheel', resetZoom);
}

let testing2 = document.querySelector('#testing2');
testing2.onclick = getobjs;

function getobjs() {
  console.log(canvas.getObjects());
  console.log(canvas.getObjects().length);
}

let loadBtn = document.querySelector('#loadBtn')
loadBtn.onclick = testResizeMapToCanvas;

