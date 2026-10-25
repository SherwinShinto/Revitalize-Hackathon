// Author: Naren P
// Fixed lists: clothing categories, the nav tabs, and outfit slots. Loaded second.

const categories = [
  "T-Shirt", "Dress Shirt", "Polo", "Hoodie",
  "Crewneck", "Jeans", "Chinos", "Shorts",
  "Pants", "Dress", "Skirt", "Sneakers",
  "Boots", "Rain Jacket", "Heavy Jacket"
];

const pages = [
  ["closet", "My Closet"],
  ["add", "+ Add Clothes"],
  ["revitalize", "Revitalize"],
  ["outfits", "Outfits"],
  ["remove", "Sort Removal"],
  ["sell", "Sell"],
  ["donate", "Donate"],
  ["account", "Account"]
];

const outfitRoles = [
  ["base", "👕", "Base Shirt"],
  ["layer", "🧶", "Middle Layer"],
  ["bottom", "👖", "Pants / Bottom"],
  ["jacket", "🧥", "Outer Jacket"],
  ["shoes", "👟", "Shoes"]
];

const outfitCategories = {
  base: ["T-Shirt", "Dress Shirt", "Polo", "Dress"],
  layer: ["Hoodie", "Crewneck"],
  bottom: ["Jeans", "Chinos", "Shorts", "Pants", "Skirt"],
  jacket: ["Rain Jacket", "Heavy Jacket"],
  shoes: ["Sneakers", "Boots"]
};
