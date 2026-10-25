# Author: Naren P
# Sends the main web page.

from flask import render_template

from vitalwear.config import BRAND
from vitalwear.routes.pages.frontend_files import frontend_files


def home():
    """Sends the main page, along with the brand name and every CSS and JS file it
    should load.
    """

    css_files, js_files = frontend_files()
    return render_template(
        "index.html",
        brand=BRAND,
        css_files=css_files,
        js_files=js_files
    )
