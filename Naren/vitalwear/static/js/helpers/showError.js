// Author: Naren P
// A small shared helper used all over the site. This file holds showError().

// Shows an error message in a popup.
function showError(error) {
  alert(error.message || String(error));
}
