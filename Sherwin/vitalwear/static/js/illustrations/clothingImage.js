// Author: Sherwin S
// Part of the clothing drawings shown when an item has no photo. This file holds
// clothingImage().

// Returns the item's photo, or a drawing if it doesn't have one.
function clothingImage(item) {
  if (item.image) {
    return `
      <img src="${escapeHTML(item.image)}"
           alt="${escapeHTML(item.name)}">
    `;
  }

  return `
    <img src="${clothingIllustration(item)}"
         alt="${escapeHTML(item.color)} ${escapeHTML(item.category)}">
  `;
}
