// Author: Bazil T
// Part of the Sell tab. This file holds renderSell().

// Draws the Sell page: price, description and platforms for each item, plus saved listings.
async function renderSell() {
  const selling = statusItems("sell");
  const listings = await api("/api/listings");

  root.innerHTML = `
    <h1>Revitalize Your Bank Account</h1>
    <p>Prepare clothing listings for resale.</p>

    ${selling.length ? selling.map(item => `
      <div class="panel">
        <div class="sell-item">
          <div class="sell-image">
            ${clothingImage(item)}
          </div>

          <div>
            <h2>${escapeHTML(item.name)}</h2>

            <label>Price ($)</label>
            <input type="number" min="0"
              id="price-${item.id}"
              value="${Number(item.price || 0)}">

            <label>Description</label>
            <textarea id="description-${item.id}">${escapeHTML(item.description || "")}</textarea>

            <button class="blue"
              onclick="writeDescription('${item.id}')">
              Write Description
            </button>

            <p>Select selling platforms:</p>

            ${["Depop", "eBay", "Poshmark"].map(platform => `
              <label>
                <input type="checkbox"
                  class="platform-${item.id}"
                  value="${platform}">
                ${platform}
              </label>
            `).join("")}

            <div class="actions">
              <button class="green"
                onclick="saveListing('${item.id}')">
                Save Demo Listing
              </button>

              <button class="muted"
                onclick="changeClothingStatus('${item.id}', 'remove', 'sell')">
                ↶ Change Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join("") : `
      <div class="panel">
        No items selected for selling.
      </div>
    `}

    <div class="panel">
      <h2>Saved Demo Listings</h2>

      ${listings.length ? listings.map(listing => `
        <div class="outfit">
          <h3>${escapeHTML(listing.name)}</h3>
          <p>$${Number(listing.price).toFixed(2)}</p>
          <p>${escapeHTML(listing.platforms.join(", "))}</p>
        </div>
      `).join("") : "<p>No listings saved yet.</p>"}
    </div>
  `;
}
