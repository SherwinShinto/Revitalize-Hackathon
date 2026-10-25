# Author: Naren P
# The master list of every URL and the function that answers it.
# To add a new URL: write its function in its own file, import it here, and add one line
# to ROUTES.

from pkgutil import extend_path

# Route files are split across the Naren, Sherwin and Bazil folders. Join them into one package.
__path__ = extend_path(__path__, __name__)

from vitalwear.routes.pages.home import home
from vitalwear.routes.pages.static_file import static_file

from vitalwear.routes.account.login import login
from vitalwear.routes.account.me import me
from vitalwear.routes.account.logout import logout

from vitalwear.routes.closet.get_items import get_items
from vitalwear.routes.closet.demo import demo
from vitalwear.routes.closet.add_item import add_item
from vitalwear.routes.closet.update_item import update_item
from vitalwear.routes.closet.uploaded import uploaded

from vitalwear.routes.donations.save_pickup import save_pickup
from vitalwear.routes.donations.get_pickups import get_pickups

from vitalwear.routes.selling.create_listing import create_listing
from vitalwear.routes.selling.get_listings import get_listings

from vitalwear.routes.stylist.style_weather import style_weather
from vitalwear.routes.stylist.style_chat import style_chat

ROUTES = [
    # (URL, method, function)
    ("/", "GET", home),
    ("/static/<path:filename>", "GET", static_file),

    ("/api/login", "POST", login),
    ("/api/me", "GET", me),
    ("/api/logout", "POST", logout),

    ("/api/items", "GET", get_items),
    ("/api/demo", "POST", demo),
    ("/api/items", "POST", add_item),
    ("/api/items/<item_id>", "PATCH", update_item),
    ("/uploads/<path:filename>", "GET", uploaded),

    ("/api/pickups", "POST", save_pickup),
    ("/api/pickups", "GET", get_pickups),

    ("/api/listings", "POST", create_listing),
    ("/api/listings", "GET", get_listings),

    ("/api/style-weather", "GET", style_weather),
    ("/api/style-chat", "POST", style_chat),
]


def register_routes(app):
    """Connects every URL in ROUTES to its function."""

    for url, method, view in ROUTES:
        # The static route keeps the name "static" so url_for('static', ...) still works.
        endpoint = "static" if view is static_file else None
        app.add_url_rule(url, endpoint=endpoint, view_func=view, methods=[method])
