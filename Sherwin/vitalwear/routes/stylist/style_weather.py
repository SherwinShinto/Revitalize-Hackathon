# Author: Sherwin S
# Handles live weather requests (GET /api/style-weather).

from flask import current_app, jsonify, request

from vitalwear.auth.auth_error import auth_error
from vitalwear.weather.google_weather import google_weather


def style_weather():
    """Checks the city or coordinates the page sent, then returns the live weather."""

    error = auth_error()
    if error:
        return error

    city = request.args.get("city", "Calgary").strip()[:100]

    try:
        lat = request.args.get("lat", type=float)
        lon = request.args.get("lon", type=float)

        if (lat is None) != (lon is None):
            return jsonify(error="Both coordinates required"), 400

        if lat is not None:
            if not (-90 <= lat <= 90 and -180 <= lon <= 180):
                return jsonify(error="Invalid coordinates"), 400

        weather = google_weather(city, lat, lon)

        if lat is not None:
            weather["city"] = "Your location"

        return jsonify(weather)

    except Exception as error:
        current_app.logger.warning("Weather error: %s", error)
        return jsonify(error=str(error)), 503
