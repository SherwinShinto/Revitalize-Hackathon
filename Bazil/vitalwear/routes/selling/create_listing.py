# Author: Bazil T
# Saves a demo listing (POST /api/listings).

import json
import uuid
from datetime import datetime

from flask import jsonify, request

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.catalog import SELL_PLATFORMS
from vitalwear.database.conn import conn


def create_listing():
    """Saves a demo listing for an item marked Sell on the chosen platforms.
    Nothing is actually posted online.
    """

    error = auth_error()
    if error:
        return error

    data = request.get_json(silent=True) or {}
    item_id = str(data.get("item_id", ""))
    platforms = data.get("platforms", [])

    if (
        not isinstance(platforms, list)
        or not platforms
        or any(platform not in SELL_PLATFORMS for platform in platforms)
    ):
        return jsonify(error="Select valid platforms"), 400

    with conn() as db:
        item = db.execute("""
            SELECT id FROM items
            WHERE id=? AND user=? AND status='sell'
        """, (item_id, user())).fetchone()

        if not item:
            return jsonify(error="Item is not marked Sell"), 400

        db.execute("""
            INSERT INTO listings
            (id, user, item_id, platforms, created_at)
            VALUES (?, ?, ?, ?, ?)
        """, (
            str(uuid.uuid4()), user(), item_id,
            json.dumps(platforms), datetime.now().isoformat()
        ))

    return jsonify(ok=True)
