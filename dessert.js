// ======================
// DESSERT PAGE 🍰
// ======================

const container = document.getElementById("recipesContainer");

async function getDesserts() {
  if (!container) return;

  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
    );
    const data = await res.json();

    if (!data.meals) {
      container.innerHTML = "<p>No desserts found</p>";
      return;
    }

    const meals = data.meals
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);

    container.innerHTML = "";

    meals.forEach(meal => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
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

        const recipeRes = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const recipeData = await recipeRes.json();

        localStorage.setItem(
          "selectedRecipe",
          JSON.stringify(recipeData.meals[0])
        );
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

        favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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
    console.error(err);
    container.innerHTML = "<p>An error occurred while loading desserts.</p>";
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

// update when returning to tab
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

getDesserts();