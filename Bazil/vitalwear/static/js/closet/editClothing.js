// Author: Bazil T
// Part of the My Closet tab. This file holds editClothing().

// Asks for a new name for an item and saves it.
async function editClothing(id) {
  const item = items.find(item => item.id === id);
  if (!item) return;

  const name = prompt("Rename clothing:", item.name);

  if (name === null || !name.trim()) return;

  try {
    await patchItem(id, {name: name.trim()});
    await showPage("closet");
  } catch (error) {
    showError(error);
  }
}
