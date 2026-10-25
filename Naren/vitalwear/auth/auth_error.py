# Author: Naren P
# Blocks pages and data for people who aren't logged in.

from flask import jsonify

from vitalwear.auth.user import user


def auth_error():
    """Returns a 'Please log in first' error if nobody is logged in.
    Returns None if someone is, so the route can carry on.
    """

    if not user():
        return jsonify(error="Please log in first"), 401
    return None
