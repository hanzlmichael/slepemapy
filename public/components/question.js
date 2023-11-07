import { canvas } from '../inits/canvas.js';
import { selectMap, questionNumber, wrapQuestions, hideElement, sumOfQuestions, setLastQuestionIconAsChecked, valueOfQuestion } from '../inits/definitions.js';
import { test, questions, actualQuestionIndex, panel, canvasWrap, decActualQuestionIndex, incActualQuestionIndex } from '../components/questionBar.js';
import { pointValue } from '../components/points.js';
import { answersWrap, createNewAnswer } from '../components/answer.js';
import { Answer } from '../components/classes.js';
import { testResizeMapToCanvas } from '../components/canvas.js';

export function initQuestion() {
  deleteQuestionBtn.addEventListener('click', removeQuestion);
  questionIndex = actualQuestionIndex;
  console.log('here 1')
  console.log('questionIndex ', questionIndex);
}

let questionIndex;
console.log('questionIndex ', questionIndex);

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
  debugger;
  console.log('remove ', questionIndex)
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

  // vykreslit shapes
  //setShapes();

}

function getPointValue() {
  return Number(pointValue.textContent);
}

function setPointValue() {
  console.log(questionIndex);
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

/* function saveShapes() {
  removeMapFromCanvas().then(() => {
    // Zde máme jistotu, že mapa byla odstraněna
    test.questions[actualQuestionIndex].shapes = JSON.stringify(canvas);
  });
} */

export function setShapes() {
  let shapes = test.questions[actualQuestionIndex].shapes;
  if (shapes === null) {
    canvas.clear();
    return;
  }
  canvas.loadFromJSON(shapes);
  canvas.renderAll();
  /* testLoad(shapes); */
}

function testLoad(shapesJSON) {
  canvas.loadFromJSON(shapesJSON, function() {
    canvas.renderAll();
    console.log('renderALL1')
    canvas.forEachObject(function(obj) {
      console.log('render HERE')
      console.log('canvas get obj ', canvas.getObjects())
      /* if (obj.type === 'polyline' && obj.src) { */
        if (obj.src) {
        fabric.Image.fromURL(obj.src, function(img) {
          img.set({
            left: obj.left, // Nastavte pozici, kde chcete zobrazit obrázek
            top: obj.top,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY
          });
          console.log('renderALL3')
          canvas.add(img);
          //canvas.remove(obj); // Odstranění původního objektu polyline
          canvas.renderAll();
          console.log('renderALL2')
        });
      }
    });
  });
}

export function saveQuestion() {
  debugger;
  if (questions) {
    test.questions[actualQuestionIndex].answers = getAnswers();
    test.questions[actualQuestionIndex].points = getPointValue();
    test.questions[actualQuestionIndex].map = getMap();
    saveShapes();
  }
}

function resetSelectMap() {
  selectMap.selectedIndex = "0";
  fireChangeEventOnSelectMap();
}

function fireChangeEventOnSelectMap() {
  let event = new Event('change');
  selectMap.dispatchEvent(event);
}

/* function removeMapFromCanvas() {
  debugger;
  let objs = canvas.getObjects();
  canvas.remove(objs[0]); 
  objs.forEach(obj => {
 	if (obj.type == 'image') {
   	canvas.remove(obj)
  }
 })
} */

/* function removeMapFromCanvas() {
  return new Promise((resolve, reject) => {
    let objs = canvas.getObjects();
    if (objs.length > 0) {
      objs.forEach(obj => {
        if (obj.type == 'image') {
          canvas.remove(obj)
       }
       resolve();
      });
    } else {
      resolve(); // Pokud nejsou žádné objekty na plátně, pokračujeme bez čekání
    }
  });
} */
function removeMapFromCanvas() {
  let objs = canvas.getObjects();
  objs.forEach(obj => {
 	if (obj.type == 'image' && obj.myTest == 'test') {
   	canvas.remove(obj)
  }
 })
}