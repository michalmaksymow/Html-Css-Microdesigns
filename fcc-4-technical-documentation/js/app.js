const documentation = document.getElementById("main-doc");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".main-section");

documentation.addEventListener("scroll", (e) => {
  console.log(documentation.scrollTop);
});
// TODO update navbarlinks on scroll
