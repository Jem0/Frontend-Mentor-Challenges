const questions = document.querySelectorAll(".question-wrapper");

questions.forEach((question) =>
  question.addEventListener("click", () => {
    // parentNode is the question-answer-set class
    if (question.parentNode.classList.contains("active")) {
      question.parentNode.classList.toggle("active");
    } else {
      // only show the answer to the question that was clicked on
      questions.forEach((question) => {
        question.parentNode.classList.remove("active");
      });
      question.parentNode.classList.add("active");
    }
  })
);
