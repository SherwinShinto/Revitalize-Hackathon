// Author: Bazil T
// Part of keeping, removing, and undoing clothing decisions. This file holds
// recordDecision().

// Remembers an item's old status so it can be undone later.
function recordDecision(id, previousStatus) {
  history.push({
    id,
    previousStatus
  });
}
