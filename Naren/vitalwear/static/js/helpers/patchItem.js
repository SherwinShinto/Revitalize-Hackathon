// Author: Naren P
// A small shared helper used all over the site. This file holds patchItem().

// Saves changes to one clothing item (status, name, price, and so on).
function patchItem(id, changes) {
  return api(`/api/items/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(changes)
  });
}
