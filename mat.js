// ======================
// FOOD PAGE (ONLY FOOD)
// ======================

const container = document.getElementById("recipesContainer");

// food categories (NO desserts)
const categories = ["Chicken", "Beef", "Pasta", "Seafood"];

async function getFood() {
  if (!container) return;

  container.innerHTML = "<p>Loading...</p>";

  let allMeals = [];

  try {
    // fetch multiple categories
    for (let cat of categories) {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
      );
      const data = await res.json();

      if (data.meals) {
        allMeals.push(...data.meals);
      }
    }

    // randomize + limit
    const meals = allMeals
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);

    container.innerHTML = "";

    meals.forEach(meal => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <button class="open-btn">Open</button>
        <button class="fav-btn">❤️</button>
      `;

      // 🔓 OPEN (login required)
      card.querySelector(".open-btn").addEventListener("click", async () => {
        if (localStorage.getItem("loggedIn") !== "true") {
          alert("Log in first!");
          return;
        }

        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const data = await res.json();

        const fullRecipe = data.meals[0];

        localStorage.setItem("selectedRecipe", JSON.stringify(fullRecipe));
        window.location.href = "recipe.html";
      });

      // ❤️ FAVORITES (login required)
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const favBtn = card.querySelector(".fav-btn");

      if (favorites.includes(meal.idMeal)) {
        favBtn.style.background = "pink";
      }

      favBtn.addEventListener("click", () => {

        if (localStorage.getItem("loggedIn") !== "true") {
          alert("Log in first!");
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

  } catch (err) {
    container.innerHTML = "<p>An error occurred while loading food recipes.</p>";
    console.error(err);
  }
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
    saved.innerText = "Saved ❤️";
    nav.appendChild(saved);
  }

  if (!logged && existing) {
    existing.remove();
  }
}

// run on load
updateSavedLink();

// also re-check when returning to page
window.addEventListener("focus", updateSavedLink);


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

getFood();