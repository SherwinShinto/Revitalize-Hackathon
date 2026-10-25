// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds quickStyle().

// Puts a sample prompt in the message box when one of the prompt buttons is clicked.
function quickStyle(message) {
  el("styleMessage").value = message;
  el("styleMessage").focus();
}
