# Author: Naren P
# Tells the page who is logged in (GET /api/me).

from flask import jsonify

from vitalwear.auth.user import user


def me():
    """Tells the page who is logged in (or null if nobody is)."""

    return jsonify(user=user())
