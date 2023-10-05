const progressBarHeadingsCount = 3;
let progressBarHeadings = ["Nahrátí map", "Tvorba otázek", "Dokončení"];
let progressBarHeading = document.querySelector("#progress-bar-heading");
let headingNumber = 0;
let rectangles = document.querySelectorAll('.rectangle')
let actualPageIndex = 0;
// Stránka pro vytváření map, vytváření otázek a dokončení testu
let createTestPages = document.querySelectorAll('.create-test-page');

function prevState() {
  headingNumber--;
  /* isCreateOfQuestionsActive(); */
  handleChangePages("dec");
  if (headingNumber < 0) {
      headingNumber = 0;            
      return;
  }
  rectangles[headingNumber + 1].classList.remove("passed");
  progressBarHeading.innerText = progressBarHeadings[headingNumber];
}

function nextState() {
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

 // return true if page "Tvorba otázek" is displayed
function isCreateOfQuestionsActive() {
  debugger;
  if (headingNumber == 1) {
    console.log("tvorba otázek");
  }
  if (test.questions.length > 0) {
    showElement(panel);
    if (test.questions[0].map) {
      showElement(canvasWrap);
      /* drawQuestion(); */
    }
  }
  
}

function isPageCreateTestDetailsActive() {
  debugger;
  if (headingNumber == 2) {
    console.log("create-test-details");

    saveQuestion();
    drawQuestion();

    document.querySelector('#total-points-value').textContent = sumOfQuestionsPoints(); 

  }
}

function sumOfQuestionsPoints() {
  let sum = 0;
  for (let i = 0; i < questions.length; i++) {
    sum = sum + questions[i].points;
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