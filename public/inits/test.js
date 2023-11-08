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
