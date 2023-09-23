const addAnswerWrapBtn = document.querySelector('#add-answer-wrap');
const answersWrap = document.querySelector('#answers-wrap');
document.querySelector('#answers-wrap').addEventListener('click', removeAnswerWrap)

addAnswerWrapBtn.addEventListener('click', appendAnswerToDom);

function appendAnswerToDom() {
  answersWrap.appendChild(createNewAnswer());
}

function createNewAnswer() {
  // Create the main div with class "answer-wrap"
  const answerWrap = document.createElement("div");
  answerWrap.className = "answer-wrap";

  // Create the input element with class "answer-text" and placeholder
  const answerInput = document.createElement("input");
  answerInput.className = "answer-text";
  answerInput.placeholder = "Odpověď";

  // Create the button element with class "close-term" and text "×"
  const closeButton = document.createElement("button");
  closeButton.className = "close-term";
  closeButton.textContent = "×";

  // Create the inner div with class "answer-checkbox"
  const answerCheckboxDiv = document.createElement("div");
  answerCheckboxDiv.className = "answer-checkbox";

  // Create the checkbox input element with name "check" and an onclick attribute
  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.name = "check";
  checkboxInput.setAttribute("onclick", "onlyOne(this)");

  // Create the span element with text "správná odpověď"
  const checkboxLabel = document.createElement("span");
  checkboxLabel.textContent = "správná odpověď";

  // Append the input and button to the main div
  answerWrap.appendChild(answerInput);
  answerWrap.appendChild(closeButton);

  // Append the checkbox input and label to the inner div
  answerCheckboxDiv.appendChild(checkboxInput);
  answerCheckboxDiv.appendChild(checkboxLabel);

  // Append the inner div to the main div
  answerWrap.appendChild(answerCheckboxDiv);

  // Return the created HTML structure
  return answerWrap;
}

function onlyOne(checkbox) {
  debugger;
  var checkboxes = document.getElementsByName('check')
  let closestAnswerWrapElem = checkbox.closest('.answer-wrap')
  if (closestAnswerWrapElem.classList.contains('answer-wrap-green')) {
    checkbox.closest('.answer-wrap').classList.remove('answer-wrap-green')
  } else {
    checkbox.closest('.answer-wrap').classList.add('answer-wrap-green')
  }
  checkboxes.forEach((item) => {
    if (item !== checkbox) {
      item.checked = false
      item.closest('.answer-wrap').classList.remove('answer-wrap-green')
    }
  })
}

function removeAnswerWrap(e) {
  if (e.target.matches('.close-term')) {
    e.target.closest('.answer-wrap').remove();
  }
}