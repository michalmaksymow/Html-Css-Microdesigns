const documentation = document.getElementById("main-doc");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".main-section");
const navbarToggleBtn = document.querySelector(".navbar-toggle");
const navbarList = document.querySelector(".navbar-list");

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

// NAVBAR ANIMATIONS
const [iconTimes, iconBars] = ["fa-times", "fa-bars"];

navbarToggleBtn.addEventListener("click", (e) => {
  const icon = navbarToggleBtn.querySelector(".fas");
  const isCollapsed = navbarList.getAttribute("data-collapsed") === "true";
  if (!isCollapsed) {
    icon.classList.remove(iconTimes);
    icon.classList.add(iconBars);
    collapseSection(navbarList);
  } else {
    icon.classList.remove(iconBars);
    icon.classList.add(iconTimes);
    expandSection(navbarList);
  }
});

const collapseSection = function (element) {
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = element.scrollHeight;

  // temporarily disable all css transitions
  const elementTransition = element.style.transition;
  element.style.transition = "";

  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(() => {
    element.style.height = sectionHeight + "px";
    element.style.transition = elementTransition;

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 0
    requestAnimationFrame(function () {
      element.style.height = 0 + "px";
    });
  });

  // mark the section as "currently collapsed"
  element.setAttribute("data-collapsed", "true");
};

expandSection = function (element) {
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = element.scrollHeight;

  // have the element transition to the height of its inner content
  element.style.height = sectionHeight + "px";

  // when the next css transition finishes (which should be the one we just triggered)
  element.addEventListener("transitionend", function (e) {
    // remove this event listener so it only gets triggered once
    element.removeEventListener("transitionend", arguments.callee);

    // remove "height" from the element's inline styles, so it can return to its initial value
    element.style.height = null;
  });

  // mark the section as "currently not collapsed"
  element.setAttribute("data-collapsed", "false");
};
