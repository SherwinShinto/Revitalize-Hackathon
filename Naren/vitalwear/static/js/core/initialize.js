// Author: Naren P
// Gets the site going when the page first opens.

// Runs when the page opens: shows the closet if already logged in, otherwise the login
// screen.
async function initialize() {
  try {
    const result = await api("/api/me");

    if (result.user) {
      currentUser = result.user;
      renderNavigation();
      await showPage("closet");
    } else {
      renderLogin();
    }
  } catch (error) {
    root.innerHTML = `
      <div class="panel">
        <h2>Could not connect to Flask</h2>
        <p>Make sure your Python server is running.</p>
      </div>
    `;

    console.error(error);
  }
}
