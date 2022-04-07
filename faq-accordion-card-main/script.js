const questions = document.querySelectorAll(".question");

questions.forEach((question) =>
  question.addEventListener("click", () => {
    // parentNode.parentNode is the question-answer-set class
    if (question.parentNode.parentNode.classList.contains("active")) {
      question.parentNode.parentNode.classList.toggle("active");
    } else {
      // only show the answer to the question that was clicked on
      questions.forEach((question) => {
        question.parentNode.parentNode.classList.remove("active");
      });
      question.parentNode.parentNode.classList.add("active");
    }
  })
);
