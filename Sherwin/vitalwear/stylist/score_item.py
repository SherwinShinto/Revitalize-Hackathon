# Author: Sherwin S
# Scores how well a clothing item fits the user's plans, mood and weather.

def score_item(item, role, context):
    """Gives one item points for how well it fits right now:
    colours the user asked for, the occasion, their mood, and the temperature.
    Higher score = better fit.
    """

    category = item["category"]
    color = (item["color"] or "").lower()
    message = context["message"]
    mood = context["mood"]
    temp = context["temperature"]

    score = 10

    for requested_color in [
        "red", "blue", "black", "white", "green",
        "brown", "grey", "gray", "pink", "yellow"
    ]:
        if requested_color in message and color == requested_color:
            score += 40

    if "flames" in message and color == "red":
        score += 40

    if any(x in message for x in (
        "interview", "office", "formal", "meeting"
    )):
        if category in {"Dress Shirt", "Chinos"}:
            score += 35

    if any(x in message for x in (
        "gym", "workout", "running", "exercise"
    )):
        if category in {
            "T-Shirt", "Pants", "Shorts", "Sneakers"
        }:
            score += 35

    if mood == "Comfortable":
        if category in {
            "Hoodie", "Crewneck", "Pants", "Sneakers"
        }:
            score += 20

    if mood == "Professional":
        if category in {"Dress Shirt", "Chinos"}:
            score += 25

    if mood == "Sporty":
        if category in {
            "T-Shirt", "Pants", "Shorts", "Sneakers"
        }:
            score += 25

    if mood == "Stylish":
        if category in {"Crewneck", "Jeans", "Boots"}:
            score += 15

    if temp <= 0:
        if category in {
            "Heavy Jacket", "Boots", "Hoodie", "Crewneck"
        }:
            score += 35

    if temp <= 5 and category in {"Shorts", "Skirt"}:
        score -= 60

    if temp >= 23:
        if category in {"T-Shirt", "Shorts", "Sneakers"}:
            score += 30
        if category in {"Heavy Jacket", "Boots"}:
            score -= 30

    if context["rainy"] and category == "Rain Jacket":
        score += 50

    if context["snowy"]:
        if category in {"Heavy Jacket", "Boots"}:
            score += 45

    return score
