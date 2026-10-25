// Author: Bazil T
// Part of keeping, removing, and undoing clothing decisions. This file holds
// changeClothingStatus().

// Changes an item's status (keep, remove, sell, donate), remembers the old one for Undo, and
// redraws the page.
async function changeClothingStatus(id, newStatus, destination = currentPage) {
  const item = items.find(item => item.id === id);
  if (!item || item.status === newStatus) return;

  try {
    await patchItem(id, {status: newStatus});
    recordDecision(id, item.status);
    await showPage(destination);
  } catch (error) {
    showError(error);
  }
}
