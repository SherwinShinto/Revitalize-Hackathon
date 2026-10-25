// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds swapStylePiece().

// Swaps one piece of an outfit for the next kept item of the same type.
function swapStylePiece(outfitIndex, role) {
  const options = items.filter(item =>
    item.status === "keep" &&
    outfitCategories[role].includes(item.category)
  );

  if (!options.length) {
    alert("No kept items in this category.");
    return;
  }

  const current = styleOutfits[outfitIndex].pieces[role];

  if (options.length === 1 && current?.id === options[0].id) {
    alert("Add more clothes to get different options.");
    return;
  }

  const position = options.findIndex(item =>
    current && item.id === current.id
  );

  styleOutfits[outfitIndex].pieces[role] =
    options[(position + 1) % options.length];

  drawStyleOutfits();
}
