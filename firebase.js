
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFy6ZBrTFmO10m2t0o2vxUkMWDozmdIqE",
    authDomain: "recept-5a9dc.firebaseapp.com",
    projectId: "recept-5a9dc",
    storageBucket: "recept-5a9dc.firebasestorage.app",
    messagingSenderId: "154084286789",
    appId: "1:154084286789:web:84b28dbf765fe090655e2c",
    measurementId: "G-ZQMGLX7TYL"
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

    name.innerText = `Hej, ${userName} `;

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