let saveTestBtn = document.querySelector('#saveTest');
let marksBoundariesInputs = document.querySelectorAll('.table-input-number');
let testTitle = document.querySelector('#test-name-wrap input');

saveTestBtn.addEventListener('click', handleTestInDb)

function getMarksBoundaries() {
  debugger;
  marksBoundariesInputs = Array.from(marksBoundariesInputs);
  console.log('1 ', marksBoundariesInputs)
  marksBoundariesInputs = marksBoundariesInputs.slice(marksBoundariesInputs.length/2)
  console.log('1 ', marksBoundariesInputs)
  let marksBoundaries = [];
  marksBoundariesInputs.forEach( mark => marksBoundaries.push(mark.value));
  return marksBoundaries;
}

function handleTestInDb() {
  let url = window.location.href;
  const lastString = url.split("/").pop();
  if (lastString == 'new') {
    saveTestToDb();
  } else {
    let urlArray = url.split('/');
    const testId = urlArray[urlArray.length - 2];
    updateTestInDb(testId);
  }
}

async function saveTestToDb() {
  debugger;
  showLoader(loadTestOverlay);
  try {
    let title = testTitle.value;
    let timeLimit = document.querySelector('#selectTimeLimit').value;
    let marksBoundaries = getMarksBoundaries();
    const res = await fetch('/tests/new', {
      method: 'POST', 
      body: JSON.stringify( { title, maps, questions, marksBoundaries, timeLimit } ),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (res.status === 400) {
      const errorData = await res.json();
      console.log('Chyba: ' + errorData.error);
    } else if (res.ok) {
      location.assign('/tests');
    } else {
      console.log('Něco se pokazilo.');
    }
  }
  catch (err) {
    console.log(err.errors);
  }
  finally {
    hideLoader(loadTestOverlay);
  }
}

async function updateTestInDb(testId) {
  showLoader(loadTestOverlay);
  try {
    let title = testTitle.value;
    let timeLimit = document.querySelector('#selectTimeLimit').value;
    let marksBoundaries = getMarksBoundaries();   
    let maps = test.maps;
    let questions = test.questions; 
    let fetchUrl = '/tests/' + testId;
    const res = await fetch(fetchUrl, {
      method: 'PUT', 
      body: JSON.stringify( { title, maps, questions, marksBoundaries, timeLimit } ),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if (res) {
      location.assign('/tests')
    }
  }
  catch (err) {
    console.log(err)
  }
  finally {
    hideLoader(loadTestOverlay);
  }
}