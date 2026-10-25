# Author: Naren P
# Handles logging out (POST /api/logout).

from flask import jsonify, session


def logout():
    """Forgets who is logged in."""

    session.clear()
    return jsonify(ok=True)
