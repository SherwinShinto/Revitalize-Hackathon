// Author: Naren P
// Part of logging in, logging out, and the Account tab. This file holds renderAccount().

// Draws the Account page with clothing totals and the reset and log out buttons.
function renderAccount() {
  root.innerHTML = `
    <h1>My Account</h1>

    <div class="panel">
      <h2>${escapeHTML(currentUser)}</h2>

      <div class="stats">
        <div class="panel">
          <strong>${items.length}</strong>
          Total Clothes
        </div>

        <div class="panel">
          <strong>${statusItems("keep").length}</strong>
          Kept
        </div>

        <div class="panel">
          <strong>${statusItems("sell").length}</strong>
          To Sell
        </div>

        <div class="panel">
          <strong>${statusItems("donate").length}</strong>
          To Donate
        </div>
      </div>

      <div class="actions">
        <button class="blue" onclick="resetDemo()">
          Reset Demo Closet
        </button>

        <button class="red" onclick="logout()">
          Log Out
        </button>
      </div>
    </div>
  `;
}
