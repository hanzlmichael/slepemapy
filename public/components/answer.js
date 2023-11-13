export const answersWrap = document.querySelector('#answers-wrap');
const shuffleAnswersBtn = document.querySelector('#shuffle-answers-btn'); 
const addAnswerWrapBtn = document.querySelector('#add-answer-wrap');

export function initAnswer() {
  answersWrap.addEventListener('click', removeAnswerWrap)  
  addAnswerWrapBtn.addEventListener('click', appendAnswerToDom);
  shuffleAnswersBtn.addEventListener('click', shuffleAnswers);
}

function appendAnswerToDom() {
  answersWrap.appendChild(createNewAnswer("", false));
}

export function createNewAnswer(term, isCorrect) {
  const answerWrap = document.createElement("div");
  answerWrap.className = "answer-wrap";

  const answerInput = document.createElement("input");
  answerInput.className = "answer-text";
  answerInput.placeholder = "Odpověď";
  answerInput.value = term;

  const closeButton = document.createElement("button");
  closeButton.className = "close-term";
  closeButton.textContent = "×";

  const answerCheckboxDiv = document.createElement("div");
  answerCheckboxDiv.className = "answer-checkbox";

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.name = "check";
  checkboxInput.checked = isCorrect;
  checkboxInput.setAttribute("onclick", "onlyOne(this)");

  const checkboxLabel = document.createElement("span");
  checkboxLabel.textContent = "správná odpověď";

  answerWrap.appendChild(answerInput);
  answerWrap.appendChild(closeButton);

  answerCheckboxDiv.appendChild(checkboxInput);
  answerCheckboxDiv.appendChild(checkboxLabel);

  answerWrap.appendChild(answerCheckboxDiv);

  return answerWrap;
}

export function onlyOne(checkbox) {
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


function shuffleAnswers() {
  const answersWrap = document.getElementById("answers-wrap");
  const answerWraps = Array.from(answersWrap.getElementsByClassName("answer-wrap"));
  
  // Vytvoření náhodného pořadí
  for (let i = answerWraps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answerWraps[i], answerWraps[j]] = [answerWraps[j], answerWraps[i]];
  }

  // Odebrání všech prvků ze "answers-wrap" a znovu je vložení v novém pořadí
  answerWraps.forEach((answerWrap) => {
    answersWrap.removeChild(answerWrap);
    answersWrap.appendChild(answerWrap);
  });
}

// zkontroluje jestli je v otázce aspon 1 odpověď zaškrtnutá jako správná
export function validateAnswers() {
  debugger;
  let answersWrapElem = document.querySelector('#answers-wrap');
  if (answersWrapElem.children.length === 0) return true;
  else {
    let checks = document.querySelector('input[type="checkbox"]:checked');
    if (checks) {
      return true;
    } else {
      return false;
    }
  }
}