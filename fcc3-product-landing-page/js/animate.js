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
  });

  let animated1 = false;
  const animate1 = () => {
    if (!animated1) {
      document.querySelector(".js--animate-1").classList.add("anim__move-left-1");
    }
  };
})();
