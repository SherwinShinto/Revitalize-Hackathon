# Author: Sherwin S
# Downloads data from the internet (used for Google's weather and map services).

import json
import ssl
import urllib.error
import urllib.request

from flask import current_app

from vitalwear.config import USER_AGENT

try:
    import certifi
except ImportError:
    certifi = None


def fetch_json(url):
    """Downloads a web address and returns its JSON.
    Gives a clear error if Google rejects the request (bad key, billing off, etc.).
    """

    req = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT}
    )

    if certifi:
        context = ssl.create_default_context(cafile=certifi.where())
    else:
        context = ssl.create_default_context()

    try:
        with urllib.request.urlopen(
            req, timeout=12, context=context
        ) as response:
            return json.load(response)

    except urllib.error.HTTPError as error:
        detail = error.read(500).decode("utf-8", "replace")
        current_app.logger.warning("Google API HTTP %s: %s", error.code, detail)
        raise RuntimeError(
            f"Google API returned HTTP {error.code}. "
            "Check your API key, enabled APIs, and billing."
        ) from error
