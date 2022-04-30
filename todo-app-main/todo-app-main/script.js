/******************************/
/* global variables           */
/******************************/

const addItems = document.querySelector("#add-item");
const todoList = document.querySelector("#todo-list");
const activeList = document.querySelector("#active-list");
const completedList = document.querySelector("#completed-list");

// check if there are items in local storage or fallback to empty array
let items = JSON.parse(localStorage.getItem("items")) || [];
let completedArr = [];
let activeArr = [];

function addItem(e) {
  e.preventDefault();
  const inputValue = this.querySelector("[name=item]").value;
  const item = {
    id: Date.now().toString(),
    inputValue,
    completed: false,
  };

  items.unshift(item);
  display(items, todoList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function toggleCompleted() {
  const selectedIndex = items.findIndex((item) => item.id === this.dataset.id);

  items[selectedIndex].completed = !items[selectedIndex].completed;
  localStorage.setItem("items", JSON.stringify(items));
  display(items, todoList);
}

function deleteItem() {
  const selectedIndex = items.findIndex((item) => item.id === this.dataset.id);

  items.splice(selectedIndex, 1);
  localStorage.setItem("items", JSON.stringify(items));
  display(items, todoList);
}

function removeCompletedItems() {
  if (todoList.parentNode.classList.contains("hidden")) {
    while (completedList.firstChild) {
      completedList.removeChild(completedList.firstChild);
    }
    completedArr.splice(0, completedArr.length);
    display(completedArr, completedList);
  } else {
    items = items.filter((item) => item.completed != true);
    display(items, todoList);
  }
  localStorage.setItem("items", JSON.stringify(items));
}

function display(inputs, list) {
  list.innerHTML = "";

  inputs.forEach((item) => {
    const buttonCheck = document.createElement("button");
    const imageCheck = document.createElement("img");
    const spanCheck = document.createElement("span");

    imageCheck.src = "images/icon-check.svg";
    imageCheck.alt = "check icon";
    imageCheck.classList.add("hidden");
    buttonCheck.setAttribute("data-id", item.id);
    buttonCheck.classList.add("btn-check");
    buttonCheck.appendChild(imageCheck);

    // for screenreaders only
    spanCheck.classList.add("sr-only");
    spanCheck.innerText = "Check Button";
    buttonCheck.appendChild(spanCheck);

    buttonCheck.addEventListener("click", toggleCompleted);

    const buttonCross = document.createElement("button");
    const imageCross = document.createElement("img");
    const spanCross = document.createElement("span");

    imageCross.src = "images/icon-cross.svg";
    imageCross.alt = "cross icon";
    buttonCross.setAttribute("data-id", item.id);
    buttonCross.classList.add("btn-cross");
    buttonCross.appendChild(imageCross);

    // for screenreaders only
    spanCross.classList.add("sr-only");
    spanCross.innerText = "Cross Button";
    buttonCross.appendChild(spanCross);

    buttonCross.addEventListener("click", deleteItem);

    const li = document.createElement("li");
    li.setAttribute("data-id", item.id);
    li.setAttribute("draggable", true);
    li.classList.add("draggable");

    li.innerText = item.inputValue;
    li.prepend(buttonCheck);
    li.appendChild(buttonCross);

    li.addEventListener("dragstart", (e) => {
      const dragged = e.target;
      dragged.classList.add("active");
    });

    if (item.completed) {
      li.classList.add("completed");
    }
    list.appendChild(li);
  });

  document
    .querySelector(".btn-clear")
    .addEventListener("click", removeCompletedItems);
  document.querySelector(".items-left").innerText = `${
    items.filter((item) => item.completed !== true).length
  } items left`;
}

addItems.addEventListener("submit", addItem);

/*****************************************/
/* filter by all, active, or completed   */
/*****************************************/

function hideOtherSections(listToShow, listToHide1, listToHide2) {
  listToShow.parentNode.classList.remove("hidden");
  listToHide1.parentNode.classList.add("hidden");
  listToHide2.parentNode.classList.add("hidden");

  if (listToShow !== todoList) {
    document.querySelector(".btn-all").style.color = "#777a92";
  }
}

function displayAllItems() {
  hideOtherSections(todoList, activeList, completedList);
  document.querySelector(".btn-all").style.color = "hsl(220, 98%, 61%)";
}

function displayActiveItems() {
  hideOtherSections(activeList, todoList, completedList);

  const activeTodos = items.filter((item) => item.completed !== true);
  activeArr.length = 0;
  activeArr.push(...activeTodos);
  display(activeArr, activeList);
}

function displayCompletedItems() {
  hideOtherSections(completedList, todoList, activeList);

  const completedTodos = items.filter((item) => item.completed === true);
  completedArr.length = 0;
  completedArr.push(...completedTodos);
  display(completedArr, completedList);
}

document.querySelector(".btn-all").addEventListener("click", displayAllItems);

document
  .querySelector(".btn-active")
  .addEventListener("click", displayActiveItems);
document
  .querySelector(".btn-completed")
  .addEventListener("click", displayCompletedItems);

/******************************/
/* default display            */
/******************************/

let defaultList = [
  "Complete online JavaScript course",
  "Jog around the park 3x",
  "10 minutes meditation",
  "Read for 1 hour",
  "Pick up groceries",
  "Complete Todo App on Frontend Mentor",
];

function defaultDisplay(list) {
  if (items.length === 0) {
    items = list.map((x, i) => {
      return { id: String(i), inputValue: x, completed: false };
    });
    display(items, todoList);
  }
  localStorage.setItem("items", JSON.stringify(items));
}

localStorage.getItem("items") === null
  ? defaultDisplay(defaultList)
  : display(items, todoList);

/******************************/
/* drag and sort              */
/******************************/

function handleDrag(e) {
  const dragged = document.querySelector(".active");
  e.preventDefault();
  console.log(dragged);
  const endY = e.pageY;

  const draggingIndex = items.findIndex(
    (item) => item.id === dragged.dataset.id
  );

  insertBeforeAfterElements(endY, draggingIndex);

  localStorage.setItem("items", JSON.stringify(items));
  display(items, todoList);
}

function insertBeforeAfterElements(y, draggingIndex) {
  const allOffsetTop = [];
  const draggables = document.querySelectorAll(".draggable");

  // get the id and top position of each li/draggable element in relation to the top of viewport
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("active");
    });

    allOffsetTop.push({
      id: draggable.dataset.id,
      topOfElement: draggable.getBoundingClientRect().top,
    });
  });

  const dragging = items[draggingIndex];

  let afterElements = allOffsetTop.filter((x) => {
    return x.topOfElement > y;
  });

  // if there are no after elements, push active/dragging element to list
  // else append before after elements
  if (afterElements.length === 0) {
    items.splice(draggingIndex, 1);
    items.push(dragging);
  } else {
    const afterElementIndex = items.findIndex(
      (item) => item.id === afterElements[0].id
    );
    items.splice(draggingIndex, 1);
    items.splice(afterElementIndex - 1, 0, dragging);
  }
}

// debounce binding to drag event - limit the amount of times handleDrag is called
function debounce(func, interval) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, interval || 200);
  };
}

const container = document.querySelector(".todo-container");
container.addEventListener("dragover", debounce(handleDrag));

/******************************/
/* theme change               */
/******************************/

const themeIcon = document.querySelector(".theme-icon");

function changeTheme() {
  const mainContainer = themeIcon.parentNode.parentNode.parentNode.parentNode;
  if (!mainContainer.classList.contains("light-theme")) {
    mainContainer.classList.add("light-theme");
    document.querySelector([".theme-icon img"]).src = "images/icon-moon.svg";
  } else {
    mainContainer.classList.remove("light-theme");
    document.querySelector([".theme-icon img"]).src = "images/icon-sun.svg";
  }
}

themeIcon.addEventListener("click", changeTheme);
