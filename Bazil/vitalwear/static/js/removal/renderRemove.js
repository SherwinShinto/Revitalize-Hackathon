// Author: Bazil T
// Part of the Sort Removal tab (sell or donate removed clothes). This file holds
// renderRemove().

// Shows removed clothes so the user can pick Sell, Donate, or Keep instead.
function renderRemove() {
  const pending = statusItems("remove");
  const selling = statusItems("sell");
  const donating = statusItems("donate");

  root.innerHTML = `
    <h1>Sort Removed Clothes</h1>

    <p>
      Decide whether to sell or donate your removed clothes.
      You can also keep them instead.
    </p>

    <div class="panel">
      <h2>Awaiting Decision (${pending.length})</h2>

      <div class="grid">
        ${pending.length ? pending.map(item => `
          <div class="tile">
            ${clothingImage(item)}

            <h3>${escapeHTML(item.name)}</h3>

            <p class="small">
              ${escapeHTML(item.color)}
              · ${escapeHTML(item.category)}
            </p>

            <div class="removal-actions">
              <button class="blue"
                onclick="changeClothingStatus('${item.id}', 'sell', 'remove')">
                Sell
              </button>

              <button class="green"
                onclick="changeClothingStatus('${item.id}', 'donate', 'remove')">
                Donate
              </button>

              <button class="muted"
                onclick="changeClothingStatus('${item.id}', 'keep', 'remove')">
                ↶ Keep Instead
              </button>
            </div>
          </div>
        `).join("") : `
          <p>No clothes waiting to be sorted.</p>
        `}
      </div>
    </div>

    <div class="panel">
      <h2>Already Sorted</h2>

      <div class="removal-summary">
        <strong>${selling.length} selected to sell</strong>
        <strong>${donating.length} selected to donate</strong>
      </div>

      <div class="grid">
        ${[...selling, ...donating].map(item => `
          <div class="tile">
            ${clothingImage(item)}

            <h3>${escapeHTML(item.name)}</h3>

            <p class="small">
              ${item.status === "sell" ? "For Sale" : "For Donation"}
            </p>

            <div class="removal-actions">
              <button class="muted"
                onclick="changeClothingStatus('${item.id}', 'remove', 'remove')">
                ↶ Change Decision
              </button>

              <button class="green"
                onclick="changeClothingStatus('${item.id}', 'keep', 'remove')">
                Keep Instead
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="actions">
        <button class="blue" onclick="showPage('sell')">
          View Selling Items
        </button>

        <button class="green" onclick="showPage('donate')">
          View Donations
        </button>

        <button class="muted" onclick="undoLastDecision()">
          ↶ Undo Last Decision
        </button>
      </div>
    </div>
  `;
}
