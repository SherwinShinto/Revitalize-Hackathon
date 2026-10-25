# Author: Naren P
# Finds every CSS and JavaScript file the page needs to load, across all three folders.

from vitalwear.routes.pages.static_folders import static_folders

# Load order matters only for these: state and constants first, start.js last.
# Every other JS file just defines functions, so its order doesn't matter.
JS_FIRST = ["js/core/state.js", "js/core/constants.js"]
JS_LAST = ["js/start.js"]

CSS_ORDER = ["base", "closet", "selling", "stylist", "responsive"]


def frontend_files():
    """Lists every CSS and JS file in every static folder, in the order the page should load them."""
    css_found, js_found = set(), set()
    for folder in static_folders():
        css_found |= {p.relative_to(folder).as_posix() for p in folder.rglob("*.css")}
        js_found |= {p.relative_to(folder).as_posix() for p in folder.rglob("*.js")}

    css = [f"css/{name}.css" for name in CSS_ORDER if f"css/{name}.css" in css_found]
    css += sorted(p for p in css_found if p not in css)

    middle = sorted(p for p in js_found if p not in JS_FIRST and p not in JS_LAST)
    return css, JS_FIRST + middle + JS_LAST
