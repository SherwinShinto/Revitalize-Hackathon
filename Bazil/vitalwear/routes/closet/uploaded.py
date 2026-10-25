# Author: Bazil T
# Shows saved clothing photos (GET /uploads/<file>).

from flask import send_from_directory

from vitalwear.config import UPLOAD


def uploaded(filename):
    """Sends back one saved clothing photo."""

    return send_from_directory(UPLOAD, filename)
