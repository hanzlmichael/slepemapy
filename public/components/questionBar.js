import { canvas } from '../inits/canvas.js';
import { Test, Question } from '../components/classes.js';
import { selectMap, questionNumber, numberOfQuestions, setLastQuestionIconAsChecked, valueOfQuestion, showElement, indexOfQuestion } from '../inits/definitions.js';
import { saveQuestion, drawQuestion, getMap } from '../components/question.js';
import { validateAnswers } from '../components/answer.js';

/* Vytváření otázek*/
export let wrapQuestionsElem = document.querySelector(".wrap-questions");
export let addNewQuestionBtn = document.querySelector("#add-new-question");
export let panel = document.querySelector('.panel-testing');
export let canvasWrap = document.querySelector('.canvas-wrap-testing');
export let maps = [];
export let questions = [];
export let test = new Test("", maps, questions, false, [], null);
export let actualQuestionIndex = test.questions.length === 0 ? -1 : 0;
export const decActualQuestionIndex = () => actualQuestionIndex = actualQuestionIndex - 1;
export const incActualQuestionIndex = () => actualQuestionIndex = actualQuestionIndex + 1;
export const setActualQuestionIndexToZero = () => actualQuestionIndex = 0;
export const setActualQuestionIndexToMinusOne = () => actualQuestionIndex = -1;

export const assignQuestions = (dataQuestions) => questions = dataQuestions;
export const assignMaps = (dataMaps) => maps = dataMaps;
export const assignTest = (dataTest) => test = dataTest;

export function initQuestionBar() {
  addNewQuestionBtn.addEventListener("click", addQuestion);
  wrapQuestionsElem.addEventListener('input', changeQuestion);
}

function addQuestion() {  
  if (questions.length > 0 && !validateAnswers()) {
    alert("Označte správnou odpověď");
    return;
  }
  let mapWraps = document.querySelectorAll('.map-wrap');
  debugger;
  if (test.questions.length > 0) {
    saveQuestion();
  }
  canvas.clear();
  createQuestionIcon();
  setLastQuestionIconAsChecked();
  actualQuestionIndex = test.questions.length;
  /* createQuestionObject(); */
  showElement(panel);

  /* if (mapWraps.length === 1) {
    selectMap.selectedIndex = "1";
    createQuestionObject(getMap());
    simulateSelectMapEvent();
  } else {
    createQuestionObject(null);
  } */
  if (maps.length === 1) {
    selectMap.selectedIndex = "1";
    createQuestionObject(getMap());
  } else {
    createQuestionObject(null);
  }

  drawQuestion();
}

function simulateSelectMapEvent() { 
  selectMap.selectedIndex = "1";
  let event = new Event('change');
  selectMap.dispatchEvent(event);
}

function createQuestionIcon() {
  let newQuestionElem = `<span><input type="radio" id="question${numberOfQuestions()}" name="question">
    <label for="question${numberOfQuestions()}">${numberOfQuestions()}</label></span>`;
  let addQuestion = document.querySelector("#add-new-question");
  addQuestion.insertAdjacentHTML("beforebegin", newQuestionElem);
}

function createQuestionObject(map) {
  questions.push(new Question([], 1, map, null));
}

function changeQuestion(e) {
  if (!validateAnswers()) {
    alert("Označte správnou odpověď");
    return;
  };
  saveQuestion();
  questionNumber.textContent = valueOfQuestion();
  actualQuestionIndex = indexOfQuestion();
  drawQuestion();
}

