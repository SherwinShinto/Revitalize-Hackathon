# Author: Bazil T
# Sends the user's clothes to the page (GET /api/items).

from flask import jsonify

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.database.conn import conn


def get_items():
    """Returns all of the logged-in user's clothes, newest first."""

    error = auth_error()
    if error:
        return error

    with conn() as db:
        rows = db.execute(
            "SELECT * FROM items WHERE user=? ORDER BY rowid DESC",
            (user(),)
        ).fetchall()

    return jsonify([dict(row) for row in rows])
