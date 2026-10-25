// Author: Bazil T
// Part of the + Add Clothes tab. This file holds addClothing().

// Sends the Add form (and photo) to the server, then goes back to the closet.
async function addClothing(event) {
  event.preventDefault();

  try {
    await api("/api/items", {
      method: "POST",
      body: new FormData(event.currentTarget)
    });

    await showPage("closet");
  } catch (error) {
    showError(error);
  }
}
