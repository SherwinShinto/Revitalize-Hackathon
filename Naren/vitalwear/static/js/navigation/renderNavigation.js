// Author: Naren P
// Part of the tab navigation at the top of the site. This file holds renderNavigation().

// Draws the tab buttons along the top and shows the user's name.
function renderNavigation() {
  nav.hidden = false;
  userLabel.textContent = currentUser;

  nav.innerHTML = pages.map(([id, label]) => `
    <button onclick="showPage('${id}')">
      ${label}
    </button>
  `).join("");
}
