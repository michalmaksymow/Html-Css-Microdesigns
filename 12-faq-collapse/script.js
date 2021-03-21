const toggleButtons = document.querySelectorAll(".faq-toggle");

toggleButtons.forEach(toggleButton => {
  toggleButton.addEventListener('click', () => {
    toggleButton.parentNode.classList.toggle('active');
  });
});