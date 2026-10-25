// Author: Sherwin S
// Part of the clothing drawings shown when an item has no photo. This file holds
// clothingColor().

// Turns a colour name like 'Red' into a colour code for the drawings.
function clothingColor(color) {
  const colors = {
    red: "#d63838",
    blue: "#3278cf",
    black: "#292d36",
    white: "#f4f5f6",
    grey: "#858b97",
    gray: "#858b97",
    brown: "#926039",
    green: "#32875c",
    yellow: "#e9b834",
    pink: "#e990b4",
    purple: "#865ac0",
    orange: "#e98132",
    beige: "#c9af87",
    navy: "#243d69"
  };

  return colors[String(color).toLowerCase()] || "#7287a5";
}
