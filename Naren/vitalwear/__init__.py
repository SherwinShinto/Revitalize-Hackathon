# Author: Naren P
# Builds the Flask app: loads the settings, connects every URL, and sets up the database.

from pkgutil import extend_path

from flask import Flask

# vitalwear is split across the Naren, Sherwin and Bazil folders.
# This line joins all three into one package (run.py puts them on the path).
__path__ = extend_path(__path__, __name__)

from vitalwear import config
from vitalwear.database.init_db import init_db
from vitalwear.routes import register_routes


def create_app():
    """Creates the website, plugs in every URL, makes sure the database tables exist,
    and returns the app.
    """

    # Static files live in all three folders, so routes/pages/static_file.py serves them
    # instead of Flask's built-in static folder.
    app = Flask(__name__, static_folder=None)
    app.secret_key = config.SECRET_KEY
    app.config["MAX_CONTENT_LENGTH"] = config.MAX_UPLOAD_BYTES

    register_routes(app)
    init_db()
    return app
