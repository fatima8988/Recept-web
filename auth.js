// ======================
// SHARED LOGIN SYSTEM
// ======================

const loginBtn = document.querySelector(".nav-btn");
const modal = document.getElementById("loginModal");
const loginSubmit = document.getElementById("loginSubmit");

function updateUI() {
  const logged = localStorage.getItem("loggedIn") === "true";

  if (loginBtn) {
    loginBtn.innerText = logged ? "Logga ut" : "Logga in";
  }

  const existing = document.getElementById("savedLink");

  if (logged && !existing) {
    const nav = document.getElementById("navLinks");

    if (!nav) return;

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

// login/logout click
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const logged = localStorage.getItem("loggedIn") === "true";

    if (!logged) {
      if (modal) modal.style.display = "flex";
    } else {
      localStorage.setItem("loggedIn", "false");
      updateUI();
    }
  });
}

// login submit
if (loginSubmit) {
  loginSubmit.addEventListener("click", () => {
    const user = document.getElementById("username")?.value;
    const pass = document.getElementById("password")?.value;

    if (user && pass) {
      localStorage.setItem("loggedIn", "true");
      if (modal) modal.style.display = "none";
      updateUI();
    } else {
      alert("Please enter username and password");
    }
  });
}

// close modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// run on every page load
updateUI();