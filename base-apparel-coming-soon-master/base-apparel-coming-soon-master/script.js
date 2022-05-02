const submitBtn = document.querySelector("#btn-arrow");
const input = document.querySelector("#email-input");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const emailformat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (String(input.value).toLowerCase().match(emailformat)) {
    submitBtn.parentNode.classList.remove("invalid-email");
  } else {
    submitBtn.parentNode.classList.add("invalid-email");
  }
});
