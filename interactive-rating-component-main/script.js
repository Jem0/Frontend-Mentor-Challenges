const submitBtn = document.querySelector(".btn-submit");
const compOne = document.querySelector(".rating-component-1");
const compTwo = document.querySelector(".rating-component-2");
const ratings = document.querySelectorAll(".rating");
const selected = document.querySelector(".selection");

submitBtn.addEventListener("click", () => {
    compOne.classList.add("hidden");
    compTwo.classList.remove("hidden");
});

let ratingsCount = ratings.length;

for (let i=0; i < ratingsCount;i++){

    ratings[i].onclick = function(e) {
        ratings.forEach(rating => {
            if (rating.classList.contains('active')){
            rating.classList.remove('active');
        }
        });
        ratings[i].classList.add('active');
        selected.innerHTML = `<p>You selected ${ratings[i].innerText} out of 5</p>`; 
}}
