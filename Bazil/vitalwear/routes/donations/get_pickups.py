# Author: Bazil T
# Sends the user's pickup plans (GET /api/pickups).

from flask import jsonify

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.database.conn import conn


def get_pickups():
    """Returns the user's pickup plans, soonest first."""

    error = auth_error()
    if error:
        return error

    with conn() as db:
        rows = db.execute("""
            SELECT * FROM plans
            WHERE user=?
            ORDER BY date, time
        """, (user(),)).fetchall()

    return jsonify([dict(row) for row in rows])
