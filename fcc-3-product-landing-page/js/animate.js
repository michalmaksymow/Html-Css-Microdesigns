(function () {
  const sectionAboutUs = document.getElementById("us");

  let scrollPos = window.pageYOffset;
  let scrollPosVH = window.pageYOffset + window.innerHeight;
  window.addEventListener("scroll", (event) => {
    scrollPos = window.pageYOffset;
    scrollPosVH = window.pageYOffset + window.innerHeight;

    if (scrollPosVH >= sectionAboutUs.offsetTop + 200) {
      animate1();
    }
    if (scrollPosVH >= sectionAboutUs.offsetTop + 500) {
      animate2();
    }
  });

  let animated1 = false;
  const animate1 = () => {
    if (!animated1) {
      document.querySelector(".js--animate-1").classList.add("anim__move-left-1");
      animated1 = true;
    }
  };

  let animated2 = false;
  const animate2 = () => {
    if (!animated2) {
      document.querySelector(".js--animate-2").classList.add("anim__move-left-1");
      animated2 = true;
    }
  };
})();
