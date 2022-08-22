let buildings = document.querySelectorAll(".svg__gen");
let navBtns = document.querySelectorAll(".choice-list__item");
let selection = function () {
  let selectedItem;

  navBtns.forEach((btn) => {
    if (!btn.classList.contains("choice-list__item--1")) {
      btn.addEventListener("click", selectBuilding);
    }
  });
  function selectBuilding() {
    navBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    this.classList.add("selected");
    selectedItem = this.getAttribute("data-num");
    setActiveBuilding(selectedItem);
  }
  function setActiveBuilding(item) {
    buildings.forEach((item) => {
      item.classList.contains(selectedItem)
        ? item.classList.add("selected")
        : item.classList.remove("selected");
    });
  }
};

let dragging = function () {
  let drag = document.querySelector(".drag");
  buildings.forEach((item) => {
    item.addEventListener("mousemove", startDrag);
  });
  buildings.forEach((item) => {
    item.addEventListener("mouseleave", stopDrag);
  });

  function startDrag(e) {
    let X = e.pageX;
    let Y = e.pageY;
    let top = Y - 205 + "px";
    let left = X + 32 + "px";
    drag.style.top = top;
    drag.style.left = left;
    drag.classList.add("visible");
    let dragNum = document.querySelector(".drag__header-section-num");
    let draggingItem = this.getAttribute("data-drag");
    dragNum.innerHTML = draggingItem;
  }
  function stopDrag() {
    drag.classList.remove("visible");
  }
};

selection();
dragging();

// Burger
const menuBurger = document.querySelector(".header__burger");
const menuBody = document.querySelector(".header__burger-points");
menuBurger.addEventListener("click", function (e) {
  menuBurger.classList.toggle("_active");
  menuBody.classList.toggle("_active");
});
