import { showLoader, hideLoader, loadTestOverlay } from "./loader.js";
import { test, questions, maps } from '../components/questionBar.js';
import { resizeAllMaps } from '../components/canvas.js';

let saveTestBtn = document.querySelector('#saveTest');
let marksBoundariesInputs = document.querySelectorAll('.table-input-number');
let testTitle = document.querySelector('#test-name-wrap input');
let generateMarksRangesBtn = document.querySelector('#generate-marks-ranges');
generateMarksRangesBtn.addEventListener('click', fillMarksBoundaries);

export function initSaveBtn() {
  saveTestBtn.addEventListener('click', handleTestInDb)
}

function getMarksBoundaries() {
  debugger;
  let testingInputs = document.querySelectorAll('.table-input-number');

  marksBoundariesInputs = Array.from(testingInputs);

  marksBoundariesInputs = marksBoundariesInputs.slice(marksBoundariesInputs.length/2)
  let marksBoundaries = [];
  marksBoundariesInputs.forEach( mark => marksBoundaries.push(mark.value));
  return marksBoundaries;
}

function handleTestInDb() {
  debugger;
  if (!validateTitle()) {
    return;
  }
  if (!marksBoundariesError()) {
    return;
  }
  let url = window.location.href;
  const lastString = url.split("/").pop();
  if (lastString == 'new') {
    saveTestToDb();
  } else {
    let urlArray = url.split('/');
    const testId = urlArray[urlArray.length - 2];
    updateTestInDb(testId);
  }
}

function validateTitle() {
  if (testTitle.value === '') {
    document.querySelector('#missing-title').style.display = 'block';
    return false;
  } else {
    document.querySelector('#missing-title').style.display = 'none';
    return true;
  }
}

function fillMarksBoundaries() {
  let totalPoints = Number(document.querySelector('#total-points-value').textContent);
  if (totalPoints < 4) {
    alert("Celkový počet bodů musí být alespoň 4");
    return;
  }
  let ranges = generateRangesForBoundaries(totalPoints);
  let inputs = document.querySelectorAll('.table-input-number-to-fill');
  
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = ranges[i];
  }
}

function generateRangesForBoundaries(points) {
  let ranges = [0.9,0.75,0.6,0.45]  
  let pointsRanges = [];
  let position = 0;
  let pointsRangesFor4 = [4,4,3,3,2,2,1,1,0,0];
  let pointsRangesFor5 = [5,5,4,4,3,3,2,2,0,1];
  
  if (points === 4) {
    return pointsRangesFor4;
  }
  
  if (points === 5) {
    return pointsRangesFor5;
  }
  
  for (let i = 0; i < 5; i++) {
    if (i === 4) {
      pointsRanges.push(0);
      pointsRanges.push(pointsRanges[position] - 1);
      break;
    }
    pointsRanges.push(Math.ceil(points * ranges[i]));
    if (i === 0) {
      pointsRanges.push(points);
      continue;
    }
    pointsRanges.push(pointsRanges[position] - 1);
    position += 2;    
  }
  
  return pointsRanges;
}


function validateMarksBoundaries() {
  let totalPoints = Number(document.querySelector('#total-points-value').textContent);
  let boundaries = getMarksBoundaries();
  boundaries = boundaries.map(el => Number(el));

  if (boundaries[1] !== totalPoints) return false;

  if (boundaries[0] > boundaries[1]) return false;

  if (boundaries[3] >= boundaries[0]) return false;
  if (boundaries[2] > boundaries[3]) return false;

  if (boundaries[5] >= boundaries[2]) return false;
  if (boundaries[4] > boundaries[5]) return false;

  if (boundaries[7] >= boundaries[4]) return false;
  if (boundaries[6] > boundaries[7]) return false;

  if (boundaries[9] >= boundaries[6]) return false;
  if (boundaries[8] !== 0) return false;

  if (boundaries[3] + 1 !== boundaries[0]) return false;
  if (boundaries[5] + 1 !== boundaries[2]) return false;
  if (boundaries[7] + 1 !== boundaries[4]) return false;
  if (boundaries[9] + 1 !== boundaries[6]) return false;

  return true;
}

function marksBoundariesError() {
  if (!validateMarksBoundaries()) {
    document.querySelector('#bad-boundaries').style.display = 'block';
    return false;
  } else {
    document.querySelector('#bad-boundaries').style.display = 'none';
    return true;
  }
}

async function saveTestToDb() {
  debugger;
  showLoader(loadTestOverlay);
  try {
    let title = testTitle.value;
    let timeLimit = document.querySelector('#selectTimeLimit').value;
    let marksBoundaries = getMarksBoundaries();
    let maps = await resizeAllMaps();
    const res = await fetch('/tests/new', {
      method: 'POST', 
      body: JSON.stringify( { title, maps, questions, marksBoundaries, timeLimit } ),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (res.status === 400) {
      const errorData = await res.json();
      console.log('Chyba: ' + errorData.error);
    } else if (res.ok) {
      location.assign('/tests');
    } else {
      console.log('Něco se pokazilo.');
    }
  }
  catch (err) {
    console.log(err.errors);
  }
  finally {
    hideLoader(loadTestOverlay);
  }
}

async function updateTestInDb(testId) {
  debugger;
  showLoader(loadTestOverlay);
  try {
    let title = testTitle.value;
    let timeLimit = document.querySelector('#selectTimeLimit').value;
    let marksBoundaries = getMarksBoundaries();   
    let maps = await resizeAllMaps();
    let questions = test.questions; 
    let fetchUrl = '/tests/' + testId;
    const res = await fetch(fetchUrl, {
      method: 'PUT', 
      body: JSON.stringify( { title, maps, questions, marksBoundaries, timeLimit } ),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (res) {
      location.assign('/tests')
    }
  }
  catch (err) {
    console.log(err)
  }
  finally {
    hideLoader(loadTestOverlay);
  }
}