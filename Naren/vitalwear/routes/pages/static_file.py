# Author: Naren P
# Sends CSS and JS files to the browser, whichever teammate's folder they are in (GET /static/<file>).

from flask import abort, send_from_directory

from vitalwear.routes.pages.static_folders import static_folders


def static_file(filename):
    """Looks for the file in each static folder and sends the first match. 404 if none has it."""
    for folder in static_folders():
        if (folder / filename).is_file():
            return send_from_directory(folder, filename)
    abort(404)
