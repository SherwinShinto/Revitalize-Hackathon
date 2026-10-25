# Author: Naren P
# Handles logging in (POST /api/login).

from flask import jsonify, request, session


def login():
    """Saves the typed name as the logged-in user. Errors if the name is empty."""

    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()[:100]

    if not name:
        return jsonify(error="Enter a name"), 400

    session["user"] = name
    return jsonify(user=name)
