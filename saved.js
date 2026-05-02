// ======================
// PROTECT PAGE (FIREBASE COMPATIBLE)
// ======================

const container = document.getElementById("savedContainer");

function checkLogin() {
  if (localStorage.getItem("loggedIn") !== "true") {
    container.innerHTML = `
      <div style="padding:60px; text-align:center;">
        <h2>🔒 You must be logged in</h2>
        <p>Log in to view your saved recipes</p>
        <a href="index.html">Go back</a>
      </div>
    `;
    return false;
  }
  return true;
}


// ======================
// NAV: SHOW "SAVED" WHEN LOGGED IN
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
saved.innerText = "Favorite ❤️";

// 🔥 highlight if on saved page
if (window.location.pathname.includes("saved.html")) {
  saved.classList.add("active");
}

nav.appendChild(saved);
  }

  if (!logged && existing) {
    existing.remove();
  }
}

updateSavedLink();
window.addEventListener("focus", updateSavedLink);


// ======================
// LOAD SAVED RECIPES
// ======================

async function loadSaved() {

  if (!checkLogin()) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    container.innerHTML = "<p>You have no saved recipes yet 💔</p>";
    return;
  }

  container.innerHTML = "<p>Loading...</p>";
  let meals = [];

  try {
    for (let id of favorites) {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();

      if (data.meals) {
        meals.push(data.meals[0]);
      }
    }

    container.innerHTML = "";

    meals.forEach(meal => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>

        <div class="card-buttons">
          <button class="open-btn">Open</button>
          <button class="fav-btn">❌ Remove</button>
        </div>
      `;

      // OPEN
      card.querySelector(".open-btn").addEventListener("click", () => {
        localStorage.setItem("selectedRecipe", JSON.stringify(meal));
        window.location.href = "recipe.html";
      });

      // REMOVE
      card.querySelector(".fav-btn").addEventListener("click", () => {
        let updated = favorites.filter(f => f !== meal.idMeal);
        localStorage.setItem("favorites", JSON.stringify(updated));

        loadSaved(); // refresh
      });

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>An error occurred while loading saved recipes.</p>";
  }
}


// ======================
// NAV SCROLL EFFECT
// ======================

const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ======================
// LOAD PAGE
// ======================

loadSaved();