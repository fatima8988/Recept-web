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
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  "https://images.unsplash.com/photo-1606312619070-d48b4c652a52",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3"
];

let index = 0;

setInterval(() => {
  // fade out
  heroImage.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % images.length;
    heroImage.src = images[index];

    // fade in
    heroImage.style.opacity = 1;
  }, 500);

}, 2000); // ändra till 1000 om du vill snabbare