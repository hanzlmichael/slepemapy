const incPointBtn = document.querySelector('#inc-point');
const decPointBtn = document.querySelector('#dec-point');
const MAX_POINT_VALUE = 10;
const MIN_POINT_VALUE = 1;
export let pointValue = document.querySelector('#point-value');

export function initPoints() {
  incPointBtn.addEventListener('click', incPointValue);
  decPointBtn.addEventListener('click', decPointValue);
}

function decPointValue(e) {
  validatePointValue(e);
}

function incPointValue(e) {
  validatePointValue(e);
}

function validatePointValue(e) {
  let actualPointValue = Number(pointValue.textContent);
  if (e.target.id === "inc-point") {
    if (actualPointValue === MAX_POINT_VALUE) {
      return;
    } else {
      incPoint();
    }
  } else {
    if (actualPointValue === MIN_POINT_VALUE) {
      return;
    } else {
      decPoint();
    }
  }
}

function incPoint() {
  pointValue.textContent = Number(pointValue.textContent) + 1;
}

function decPoint() {
  pointValue.textContent = Number(pointValue.textContent) - 1;
}

