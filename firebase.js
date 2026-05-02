// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQpY6O3B7A1NyT7bRPdLmgEGAWtYNnnnY",
  authDomain: "recept-e1e42.firebaseapp.com",
  projectId: "recept-e1e42",
  storageBucket: "recept-e1e42.appspot.com", // ✅ FIXED
  messagingSenderId: "548745272878",
  appId: "1:548745272878:web:29013a455416d438d149bf",
  measurementId: "G-RJV1SX7YGW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.querySelector(".nav-btn");
const navLinks = document.getElementById("navLinks");

function updateUI(user) {
  const oldUser = document.getElementById("userName");
  if (oldUser) oldUser.remove();

  if (user) {
    const name = document.createElement("span");
    name.id = "userName";

    const userName = user.displayName
      ? user.displayName.split(" ")[0]
      : "User";

    name.innerText = `Hej, ${userName} 👋`;

    navLinks.appendChild(name);
    loginBtn.innerText = "Logga ut";

    localStorage.setItem("loggedIn", "true");
  } else {
    loginBtn.innerText = "Logga in";
    localStorage.setItem("loggedIn", "false");
  }
}

loginBtn?.addEventListener("click", async () => {
  if (auth.currentUser) {
    await signOut(auth);
  } else {
    await signInWithPopup(auth, provider);
  }
});

onAuthStateChanged(auth, (user) => {
  updateUI(user);
});