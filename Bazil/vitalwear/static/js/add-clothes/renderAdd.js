// Author: Bazil T
// Part of the + Add Clothes tab. This file holds renderAdd().

// Draws the Add Clothing form.
function renderAdd() {
  root.innerHTML = `
    <h1>Add Clothing</h1>

    <div class="panel">
      <form id="addClothingForm">
        <label>Clothing Photo (Optional)</label>
        <input type="file" name="photo" accept="image/*">

        <label>Item Name</label>
        <input name="name" required
          placeholder="e.g. Red Hoodie">

        <label>Category</label>
        <select name="category">
          ${categories.map(category => `
            <option>${category}</option>
          `).join("")}
        </select>

        <label>Colour</label>
        <input name="color" required
          placeholder="e.g. Red">

        <button class="green" type="submit">
          Save Clothing
        </button>
      </form>
    </div>
  `;

  el("addClothingForm").addEventListener(
    "submit", addClothing
  );
}
