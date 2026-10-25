# Author: Bazil T
# Edits a clothing item (PATCH /api/items/<id>).

from flask import jsonify, request

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.catalog import CATEGORIES, STATUSES
from vitalwear.database.conn import conn


def update_item(item_id):
    """Changes one item's name, category, colour, status, price or description.
    Checks every value is valid before saving.
    """

    error = auth_error()
    if error:
        return error

    data = request.get_json(silent=True) or {}

    allowed = {
        "name", "category", "color",
        "status", "price", "description"
    }

    fields = {
        key: value for key, value in data.items()
        if key in allowed
    }

    if not fields:
        return jsonify(error="No changes supplied"), 400

    if "status" in fields:
        if fields["status"] not in STATUSES:
            return jsonify(error="Invalid status"), 400

    if "category" in fields:
        if fields["category"] not in CATEGORIES:
            return jsonify(error="Invalid category"), 400

    if "price" in fields:
        try:
            fields["price"] = float(fields["price"])
            if not 0 <= fields["price"] <= 100000:
                raise ValueError()
        except (TypeError, ValueError):
            return jsonify(error="Invalid price"), 400

    if "name" in fields:
        fields["name"] = str(fields["name"]).strip()[:120]

    if "description" in fields:
        fields["description"] = str(fields["description"])[:1000]

    sql = ", ".join(f"{key}=?" for key in fields)

    with conn() as db:
        result = db.execute(
            f"UPDATE items SET {sql} WHERE id=? AND user=?",
            (*fields.values(), item_id, user())
        )

        if not result.rowcount:
            return jsonify(error="Item not found"), 404

    return jsonify(ok=True)
