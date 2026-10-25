// Author: Bazil T
// Part of the My Closet tab. This file holds renderCloset().

// Draws the My Closet page: totals, action buttons, the category filter, and the clothing
// cards.
function renderCloset(filter = closetFilter) {
  closetFilter = filter;

  const filtered = filter === "All"
    ? items
    : items.filter(item => item.category === filter);

  const removedCount = items.filter(item =>
    ["remove", "sell", "donate"].includes(item.status)
  ).length;

  root.innerHTML = `
    <h1>My Closet</h1>
    <p>Everything you own, organized in one place.</p>

    <div class="stats">
      <div class="panel">
        <strong>${items.length}</strong>
        Total Items
      </div>

      <div class="panel">
        <strong>${statusItems("keep").length}</strong>
        Kept
      </div>

      <div class="panel">
        <strong>${removedCount}</strong>
        Removed
      </div>
    </div>

    <div class="panel">
      <div class="actions">
        <button class="green" onclick="showPage('add')">
          + Add Clothes
        </button>

        <button onclick="showPage('revitalize')">
          Revitalize ✨
        </button>

        <button class="blue" onclick="showPage('outfits')">
          ✨ Ask My Stylist
        </button>

        <button class="muted" onclick="showPage('remove')">
          Sort Removal (${statusItems("remove").length})
        </button>
      </div>

      <p class="small">
        Keep clothes you still wear. Remove clothes you
        want to sell or donate. Undo your last decision
        on any card.
      </p>

      <label>Filter by Category</label>

      <select onchange="renderCloset(this.value)">
        <option value="All">All</option>

        ${categories.map(category => `
          <option value="${category}"
            ${filter === category ? "selected" : ""}>
            ${category}
          </option>
        `).join("")}
      </select>

      <div class="grid">
        ${filtered.length
          ? filtered.map(clothingCard).join("")
          : "<p>No clothing items found.</p>"}
      </div>
    </div>
  `;
}
