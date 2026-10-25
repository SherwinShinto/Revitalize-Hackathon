# Author: Bazil T
# Adds a new clothing item (POST /api/items).

import uuid
from pathlib import Path

from flask import jsonify, request
from werkzeug.utils import secure_filename

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.catalog import CATEGORIES
from vitalwear.config import UPLOAD
from vitalwear.database.conn import conn


def add_item():
    """Saves a new item from the Add form, with an optional photo (jpg, png, webp or
    gif only).
    """

    error = auth_error()
    if error:
        return error

    name = request.form.get("name", "").strip()[:120]
    category = request.form.get("category", "T-Shirt").strip()
    color = request.form.get("color", "Unknown").strip()[:60]

    if not name or category not in CATEGORIES:
        return jsonify(error="Valid name and category required"), 400

    image = ""
    file = request.files.get("photo")

    if file and file.filename:
        extension = Path(
            secure_filename(file.filename)
        ).suffix.lower()

        if (
            extension not in {".jpg", ".jpeg", ".png", ".webp", ".gif"}
            or file.mimetype not in {
                "image/jpeg", "image/png", "image/webp", "image/gif"
            }
        ):
            return jsonify(error="Unsupported image type"), 400

        filename = uuid.uuid4().hex + extension
        file.save(UPLOAD / filename)
        image = "/uploads/" + filename

    item_id = str(uuid.uuid4())

    with conn() as db:
        db.execute("""
            INSERT INTO items
            (id, user, name, category, color, image)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (item_id, user(), name, category, color, image))

    return jsonify(id=item_id), 201
