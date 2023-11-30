import { showElement } from '../inits/definitions.js';
import { drawQuestion, saveQuestion } from '../components/question.js';
import { test, panel, canvasWrap } from '../components/questionBar.js';

export const progressBarHeadingsCount = 3;
export let progressBarHeadings = ["Nahrátí map", "Tvorba otázek", "Dokončení"];
export let progressBarHeading = document.querySelector("#progress-bar-heading");
export let headingNumber = 0;
export let rectangles = document.querySelectorAll('.rectangle')
export let actualPageIndex = 0;

// Stránka pro vytváření map, vytváření otázek a dokončení testu
export let createTestPages = document.querySelectorAll('.create-test-page');

let prevBtn = document.querySelector('#prev-btn');
let nextBtn = document.querySelector('#next-btn');

export function initPageSwitcher() {
  prevBtn.addEventListener('click', prevState);
  nextBtn.addEventListener('click', nextState);
}

export function prevState() {
  headingNumber--;
  handleChangePages("dec");
  if (headingNumber < 0) {
      headingNumber = 0;            
      return;
  }
  rectangles[headingNumber + 1].classList.remove("passed");
  progressBarHeading.innerText = progressBarHeadings[headingNumber];
}

export function nextState() {
  headingNumber++;
  isPageCreateTestDetailsActive();
  isCreateOfQuestionsActive() 
  handleChangePages("inc");
  if (headingNumber == progressBarHeadingsCount) {
      headingNumber = progressBarHeadingsCount - 1;
      return;
  }
  rectangles[headingNumber].classList.add("passed");
  progressBarHeading.innerText = progressBarHeadings[headingNumber];
}

// Jestli je zobrazena sekce "Tvorba otázek"
function isCreateOfQuestionsActive() {
  if (headingNumber == 1) {
    console.log("tvorba otázek");
  }
  if (test.questions.length > 0) {
    showElement(panel);
    if (test.questions[0].map !== "null") {
      showElement(canvasWrap);
    }
  }  
}

function isPageCreateTestDetailsActive() {
  if (headingNumber == 2) {
    if (test.questions.length > 0) {
      saveQuestion();
      drawQuestion();
    }
    // vykreslit soucet bodu ze vsech otazek
    document.querySelector('#total-points-value').textContent = sumOfQuestionsPoints(); 
  }
}

function sumOfQuestionsPoints() {
  let sum = 0;
  for (let i = 0; i < test.questions.length; i++) {
    sum = sum + test.questions[i].points;
  }
  return sum;
}

function handleChangePages(operation) {
  if (operation == "inc") {
      hideAllPages();
      actualPageIndex++;
      handleActualPageIndex();
      showActualPage();
  }
  if (operation == "dec") {
      hideAllPages();
      actualPageIndex--;
      handleActualPageIndex();
      showActualPage();
  }
}

function hideAllPages() {
  createTestPages.forEach(el => {
      el.classList.remove("create-test-page--active");
  })
}

function showActualPage() {
  createTestPages[actualPageIndex].classList.add("create-test-page--active");
}

function handleActualPageIndex() {
 if (actualPageIndex > 2) {
   actualPageIndex = 2;
   return;
 }
 if (actualPageIndex < 0) {
   actualPageIndex = 0;
 }
}