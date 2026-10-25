# Author: Sherwin S
# Handles outfit requests from the stylist chat (POST /api/style-chat).

from flask import jsonify, request

from vitalwear.auth.auth_error import auth_error
from vitalwear.auth.user import user
from vitalwear.catalog import ROLES
from vitalwear.database.conn import conn
from vitalwear.stylist.choose import choose


def style_chat():
    """Takes the user's plans, mood and weather, builds 3 outfits from their kept
    clothes,
    and writes a short advice message to go with them.
    """

    error = auth_error()
    if error:
        return error

    data = request.get_json(silent=True) or {}

    message = str(data.get("message", "")).strip()[:1000]
    mood = str(data.get("mood", "Comfortable"))[:40]
    condition = str(data.get("condition", "Clear"))

    if not message:
        return jsonify(error="Describe your plans first"), 400

    try:
        temperature = float(data.get("temperature", 10))
        if not -70 <= temperature <= 60:
            raise ValueError()
    except (TypeError, ValueError):
        return jsonify(error="Invalid temperature"), 400

    with conn() as db:
        clothes = [
            dict(row) for row in db.execute("""
                SELECT * FROM items
                WHERE user=? AND status='keep'
            """, (user(),)).fetchall()
        ]

    if not clothes:
        return jsonify(
            error="Mark some clothes as Keep first."
        ), 400

    context = {
        "message": message.lower(),
        "mood": mood,
        "temperature": temperature,
        "rainy": condition in {"Rainy", "Stormy"},
        "snowy": condition == "Snowy"
    }

    results = []

    for index, title in enumerate([
        "Best Match",
        "Alternative Look",
        "Another Way to Style It"
    ]):
        pieces = {}

        for role in ROLES:
            needed = True

            if role == "layer":
                needed = temperature < 15

            if role == "jacket":
                needed = (
                    temperature < 10
                    or context["rainy"]
                    or context["snowy"]
                )

            pieces[role] = (
                choose(clothes, role, context, index)
                if needed else None
            )

        results.append({
            "title": title,
            "pieces": pieces
        })

    advice = []

    if temperature <= 0:
        advice.append("It's freezing. Wear warm layers and boots.")
    elif temperature < 12:
        advice.append("It's chilly. Add a middle layer.")
    elif temperature >= 23:
        advice.append("It's warm. Choose lightweight clothing.")
    else:
        advice.append("The weather is mild. Dress comfortably.")

    if context["rainy"]:
        advice.append("Consider waterproof outerwear.")

    if context["snowy"]:
        advice.append("Choose warm footwear with traction.")

    if "flames" in context["message"]:
        advice.append("Red and black work well for a Flames game.")

    missing = []

    for role, label in [
        ("base", "shirt"),
        ("bottom", "bottoms"),
        ("shoes", "shoes")
    ]:
        if results[0]["pieces"][role] is None:
            missing.append(label)

    if missing:
        advice.append(
            "Your kept closet is missing " + ", ".join(missing) + "."
        )

    return jsonify({
        "reply": " ".join(advice),
        "outfits": results,
        "weather": {
            "temperature": temperature,
            "condition": condition
        }
    })
