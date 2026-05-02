// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// 🔑 YOUR CONFIG HERE
const firebaseConfig = {
    apiKey: "AIzaSyBQpY6O3B7A1NyT7bRPdlmgEGAWtYNnnnY",
    authDomain: "recept-e1e42.firebaseapp.com",
    projectId: "recept-e1e42",
    storageBucket: "recept-e1e42.firebasestorage.app",
    messagingSenderId: "548745272878",
    appId: "1:548745272878:web:29013a455416d438d149bf",
    measurementId: "G-RJV1SX7YGW"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// UI elements
const loginBtn = document.querySelector(".nav-btn");
const navLinks = document.getElementById("navLinks");

// 🔄 Update UI
function updateUI(user) {
  // remove old username if exists
  const existingUser = document.getElementById("userName");

  if (existingUser) existingUser.remove();

  if (user) {
    // show username
    const name = document.createElement("span");
    name.id = "userName";
    name.innerText = `Hej, ${user.displayName.split(" ")[0]} 👋`;
    name.style.marginLeft = "10px";

    navLinks.appendChild(name);

    loginBtn.innerText = "Logga ut";

    localStorage.setItem("loggedIn", "true");
  } else {
    loginBtn.innerText = "Logga in";
    localStorage.setItem("loggedIn", "false");
  }
}

// 🔐 Login / Logout
loginBtn?.addEventListener("click", async () => {
  if (auth.currentUser) {
    await signOut(auth);
  } else {
    await signInWithPopup(auth, provider);
  }
});

// 🔁 Listen for auth state
onAuthStateChanged(auth, (user) => {
  updateUI(user);
});