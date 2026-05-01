if (localStorage.getItem("loggedIn") !== "true") {
  document.body.innerHTML = `
    <div style="padding:60px; text-align:center;">
      <h2>🔒 Du måste logga in</h2>
      <p>Logga in för att se dina sparade recept</p>
      <a href="index.html">Gå tillbaka</a>
    </div>
  `;
  throw new Error("Not logged in");
}const container = document.getElementById("savedContainer");

async function loadSaved() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    container.innerHTML = "<p>Du har inga sparade recept ännu 💔</p>";
    return;
  }

  container.innerHTML = "<p>Laddar...</p>";

  let meals = [];

  // fetch each saved recipe
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
    <button class="open-btn">Öppna</button>
    <button class="fav-btn">❌ Ta bort</button>
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

      loadSaved(); // reload page
    });

    container.appendChild(card);
  });
}

loadSaved();