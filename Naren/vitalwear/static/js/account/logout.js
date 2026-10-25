// Author: Naren P
// Part of logging in, logging out, and the Account tab. This file holds logout().

// Logs out, clears everything in memory, and goes back to the login screen.
async function logout() {
  try {
    await post("/api/logout", {});
    currentUser = null;
    items = [];
    history = [];
    styleWeather = null;
    styleOutfits = [];
    styleMessages = [];
    renderLogin();
  } catch (error) {
    showError(error);
  }
}
