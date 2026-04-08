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


const heroImage = document.getElementById("heroImage");

const images = [
  "sc.jpg",
  "cpp.jpg",
  "hg.jpg"
];

let currentIndex = 0;

setInterval(() => {
  heroImage.style.opacity = "0";

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    heroImage.src = images[currentIndex];
    heroImage.style.opacity = "1";
  }, 500);
}, 5000);