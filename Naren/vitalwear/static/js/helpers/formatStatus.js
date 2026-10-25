// Author: Naren P
// A small shared helper used all over the site. This file holds formatStatus().

// Turns a status like 'remove' into friendly text like 'Awaiting Removal'.
function formatStatus(status) {
  const labels = {
    new: "Not Sorted",
    keep: "Kept",
    remove: "Awaiting Removal",
    sell: "Selling",
    donate: "Donating"
  };

  return labels[status] || status;
}
