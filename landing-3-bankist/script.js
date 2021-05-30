"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const header = document.querySelector(".header");
const section1 = document.getElementById("section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const sections = document.querySelectorAll(".section");

////////////////////////////////////////////////////////////////////
// Modal window
const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btnOpenModal) => {
  btnOpenModal.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
//
////////////////////////////////////////////////////////////////////
// Cookie message
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML = `We use cookies for improved functionalities and analitics <button class="btn btn--close--cookie">Got it!</button>`;
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";
// header.append(message);
// document.querySelector(".btn--close--cookie").addEventListener("click", () => {
//   message.remove();
// });
//
////////////////////////////////////////////////////////////////////
// Scroll button
btnScrollTo.addEventListener("click", (event) => {
  const s1Coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1Coords.left + window.pageXOffset,
    top: s1Coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});
//
////////////////////////////////////////////////////////////////////
// Page navigation using event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});
//
////////////////////////////////////////////////////////////////////
// Tabbed component
tabsContainer.addEventListener("click", function (e) {
  // Get clicked element
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Activate tab
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // Activate content area
  tabsContent.forEach((content) => content.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
//
////////////////////////////////////////////////////////////////////
// Menu fade animation
const handleHover = (e, op) => {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = op;
      }
    });
    logo.style.opacity = op;
  }
};
nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));
nav.addEventListener("mouseout", (e) => handleHover(e, 1));
//
////////////////////////////////////////////////////////////////////
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", (e) => {
//   if (window.scrollY > initialCoords.top)
//     nav.classList.add("sticky");
//   else
//   nav.classList.remove("sticky");
// });
//
////////////////////////////////////////////////////////////////////
// Sticky navigation with IntersectionObserver API
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//
////////////////////////////////////////////////////////////////////
// Reveal sections on scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
//
////////////////////////////////////////////////////////////////////
// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset["src"];
    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));
//
////////////////////////////////////////////////////////////////////
// Slider (carousel)
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
let currentSlide = 0;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slideNumber) {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-slide="${slideNumber}"]`)
    .classList.add("dots__dot--active");
};
const goToSlide = function (slideNumber) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slideNumber)}%)`;
  });
  activateDot(slideNumber);
};

goToSlide(currentSlide);

const nextSlide = () => {
  if (currentSlide === slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};
const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  else if (e.key === "ArrowRight") nextSlide();
});
dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
  }
});

// document.addEventListener("DOMContentLoaded", (e) => {
//   console.log(e);
// });

// Prevent accidental close
// window.addEventListener("beforeunload", (e) => {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });
