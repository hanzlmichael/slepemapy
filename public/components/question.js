import { canvas } from '../inits/canvas.js';
import { selectMap, questionNumber, wrapQuestions, hideElement, sumOfQuestions, setLastQuestionIconAsChecked, valueOfQuestion } from '../inits/definitions.js';
import { test, questions, actualQuestionIndex, panel, canvasWrap, decActualQuestionIndex, incActualQuestionIndex } from '../components/questionBar.js';
import { pointValue } from '../components/points.js';
import { answersWrap, createNewAnswer } from '../components/answer.js';
import { Answer } from '../components/classes.js';

export function initQuestion() {
  deleteQuestionBtn.addEventListener('click', removeQuestion);
  questionIndex = actualQuestionIndex;
}

let questionIndex;

function removeQuestionIcon() {
  wrapQuestions.querySelector('span:last-of-type').remove();
}

function removeQuestionObject() {
  let indexOfQuestionToDeleteFromArray = wrapQuestions.querySelector('input:checked + label').textContent - 1;
  questions.splice(indexOfQuestionToDeleteFromArray, 1);
}

function indexOfQuestion() {
  return Number(wrapQuestions.querySelector('input:checked + label').textContent - 1);
}

function removeQuestion() {
  if (sumOfQuestions() === valueOfQuestion()) {
    removeQuestionObject();
    removeQuestionIcon(); 
    if (questions.length > 0) {
      setLastQuestionIconAsChecked();      
      decActualQuestionIndex();
    }
  } else {
    removeQuestionObject();
    removeQuestionIcon(); 
  }
  if (questions.length === 0) {
    hideElement(panel);
    hideElement(canvasWrap);
    decActualQuestionIndex();
    return;
  }
  drawQuestion();
}

export function drawQuestion() {  
  questionNumber.textContent = valueOfQuestion();  
  // vykreslit hodnotu bodu
  setPointValue();
  // vykreslit odpovedi
  setAnswers();
  // vykreslit mapu
  setMap();  
}

function getPointValue() {
  return Number(pointValue.textContent);
}

function setPointValue() {
  pointValue.textContent = test.questions[actualQuestionIndex].points;
}

function getAnswers() {
  let allAnswers = document.querySelectorAll('.answer-wrap');
  let answers = [];
  for (let i = 0; i < allAnswers.length; i++) {
    let term = allAnswers[i].childNodes[0].value;
    let isCorrect = allAnswers[i].children[2].children[0].checked;
    answers.push(new Answer(term, isCorrect));
  }
  return answers;
}

function setAnswers() {
  let answersLength = test.questions[actualQuestionIndex].answers.length;
  answersWrap.innerHTML = "";
  for (let i = 0; i < answersLength; i++) {
    let term = test.questions[actualQuestionIndex].answers[i].term;
    let isCorrect = test.questions[actualQuestionIndex].answers[i].isCorrect;
    answersWrap.appendChild(createNewAnswer(term, isCorrect));
    if (isCorrect) {
      document.querySelector('.answer-wrap:last-child').classList.add('answer-wrap-green')
    }
  }
}

export function getMap() {
  return selectMap.value;
}

function setMap() {
  let indexOfQuestionValue = indexOfQuestion();
  if (questions[indexOfQuestionValue].map) {
    selectMap.value = questions[indexOfQuestionValue].map;
    fireChangeEventOnSelectMap();
  } else {
    selectMap.selectedIndex = "0";
    fireChangeEventOnSelectMap();
  }
}

function saveShapes() {
  removeMapFromCanvas();
  canvas.renderAll();
  // Zde můžete provést další akce, například uložení dat
  test.questions[actualQuestionIndex].shapes = JSON.stringify(canvas);
}

export function setShapes() {
  let shapes = test.questions[actualQuestionIndex].shapes;
  if (shapes === null) {
    canvas.clear();
    return;
  }
  canvas.loadFromJSON(shapes);
  canvas.renderAll();
}

export function saveQuestion() {
  if (questions) {
    test.questions[actualQuestionIndex].answers = getAnswers();
    test.questions[actualQuestionIndex].points = getPointValue();
    test.questions[actualQuestionIndex].map = getMap();
    saveShapes();
  }
}

function fireChangeEventOnSelectMap() {
  let event = new Event('change');
  selectMap.dispatchEvent(event);
}

function removeMapFromCanvas() {
  let objs = canvas.getObjects();
  objs.forEach(obj => {
 	if (obj.type == 'image' && obj.myTest == 'test') {
   	canvas.remove(obj)
  }
 })
}