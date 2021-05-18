const documentation = document.getElementById("main-doc");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".main-section");

const updatePosition = function () {
  let highestInView;
  for (const [_, section] of sections.entries()) {
    if (section.inView) {
      highestInView = section;
      break;
    }
  }
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${highestInView.getAttribute("id")}`) {
      link.classList.add("active");
    }
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target["inView"] = true;
      } else {
        entry.target["inView"] = false;
      }
    });
    updatePosition();
  },
  {
    root: null,
    threshold: 0,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});
