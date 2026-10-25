// Author: Naren P
// A small shared helper used all over the site. This file holds refreshItems().

// Reloads the user's clothes from the server into `items`.
async function refreshItems() {
  items = await api("/api/items");
}
