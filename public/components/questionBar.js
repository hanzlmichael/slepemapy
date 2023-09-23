/* Vytváření otázek*/
let wrapQuestionsElem = document.querySelector(".wrap-questions");
let maps = [];
let questions = [];
let test = new Test("", questions, maps, false, [], null);
let addNewQuestionBtn = document.querySelector("#add-new-question");

addNewQuestionBtn.addEventListener("click", addNewQuestion);
wrapQuestionsElem.addEventListener('input', changeQuestion);

function addNewQuestion() {
  createQuestionIcon();
}

function createQuestionIcon() {
  let newQuestionElem = `<span><input type="radio" id="question${numberOfQuestions()}" checked data-questionindex="${actualQuestionIndex}" name="question">
    <label for="question${numberOfQuestions()}">${numberOfQuestions()}</label></span>`;
  let addQuestion = document.querySelector("#add-new-question");
  addQuestion.insertAdjacentHTML("beforebegin", newQuestionElem);
}

function createQuestionObject() {
  questions.push(new Question([], 1, null));
}


function changeQuestion(e) {
  console.log(e.target);
}

function deleteQuestion() {

}

function removeQuestionIcon() {

}

function numberOfQuestions() {
  return wrapQuestionsElem.querySelectorAll('input').length + 1;
}

class Test {
  constructor(testTitle, questions, maps, isActive, marksRange, completeUntil) {
    this.testTitle = testTitle;
    this.questions = questions;
    this.maps = maps;
    this.isActive = isActive;
    this.marksRange = marksRange;
    this.completeUntil = completeUntil;
  }
}

class Question {
  constructor(answers, points, map) {
    this.answers = answers;
    this.points = points;
    this.map = map;
  }
}

class Answer {
  constructor(term, isCorrect) {
    this.term = term;
    this.isCorrect = isCorrect;
  }

  // Metoda pro nastavení hodnoty term
  setTerm(term) {
    this.term = term;
  }

  // Metoda pro nastavení hodnoty isCorrect
  setIsCorrect(isCorrect) {
    this.isCorrect = isCorrect;
  }

  // Metoda pro získání hodnoty term
  getTerm() {
    return this.term;
  }

  // Metoda pro získání hodnoty isCorrect
  getIsCorrect() {
    return this.isCorrect;
  }
}

class Map {
  constructor(data) {
    this.data = data;
  }
}