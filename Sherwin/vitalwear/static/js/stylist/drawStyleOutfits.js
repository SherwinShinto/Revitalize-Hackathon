// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds drawStyleOutfits().

// Draws the 3 suggested outfits: one row per slot, each with a Swap button.
function drawStyleOutfits() {
  const target = el("styleResults");
  if (!target) return;

  target.innerHTML = styleOutfits.map((outfit, index) => `
    <div class="suggested-outfit">
      <div class="outfit-header">
        <h3>
          Look ${index + 1}: ${escapeHTML(outfit.title)}
        </h3>
        <span>✨ From Your Closet</span>
      </div>

      <div class="outfit-breakdown">
        ${outfitRoles.map(([role, emoji, label]) => {
          const item = outfit.pieces[role];

          return `
            <div class="outfit-row">
              <div class="outfit-emoji">
                ${item
                  ? `<img src="${item.image
                      ? escapeHTML(item.image)
                      : clothingIllustration(item)}"
                     alt="${escapeHTML(item.name)}">`
                  : emoji}
              </div>

              <div class="outfit-info">
                <span class="small">${label}</span>

                <strong>
                  ${item
                    ? escapeHTML(item.name)
                    : "Not needed / unavailable"}
                </strong>

                ${item ? `
                  <span class="small">
                    ${escapeHTML(item.color)}
                    · ${escapeHTML(item.category)}
                  </span>
                ` : ""}
              </div>

              <button class="swap-btn"
                onclick="swapStylePiece(${index}, '${role}')">
                ↻ Swap
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `).join("");
}
