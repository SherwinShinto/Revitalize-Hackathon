// Author: Naren P
// Part of logging in, logging out, and the Account tab. This file holds demoLogin().

// Logs in as 'Demo User' and fills the closet with sample clothes.
async function demoLogin() {
  try {
    const result = await post("/api/login", {
      name: "Demo User"
    });

    currentUser = result.user;

    // Demo login resets only the Demo User closet.
    await post("/api/demo", {});

    history = [];
    styleOutfits = [];
    styleMessages = [];

    renderNavigation();
    await showPage("closet");
  } catch (error) {
    showError(error);
  }
}
