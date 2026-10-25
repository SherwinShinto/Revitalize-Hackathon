# Author: Bazil T
# Sends the user's saved listings (GET /api/listings).

import json

from flask import jsonify

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.database.conn import conn


def get_listings():
    """Returns the user's saved listings with each item's name, price and description."""

    error = auth_error()
    if error:
        return error

    with conn() as db:
        rows = db.execute("""
            SELECT listings.*, items.name,
                   items.price, items.description
            FROM listings
            JOIN items ON items.id=listings.item_id
            WHERE listings.user=?
            ORDER BY listings.created_at DESC
        """, (user(),)).fetchall()

    return jsonify([
        {**dict(row), "platforms": json.loads(row["platforms"])}
        for row in rows
    ])
