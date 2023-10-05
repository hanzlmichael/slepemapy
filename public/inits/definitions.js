var canvas = new fabric.Canvas('canvas');

let selectMap = document.querySelector('#select-map');
let mapsWrap = document.querySelector('.maps-wrap');

const deleteQuestionBtn = document.querySelector('#deleteQuestionBtn');
const wrapQuestions = document.querySelector('.wrap-questions')
const questionNumber = document.querySelector('#question-number');


function numberOfQuestions() {
  return wrapQuestionsElem.querySelectorAll('input').length + 1;
}

function hideElement(elem) {
  elem.style.visibility = "hidden"
}

function showElement(elem) {
  elem.style.visibility = "visible"; 
} 

function setLastQuestionIconAsChecked() {
  wrapQuestionsElem.querySelector('span:last-of-type input').checked = true;
}

function sumOfQuestions() {
  return questions.length;
}

function valueOfQuestion() {
  return Number(wrapQuestions.querySelector('input:checked + label').textContent);
}

function indexOfQuestion() {
  return Number(wrapQuestions.querySelector('input:checked + label').textContent - 1);
}


if (testBSON(window.location.href)) {
  debugger;
  document.addEventListener('DOMContentLoaded', getTestByIdTest)
}

function testNewPath() {
  let url = window.location.href;
  let lastPart = url.split('/').pop();
  if (lastPart == 'new') return true;
  return false;
}
function testBSON(inputString) {
  const urlArray = inputString.split('/');
  let bsonPart = urlArray[urlArray.length - 2];
  if (/^[0-9a-fA-F]{24}$/.test(bsonPart)) {
    return true
  }
  return false  
}

function getTestById() {
  debugger;
  let url = window.location.href;
  let urlArray = url.split('/');
  const testId = urlArray[urlArray.length - 2];
  fetch(`/tests/${testId}/edit`, {
      method: 'GET',
      credentials: 'include'
    }).then(response=>response.json())
      .then(data=> {
        debugger;
        console.log(data);
        test = data.test;
        console.log('test OBJ : ', test);
        actualQuestionIndex = 0;
        if (test.questions.length > 0) {
          drawQuestion();
        } else {
          actualQuestionIndex = -1;
        }
      })     
}

function getTestByIdTest() {
  debugger;
  let url = window.location.href;
  let urlArray = url.split('/');
  const testId = urlArray[urlArray.length - 2];
  fetch(`/tests/${testId}`, {
      method: 'GET',
      credentials: 'include'
    }).then(response => response.json())
      .then(data=> {
        debugger;
        console.log(data);
        test = data.test;
        questions = data.test.questions;
        maps = data.test.maps;
        console.log('test OBJ : ', test);
        actualQuestionIndex = 0;
        if (test.questions.length > 0) {
          drawQuestion();
        } else {
          actualQuestionIndex = -1;
        }
      })  
}