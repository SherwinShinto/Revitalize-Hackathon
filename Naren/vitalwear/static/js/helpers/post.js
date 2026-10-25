// Author: Naren P
// A small shared helper used all over the site. This file holds post().

// Sends data to the server as a POST request.
function post(url, data) {
  return api(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
}
