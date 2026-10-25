# Author: Sherwin S
# Gets the current weather from Google for a city or location.

import os
import urllib.parse

from vitalwear.weather.fetch_json import fetch_json


def google_weather(city, lat=None, lon=None):
    """Gets the current weather from Google.
    If only a city is given, it looks up the city's coordinates first.
    Then it sorts the sky into Clear, Cloudy, Rainy, Snowy or Stormy.
    """

    key = os.getenv("GOOGLE_MAPS_API_KEY", "").strip()

    if not key:
        raise RuntimeError(
            "Google API key missing. Set GOOGLE_MAPS_API_KEY."
        )

    if lat is None or lon is None:
        params = urllib.parse.urlencode({
            "address": city,
            "key": key
        })

        geo = fetch_json(
            "https://maps.googleapis.com/maps/api/geocode/json?"
            + params
        )

        if geo.get("status") != "OK" or not geo.get("results"):
            raise RuntimeError(
                "Google Geocoding failed: " +
                geo.get("error_message", geo.get("status", "Unknown error"))
            )

        place = geo["results"][0]
        coordinates = place["geometry"]["location"]

        lat = coordinates["lat"]
        lon = coordinates["lng"]
        city = place.get("formatted_address", city)

    params = urllib.parse.urlencode({
        "key": key,
        "location.latitude": lat,
        "location.longitude": lon,
        "unitsSystem": "METRIC"
    })

    data = fetch_json(
        "https://weather.googleapis.com/v1/currentConditions:lookup?"
        + params
    )

    weather = data.get("weatherCondition") or {}
    condition_type = (weather.get("type") or "").upper()
    description = (
        weather.get("description") or {}
    ).get("text", "Unknown")

    combined = condition_type + " " + description.upper()

    if any(x in combined for x in ("THUNDER", "STORM")):
        condition = "Stormy"
    elif any(x in combined for x in (
        "SNOW", "BLIZZARD", "FLURR", "SLEET", "ICE"
    )):
        condition = "Snowy"
    elif any(x in combined for x in (
        "RAIN", "DRIZZLE", "SHOWER"
    )):
        condition = "Rainy"
    elif any(x in combined for x in (
        "CLOUD", "OVERCAST", "FOG", "HAZE"
    )):
        condition = "Cloudy"
    else:
        condition = "Clear"

    temperature = (
        data.get("temperature") or {}
    ).get("degrees")

    if temperature is None:
        raise RuntimeError("Google Weather returned no temperature.")

    return {
        "city": city,
        "temperature": temperature,
        "feels_like": (
            data.get("feelsLikeTemperature") or {}
        ).get("degrees", temperature),
        "condition": condition,
        "description": description,
        "wind": (
            (data.get("wind") or {}).get("speed") or {}
        ).get("value", 0),
        "source": "Google Weather"
    }
