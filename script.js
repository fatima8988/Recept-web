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

  // ======================
  // 💻 DESKTOP (>= 768px)
  // ======================
  if (window.innerWidth > 768) {

    // original shrink effect
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // always show navbar on desktop
    navbar.classList.remove("hide");
  }

  // ======================
  // 📱 MOBILE (<= 768px)
  // ======================
  else {

    // always show at top
    if (currentScroll <= 0) {
      navbar.classList.remove("hide");
      return;
    }

    // scroll down → hide
    if (currentScroll > lastScroll) {
      navbar.classList.add("hide");
    } 
    // scroll up → show
    else {
      navbar.classList.remove("hide");
    }
  }

  lastScroll = currentScroll;
});


// ======================
// REAL LOGIN SYSTEM (MODAL + SAVED BUTTON)
// ======================

const loginBtn = document.querySelector(".nav-btn");
const modal = document.getElementById("loginModal");
const loginSubmit = document.getElementById("loginSubmit");

function updateUI() {
  const logged = localStorage.getItem("loggedIn") === "true";

  // change button text
  loginBtn.innerText = logged ? "Logga ut" : "Logga in";

  // show/hide "Sparade"
  const existing = document.getElementById("savedLink");

  if (logged && !existing) {
    const nav = document.getElementById("navLinks");

    const saved = document.createElement("a");
    saved.href = "saved.html";
    saved.id = "savedLink";
    saved.innerText = "Sparade ❤️";

    nav.appendChild(saved);
  }

  if (!logged && existing) {
    existing.remove();
  }
}

// click login/logout
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const logged = localStorage.getItem("loggedIn") === "true";

    if (!logged) {
      modal.style.display = "flex";
    } else {
      localStorage.setItem("loggedIn", "false");
      updateUI();
    }
  });
}

// submit login
if (loginSubmit) {
  loginSubmit.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user && pass) {
      localStorage.setItem("loggedIn", "true");
      modal.style.display = "none";
      updateUI();
    } else {
      alert("Fyll i alla fält");
    }
  });
}

// close modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// run on load
updateUI();


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
    container.innerHTML = "<p>Inga recept hittades</p>";
    return;
  }

  data.meals.forEach(meal => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <button class="open-btn">Öppna</button>
      <button class="fav-btn">❤️</button>
    `;

    // OPEN RECIPE (LOGIN REQUIRED)
    card.querySelector(".open-btn").addEventListener("click", () => {
      if (localStorage.getItem("loggedIn") !== "true") {
        alert("Logga in först!");
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
        alert("Logga in för att spara ❤️");
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