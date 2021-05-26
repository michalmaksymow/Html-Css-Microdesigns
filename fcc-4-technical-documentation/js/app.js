const documentation = document.getElementById("main-doc");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".main-section");
const navbarToggleBtn = document.querySelector(".navbar-toggle");
const navbarList = document.querySelector(".navbar-list");

// =============================================================================
// NAVBAR POSITION UPDATING
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

// =============================================================================
// NAVBAR ANIMATIONS
const [iconTimes, iconBars] = ["fa-times", "fa-bars"];

navbarToggleBtn.addEventListener("click", (e) => {
  const icon = navbarToggleBtn.querySelector(".fas");
  const isCollapsed = navbarList.getAttribute("data-collapsed") === "true";
  toggleIcon(icon);
  if (!isCollapsed) {
    collapseSection(navbarList);
  } else {
    expandSection(navbarList);
  }
});

const toggleIcon = function (iconElement) {
  if (iconElement.classList.contains(iconTimes)) {
    iconElement.classList.remove(iconTimes);
    iconElement.classList.add(iconBars);
  } else {
    iconElement.classList.remove(iconBars);
    iconElement.classList.add(iconTimes);
  }
};

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

  element.addEventListener("transitionend", function (e) {
    // remove this event listener so it only gets triggered once
    element.removeEventListener("transitionend", arguments.callee);

    // add hidden class to the element
    element.classList.add("hidden");

    // remove "height" from the element's inline styles
    element.style.height = null;
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

    // remove hidden class to display the contents
    element.classList.remove("hidden");
  });

  // mark the section as "currently not collapsed"
  element.setAttribute("data-collapsed", "false");
};
