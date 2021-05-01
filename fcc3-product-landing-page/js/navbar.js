const navBarElement = document.querySelector(".nav-bar");
const navToggleElement = document.querySelector(".nav-toggle");
const navButtonIcon = document.getElementById("button-toggle-icon");

const barsIcon = "fa-bars";
const closeIcon = "fa-times";

let navToggleState = navBarElement.classList.contains("hidden") ? "hidden" : "open";
navToggleElement.addEventListener("click", () => {
  navBarElement.classList.toggle("hidden");
  if (navToggleState === "hidden") {
    navToggleState = "open";
    navButtonIcon.classList.add(closeIcon);
    navButtonIcon.classList.remove(barsIcon);
  } else {
    navToggleState = "hidden";
    navButtonIcon.classList.add(barsIcon);
    navButtonIcon.classList.remove(closeIcon);
  }
});
