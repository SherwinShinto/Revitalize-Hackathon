// Author: Naren P
// Part of logging in, logging out, and the Account tab. This file holds login().

// Logs in with the typed name, then opens the closet.
async function login() {
  const name = el("loginName").value.trim();

  if (!name) {
    alert("Enter your name.");
    return;
  }

  try {
    const result = await post("/api/login", {name});
    currentUser = result.user;
    renderNavigation();
    await showPage("closet");
  } catch (error) {
    showError(error);
  }
}
