// Author: Bazil T
// Part of the Revitalize tab (swipe through unsorted clothes). This file holds
// renderRevitalize().

// Shows unsorted clothes one at a time to swipe Keep or Remove, or a done screen when none
// are left.
function renderRevitalize() {
  const pending = statusItems("new");
  const item = pending[0];

  if (!item) {
    root.innerHTML = `
      <h1>Closet Revitalized! 🎉</h1>

      <div class="panel">
        <p>You've sorted all pending clothing.</p>

        <div class="actions">
          <button class="green" onclick="showPage('closet')">
            View My Closet
          </button>

          <button class="blue" onclick="showPage('outfits')">
            See My Outfits
          </button>

          <button class="muted" onclick="undoLastDecision()">
            ↶ Undo Last Decision
          </button>
        </div>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <h1>Revitalize Your Closet</h1>

    <p>Swipe right to keep, left to remove.</p>
    <p>${pending.length} items remaining</p>

    <div class="swipe" id="clothingSwipe">
      ${clothingImage(item)}

      <h2>${escapeHTML(item.name)}</h2>

      <p>
        ${escapeHTML(item.category)}
        · ${escapeHTML(item.color)}
      </p>

      <div class="actions">
        <button class="red"
          onclick="changeClothingStatus('${item.id}', 'remove')">
          ✕ Remove
        </button>

        <button class="green"
          onclick="changeClothingStatus('${item.id}', 'keep')">
          ♥ Keep
        </button>
      </div>
    </div>

    <button class="muted" onclick="undoLastDecision()">
      ↶ Undo Last Decision
    </button>
  `;

  attachSwipe(
    "clothingSwipe",
    () => changeClothingStatus(item.id, "keep"),
    () => changeClothingStatus(item.id, "remove")
  );
}
