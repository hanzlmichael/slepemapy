let saveTestBtn = document.querySelector('#saveTest');
let marksBoundariesInputs = document.querySelectorAll('.table-input-number');
let testTitle = document.querySelector('#test-name-wrap input');

saveTestBtn.addEventListener('click', handleTestInDb)

function getMarksBoundaries() {
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
    updateTestInDb(lastString);
  }
}

async function saveTestToDb() {
  debugger;
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
    if (res) {
      console.log('res : ', res)
      location.assign('/tests')
    }
  }
  catch (err) {
    console.log(err)
  }
}

function updateTestInDb() {

}