# Author: Bazil T
# Loads the sample closet (POST /api/demo).

import uuid

from flask import jsonify

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.database.conn import conn


def demo():
    """Replaces the user's closet with 9 sample clothes, all marked Keep."""

    error = auth_error()
    if error:
        return error

    samples = [
        ("Red Crewneck", "Crewneck", "Red"),
        ("Black Jeans", "Jeans", "Black"),
        ("White Sneakers", "Sneakers", "White"),
        ("Blue Hoodie", "Hoodie", "Blue"),
        ("Black Puffer", "Heavy Jacket", "Black"),
        ("White T-Shirt", "T-Shirt", "White"),
        ("Brown Boots", "Boots", "Brown"),
        ("Grey Pants", "Pants", "Grey"),
        ("Red T-Shirt", "T-Shirt", "Red")
    ]

    with conn() as db:
        db.execute("DELETE FROM items WHERE user=?", (user(),))

        for name, category, color in samples:
            db.execute("""
                INSERT INTO items
                (id, user, name, category, color, image, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                str(uuid.uuid4()),
                user(), name, category, color, "", "keep"
            ))

    return jsonify(ok=True)
