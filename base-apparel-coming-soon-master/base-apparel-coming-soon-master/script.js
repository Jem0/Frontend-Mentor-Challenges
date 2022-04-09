const submitBtn = document.querySelector("#btn-arrow");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let input = document.getElementById("email-input").value;
  let mailformat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (String(input).toLowerCase().match(mailformat)) {
    submitBtn.parentNode.classList.remove("invalid-email");
    console.log("valid");
  } else {
    submitBtn.parentNode.classList.add("invalid-email");
    console.log("invalid");
  }
});
