let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;

// Sample items
const items = [
  { id: 1, name: "Juba Beaded Necklace", price: 100, type: "Local" },
  { id: 2, name: "Imported Leather Briefcase", price: 250, type: "International" },
  { id: 3, name: "Cowhide Drum from Torit", price: 180, type: "Local" },
  { id: 4, name: "Swiss Watch", price: 500, type: "International" }
];

// Show login/register
function showLogin() {
  document.getElementById("authSection").classList.remove("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
}

function showRegister() {
  document.getElementById("authSection").classList.remove("hidden");
  document.getElementById("registerForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
}

// Register
function register() {
  const user = document.getElementById("registerUser").value;
  const pass = document.getElementById("registerPass").value;

  if (users[user]) {
    document.getElementById("registerMsg").textContent = "❌ Username already exists.";
  } else {
    users[user] = { password: pass, role: "user" };
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("registerMsg").textContent = "✅ Registered successfully!";
    showLogin();
  }
}

// Login
function login() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  if (users[user] && users[user].password === pass) {
    currentUser = user;
    document.getElementById("userWelcome").textContent = `Welcome, ${user}`;
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    renderItems();
  } else {
    document.getElementById("loginMsg").textContent = "❌ Invalid credentials.";
  }
}

// Render items
function renderItems() {
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-card";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Type: ${item.type}</p>
      <p>Current Bid: SSP <span class="price" id="price-${item.id}">${item.price}</span></p>
      <button onclick="placeBid(${item.id})">Place Bid</button>
    `;
    grid.appendChild(div);
  });
}

// Real-time bidding simulation
function placeBid(itemId) {
  const priceEl = document.getElementById(`price-${itemId}`);
  let currentPrice = parseInt(priceEl.textContent);
  const newPrice = currentPrice + Math.floor(Math.random() * 50 + 10); // Auto increment
  priceEl.textContent = newPrice;

  alert(`✅ Bid placed! New price: SSP ${newPrice}`);
}

// Payment
document.getElementById("paymentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = document.getElementById("paymentAmount").value;
  document.getElementById("paymentMsg").textContent = `✅ Payment of SSP ${amount} processed.`;
  e.target.reset();
});
