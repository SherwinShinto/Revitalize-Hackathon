// Author: Naren P
// A small shared helper used all over the site. This file holds statusItems().

// Returns only the items with a given status, like 'keep' or 'sell'.
function statusItems(status) {
  return items.filter(item => item.status === status);
}
