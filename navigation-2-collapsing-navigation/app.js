const toggleButton = document.querySelector(".toggle-button");
const navList = document.querySelector(".nav-list");

toggleButton.addEventListener("click", () => {
    navList.classList.toggle("hidden");
});
