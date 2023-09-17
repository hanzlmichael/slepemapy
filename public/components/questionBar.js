/* Vytváření otázek*/
let wrapQuestionsElem = document.querySelector(".wrap-questions");
let actualQuestionIndex = 0;
/*let questionNumber = wrapQuestionsElem.children.length > 1 ? wrapQuestionsElem.children.length - 1 : 0;*/
let questionNumber = 2;
let maps = [];
let test;
let questions = [];

document
  .querySelector("#add-new-question")
  .addEventListener("click", addNewQuestion);

function addNewQuestion() {
  createQuestionIcon();
  questionNumber++;
}

function createQuestionIcon() {
  let newQuestionElem = `<span><input type="radio" id="question${questionNumber}" data-questionindex="${actualQuestionIndex}" name="question">
    <label for="question${questionNumber}">${questionNumber}</label></span>`;
  let addQuestion = document.querySelector("#add-new-question");
  addQuestion.insertAdjacentHTML("beforebegin", newQuestionElem);
}
