// Author: Naren P
// Part of logging in, logging out, and the Account tab. This file holds renderLogin().

// Draws the login screen.
function renderLogin() {
  nav.hidden = true;
  userLabel.textContent = "";

  root.innerHTML = `
    <div class="panel auth">
      <h1>Welcome to VitalWear</h1>
      <p>Give your closet a second life.</p>

      <label>Your Name</label>
      <input id="loginName" placeholder="Enter your name">

      <div class="actions">
        <button class="green" onclick="login()">
          Enter My Closet
        </button>
        <button class="blue" onclick="demoLogin()">
          Try Demo Closet
        </button>
      </div>
    </div>
  `;
}
