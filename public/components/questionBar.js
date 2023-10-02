/* Vytváření otázek*/
let wrapQuestionsElem = document.querySelector(".wrap-questions");
let addNewQuestionBtn = document.querySelector("#add-new-question");
let panel = document.querySelector('.panel-testing');
let canvasWrap = document.querySelector('.canvas-wrap-testing');
let maps = [];
let questions = [];
let test = new Test("", questions, maps, false, [], null);


addNewQuestionBtn.addEventListener("click", addQuestion);
wrapQuestionsElem.addEventListener('input', changeQuestion);

function addQuestion() {
  createQuestionIcon();
  setLastQuestionIconAsChecked();
  createQuestionObject();
  showElement(panel);
  drawQuestion();
}

function createQuestionIcon() {
  let newQuestionElem = `<span><input type="radio" id="question${numberOfQuestions()}" name="question">
    <label for="question${numberOfQuestions()}">${numberOfQuestions()}</label></span>`;
  let addQuestion = document.querySelector("#add-new-question");
  addQuestion.insertAdjacentHTML("beforebegin", newQuestionElem);
}

function createQuestionObject() {
  questions.push(new Question([], 1, null));
}

function changeQuestion(e) {
  console.log(e.target);
  questionNumber.textContent = valueOfQuestion();
}

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

