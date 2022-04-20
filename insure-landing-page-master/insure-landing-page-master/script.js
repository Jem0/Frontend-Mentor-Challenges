const hamburger = document.querySelector(".hamburger");
const navUl = document.querySelector(".header-nav");

hamburger.addEventListener("click", () => {
  navUl.classList.toggle("active");
});
