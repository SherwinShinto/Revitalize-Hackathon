// Author: Bazil T
// Part of keeping, removing, and undoing clothing decisions. This file holds
// undoLastDecision().

// Undoes the most recent status change.
async function undoLastDecision() {
  const last = history[history.length - 1];

  if (!last) {
    alert("No recent clothing decision to undo.");
    return;
  }

  try {
    await patchItem(last.id, {
      status: last.previousStatus
    });

    history.pop();
    await showPage(currentPage);
  } catch (error) {
    showError(error);
  }
}
