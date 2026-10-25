// Author: Bazil T
// Part of the Donate tab. This file holds renderDonate().

// Draws the Donate page: items to donate, a Google Maps link, and pickup planning.
async function renderDonate() {
  const donated = statusItems("donate");
  const pickups = await api("/api/pickups");

  root.innerHTML = `
    <h1>Revitalize Humanity</h1>
    <p>Give your unwanted clothes a second life.</p>

    <div class="panel">
      <h2>Items to Donate (${donated.length})</h2>

      <div class="grid">
        ${donated.length ? donated.map(item => `
          <div class="tile">
            ${clothingImage(item)}

            <h3>${escapeHTML(item.name)}</h3>

            <button class="muted"
              onclick="changeClothingStatus('${item.id}', 'remove', 'donate')">
              ↶ Change Decision
            </button>
          </div>
        `).join("") : `
          <p>No items selected for donation.</p>
        `}
      </div>
    </div>

    <div class="panel">
      <h2>Find Donation Centres</h2>

      <button class="blue" onclick="findDonationCentres()">
        Open Google Maps
      </button>
    </div>

    <div class="panel">
      <h2>Plan a Donation Pickup</h2>

      <p class="small">
        Saves your own plan, not a charity booking.
      </p>

      <label>Date</label>
      <input type="date" id="pickupDate">

      <label>Time</label>
      <input type="time" id="pickupTime">

      <button class="green" onclick="savePickup()">
        Save Pickup Plan
      </button>
    </div>

    <div class="panel">
      <h2>Saved Pickup Plans</h2>

      ${pickups.length ? pickups.map(plan => `
        <p>
          ${escapeHTML(plan.date)}
          at ${escapeHTML(plan.time)}
        </p>
      `).join("") : "<p>No pickup plans saved.</p>"}
    </div>
  `;
}
