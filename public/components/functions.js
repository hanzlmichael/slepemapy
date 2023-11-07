import { test, actualQuestionIndex } from '../components/questionBar.js';
import { drawQuestion } from '../components/question.js';

function getTestById() {
  let url = window.location.href;
  const lastString = url.split("/").pop();
  fetch(`/tests/${lastString}/edit`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      test = data.test;
      console.log("test OBJ : ", test);
      actualQuestionIndex = 0;
      if (test.questions.length > 0) {
        drawQuestion();
      } else {
        actualQuestionIndex = -1;
      }
    });
}
