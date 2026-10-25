# Author: Naren P
# Fixed lists the whole app shares: clothing categories, outfit slots, item statuses, and
# selling platforms.

CATEGORIES = [
    "T-Shirt", "Dress Shirt", "Polo", "Hoodie", "Crewneck",
    "Jeans", "Chinos", "Shorts", "Pants", "Dress", "Skirt",
    "Sneakers", "Boots", "Rain Jacket", "Heavy Jacket"
]

ROLES = {
    "base": {"T-Shirt", "Dress Shirt", "Polo", "Dress"},
    "layer": {"Hoodie", "Crewneck"},
    "bottom": {"Jeans", "Chinos", "Shorts", "Pants", "Skirt"},
    "jacket": {"Rain Jacket", "Heavy Jacket"},
    "shoes": {"Sneakers", "Boots"}
}

STATUSES = {"new", "keep", "remove", "sell", "donate"}

SELL_PLATFORMS = {"Depop", "eBay", "Poshmark"}
