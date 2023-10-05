/* Vytváření otázek*/
let wrapQuestionsElem = document.querySelector(".wrap-questions");
let addNewQuestionBtn = document.querySelector("#add-new-question");
let panel = document.querySelector('.panel-testing');
let canvasWrap = document.querySelector('.canvas-wrap-testing');
let maps = [];
let questions = [];
let test = new Test("", maps, questions, false, [], null);
let actualQuestionIndex = test.questions.length === 0 ? -1 : 0;


addNewQuestionBtn.addEventListener("click", addQuestion);
wrapQuestionsElem.addEventListener('input', changeQuestion);

function addQuestion() {  
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

  if (mapWraps.length === 1) {
    selectMap.selectedIndex = "1";
    createQuestionObject(getMap());
    simulateSelectMapEvent();
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
  saveQuestion();
  questionNumber.textContent = valueOfQuestion();
  actualQuestionIndex = indexOfQuestion();
  drawQuestion();
}

