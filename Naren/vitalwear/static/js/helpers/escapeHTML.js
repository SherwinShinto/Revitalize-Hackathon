// Author: Naren P
// A small shared helper used all over the site. This file holds escapeHTML().

// Makes text safe to put on the page, so a name like <b> shows as text instead of HTML.
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}
