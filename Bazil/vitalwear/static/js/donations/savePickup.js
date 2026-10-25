// Author: Bazil T
// Part of the Donate tab. This file holds savePickup().

// Saves the chosen pickup date and time.
async function savePickup() {
  const date = el("pickupDate").value;
  const time = el("pickupTime").value;

  if (!date || !time) {
    alert("Choose a date and time.");
    return;
  }

  try {
    await post("/api/pickups", {date, time});
    await showPage("donate");
  } catch (error) {
    showError(error);
  }
}
