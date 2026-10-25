// Author: Bazil T
// Part of the My Closet tab. This file holds clothingCard().

// Builds one clothing card with its picture, status, and Keep, Remove, Undo and Edit
// buttons.
function clothingCard(item) {
  const kept = item.status === "keep";
  const removed = ["remove", "sell", "donate"].includes(item.status);

  return `
    <div class="tile">
      ${clothingImage(item)}

      <h3>${escapeHTML(item.name)}</h3>

      <p class="small">
        ${escapeHTML(item.category)}
        · ${escapeHTML(item.color)}
      </p>

      <p class="small">
        Status:
        <strong>${escapeHTML(formatStatus(item.status))}</strong>
      </p>

      <div class="closet-actions">
        <button class="green"
          ${kept ? "disabled" : ""}
          onclick="changeClothingStatus('${item.id}', 'keep', 'closet')">
          ✓ Keep
        </button>

        <button class="red"
          ${removed ? "disabled" : ""}
          onclick="changeClothingStatus('${item.id}', 'remove', 'closet')">
          ✕ Remove
        </button>
      </div>

      <button class="muted"
        onclick="undoItemDecision('${item.id}')">
        ↶ Undo
      </button>

      <button class="muted"
        onclick="editClothing('${item.id}')">
        Edit Name
      </button>
    </div>
  `;
}
