const buttonToggle = document.querySelector(".button-toggle");
const buttonToggleIcon = document.getElementById("button-toggle-icon");
const containerNav = document.querySelector(".container-nav");
const sectionHeader = document.querySelector(".section-header");

const barsIcon = "fa-bars";
const closeIcon = "fa-times";

buttonToggle.addEventListener("click", () => {
  buttonToggle.classList.toggle("expanded");
  containerNav.classList.toggle("expanded");
  buttonToggleIcon.classList.toggle(closeIcon);
  buttonToggleIcon.classList.toggle(barsIcon);
});
