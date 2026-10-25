// Author: Naren P
// A small shared helper used all over the site. This file holds api().

// Calls the Flask server and returns its JSON. Throws a readable error if anything goes
// wrong.
async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options
  });

  const type = response.headers.get("content-type") || "";

  if (!type.includes("application/json")) {
    throw new Error(
      `Server returned HTTP ${response.status}. Check Flask.`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}
