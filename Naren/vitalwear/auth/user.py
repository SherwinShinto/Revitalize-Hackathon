# Author: Naren P
# Finds out who is logged in.

from flask import session


def user():
    """Returns the name of whoever is logged in, or None if nobody is."""

    return session.get("user")
