const adviceID = document.getElementById("advice-id");
const advice = document.getElementById("advice");
const button = document.getElementById("btn-generate");
const url = "https://api.adviceslip.com/advice";

if (adviceID.innerText == "" || advice.innerText == "") {
  getAdvice();
}

button.addEventListener("click", getAdvice);

function getAdvice() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      adviceID.innerText = data.slip.id;
      advice.innerText = data.slip.advice;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
