const items = document.querySelectorAll(".card");
const filters = document.querySelectorAll(".dropdown-menu p");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.filter;

    items.forEach(card => {
      if (value === "all" || card.dataset.category === value) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});