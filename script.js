// ======================
// HERO IMAGE SLIDER
// ======================

const heroImage = document.getElementById("heroImage");

const images = ["c.png", "k.png", "p.png", "t.png"];

let index = 0;

if (heroImage) {
  heroImage.src = images[0];

  setInterval(() => {
    heroImage.style.opacity = 0;

    setTimeout(() => {
      index = (index + 1) % images.length;
      heroImage.src = images[index];
      heroImage.style.opacity = 1;
    }, 500);

  }, 2500);
}


// ======================
// NAV SCROLL (DESKTOP + MOBILE)
// ======================

const navbar = document.querySelector(".nav");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  if (!navbar) return;

  const currentScroll = window.scrollY;

  if (window.innerWidth > 768) {
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    navbar.classList.remove("hide");
  } else {
    if (currentScroll <= 0) {
      navbar.classList.remove("hide");
      return;
    }

    if (currentScroll > lastScroll) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }
  }

  lastScroll = currentScroll;
});


// ======================
// NAV: SHOW "SAVED" WHEN LOGGED IN (FIREBASE CONTROL)
// ======================

function updateSavedLink() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;

  const logged = localStorage.getItem("loggedIn") === "true";
  const existing = document.getElementById("savedLink");

  if (logged && !existing) {
    const saved = document.createElement("a");
    saved.href = "saved.html";
    saved.id = "savedLink";
    saved.innerText = "Saved ❤️";
    nav.appendChild(saved);
  }

  if (!logged && existing) {
    existing.remove();
  }
}

// run on load
updateSavedLink();

// also re-check when page becomes visible again
window.addEventListener("focus", updateSavedLink);


// ======================
// API FETCH (RECIPES)
// ======================

const container = document.getElementById("recipesContainer");
const searchInput = document.getElementById("search");

async function getRecipes(query = "chicken") {
  if (!container) return;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await res.json();

  container.innerHTML = "";

  if (!data.meals) {
    container.innerHTML = "<p>No recipes found</p>";
    return;
  }

  data.meals.forEach(meal => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <button class="open-btn">Open</button>
      <button class="fav-btn">❤️</button>
    `;

    // OPEN RECIPE (LOGIN REQUIRED)
    card.querySelector(".open-btn").addEventListener("click", () => {
      if (localStorage.getItem("loggedIn") !== "true") {
        alert("Log in first!");
        return;
      }

      localStorage.setItem("selectedRecipe", JSON.stringify(meal));
      window.location.href = "recipe.html";
    });

    // FAVORITES (LOGIN REQUIRED)
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favBtn = card.querySelector(".fav-btn");

    if (favorites.includes(meal.idMeal)) {
      favBtn.style.background = "pink";
    }

    favBtn.addEventListener("click", () => {

      if (localStorage.getItem("loggedIn") !== "true") {
        alert("Log in first to save ❤️");
        return;
      }

      if (!favorites.includes(meal.idMeal)) {
        favorites.push(meal.idMeal);
        favBtn.style.background = "pink";
      } else {
        favorites = favorites.filter(id => id !== meal.idMeal);
        favBtn.style.background = "#eee";
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    container.appendChild(card);
  });
}


// ======================
// SEARCH
// ======================

if (searchInput) {
  searchInput.addEventListener("input", () => {
    getRecipes(searchInput.value);
  });
}


// ======================
// LOAD DEFAULT RECIPES
// ======================

if (container) {
  getRecipes();
}