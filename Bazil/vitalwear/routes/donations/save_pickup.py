# Author: Bazil T
# Saves a pickup plan (POST /api/pickups).

import uuid
from datetime import datetime

from flask import jsonify, request

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.database.conn import conn


def save_pickup():
    """Saves a donation pickup plan after checking the date and time are real."""

    error = auth_error()
    if error:
        return error

    data = request.get_json(silent=True) or {}
    date = str(data.get("date", ""))
    time = str(data.get("time", ""))

    try:
        datetime.strptime(date, "%Y-%m-%d")
        datetime.strptime(time, "%H:%M")
    except ValueError:
        return jsonify(error="Invalid date or time"), 400

    with conn() as db:
        db.execute("""
            INSERT INTO plans (id, user, date, time)
            VALUES (?, ?, ?, ?)
        """, (str(uuid.uuid4()), user(), date, time))

    return jsonify(ok=True)
