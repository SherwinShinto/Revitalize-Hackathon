// Author: Bazil T
// Part of keeping, removing, and undoing clothing decisions. This file holds
// undoItemDecision().

// Undoes the most recent status change for one specific item.
async function undoItemDecision(id) {
  const index = history.findLastIndex(entry => entry.id === id);

  if (index === -1) {
    alert("No recent decision to undo for this item.");
    return;
  }

  const entry = history[index];

  try {
    await patchItem(id, {
      status: entry.previousStatus
    });

    history.splice(index, 1);
    await showPage(currentPage);
  } catch (error) {
    showError(error);
  }
}
