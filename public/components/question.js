const deleteQuestionBtn = document.querySelector('#deleteQuestionBtn');
const wrapQuestions = document.querySelector('.wrap-questions')
const questionNumber = document.querySelector('#question-number');

deleteQuestionBtn.addEventListener('click', removeQuestion);

function removeQuestionIcon() {
  wrapQuestions.querySelector('span:last-of-type').remove();
}

function removeQuestionObject() {
  let indexOfQuestionToDeleteFromArray = wrapQuestions.querySelector('input:checked + label').textContent - 1;
  questions.splice(indexOfQuestionToDeleteFromArray, 1);
}

function removeQuestion() {

  if (sumOfQuestions() === valueOfQuestion()) {
    removeQuestionObject();
    removeQuestionIcon(); 
    if (questions.length > 0) {
      setLastQuestionIconAsChecked();
    }
  } else {
    removeQuestionObject();
    removeQuestionIcon(); 
  }
  if (questions.length === 0) {
    hideElement(panel);
  }

  drawQuestion();
}

function sumOfQuestions() {
  return questions.length;
}

function valueOfQuestion() {
  return Number(wrapQuestions.querySelector('input:checked + label').textContent);
}

function drawQuestion() {
  questionNumber.textContent = valueOfQuestion();
}