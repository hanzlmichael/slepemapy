const deleteQuestionBtn = document.querySelector('#deleteQuestionBtn');
const wrapQuestions = document.querySelector('.wrap-questions')
let questions = [1,2];

deleteQuestionBtn.addEventListener('click', removeQuestionIcon);

function removeQuestionIcon() {
  if (questions.length > 0) {
    console.log(wrapQuestions.querySelector('span:last-of-type'));
    wrapQuestions.querySelector('span:last-of-type').remove();
  }
}
