const heroImage = document.getElementById("heroImage");

const images = [
  "pasta.jpg",
  "cb.jpg",
  "strawberrycake.jpg"
];

let index = 0;

setInterval(() => {
  heroImage.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % images.length;
    heroImage.src = images[index];
    heroImage.style.opacity = 1;
  }, 500);

}, 2000);


const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});