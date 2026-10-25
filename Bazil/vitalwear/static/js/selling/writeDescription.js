// Author: Bazil T
// Part of the Sell tab. This file holds writeDescription().

// Fills in a simple listing description from the item's colour and category.
function writeDescription(id) {
  const item = items.find(item => item.id === id);
  if (!item) return;

  el(`description-${id}`).value =
    `${item.color} ${item.category}. ` +
    "Pre-owned clothing item. Contact the seller " +
    "for measurements and condition details.";
}
