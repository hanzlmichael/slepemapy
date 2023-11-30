import { Test } from '../components/classes.js';
import { wrapQuestionsElem, questions, maps, test, setActualQuestionIndexToZero, setActualQuestionIndexToMinusOne, assignQuestions, assignMaps, assignTest} from '../components/questionBar.js';
import { drawQuestion } from '../components/question.js';
import { setMapCoundToMapsLength } from '../components/mapLoader.js';

export let selectMap = document.querySelector('#select-map');
export let mapsWrap = document.querySelector('.maps-wrap');
export const deleteQuestionBtn = document.querySelector('#deleteQuestionBtn');
export const wrapQuestions = document.querySelector('.wrap-questions')
export const questionNumber = document.querySelector('#question-number');

export function initDefinitions() {
  if (testBSON(window.location.href)) {
    document.addEventListener('DOMContentLoaded', getTestById)
  }
}

export function numberOfQuestions() {
  return wrapQuestionsElem.querySelectorAll('input').length + 1;
}

export function hideElement(elem) {
  elem.style.visibility = "hidden"
}

export function showElement(elem) {
  elem.style.visibility = "visible"; 
} 

export function setLastQuestionIconAsChecked() {
  wrapQuestionsElem.querySelector('span:last-of-type input').checked = true;
}

export function sumOfQuestions() {
  return questions.length;
}

export function valueOfQuestion() {
  return Number(wrapQuestions.querySelector('input:checked + label').textContent);
}

export function indexOfQuestion() {
  return Number(wrapQuestions.querySelector('input:checked + label').textContent - 1);
}

export function testBSON(inputString) {
  const urlArray = inputString.split('/');
  let bsonPart = urlArray[urlArray.length - 2];
  if (/^[0-9a-fA-F]{24}$/.test(bsonPart)) {
    return true
  }
  return false  
}

export function getTestById() {
  let url = window.location.href;
  let urlArray = url.split('/');
  const testId = urlArray[urlArray.length - 2];
  fetch(`/tests/${testId}`, {
      method: 'GET',
      credentials: 'include'
    }).then(response => response.json())
      .then(data=> {
        assignQuestions(data.test.questions)
        assignMaps(data.test.maps);
        let newTest = new Test( data.test.title, maps, questions, data.test.isActive, data.test.marksBoundaries, data.test.timeLimit);
        assignTest(newTest);
        setActualQuestionIndexToZero();
        // inicializace poctu nahratych map
        setMapCoundToMapsLength(maps.length);
        if (test.questions.length > 0) {
          drawQuestion();
        } else {
          setActualQuestionIndexToMinusOne();
        }
      })  
}
