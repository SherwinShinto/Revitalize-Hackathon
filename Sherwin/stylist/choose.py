# Author: Sherwin S
# Picks which item goes in each outfit slot.

from vitalwear.catalog import ROLES
from vitalwear.stylist.score_item import score_item


def choose(clothes, role, context, index):
    """Picks the item for one outfit slot (like shoes).
    Ranks every item for that slot by score, then takes the
    1st best for Look 1, 2nd best for Look 2, and 3rd best for Look 3.
    """

    candidates = [
        item for item in clothes
        if item["category"] in ROLES[role]
    ]

    candidates.sort(
        key=lambda item: (
            -score_item(item, role, context),
            item["id"]
        )
    )

    if not candidates:
        return None

    return candidates[index % len(candidates)]
