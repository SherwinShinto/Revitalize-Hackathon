# Author: Naren P
# Settings in one place: the brand name, where the database and photos are saved, and
# upload limits.

import os
from pathlib import Path

BRAND = "VitalWear"

# Main VitalWear folder (the one that holds run.py, two levels above Naren/vitalwear)
BASE = Path(__file__).resolve().parent.parent.parent

DATA = BASE / "data"
DB = DATA / "closet.db"
UPLOAD = DATA / "uploads"
UPLOAD.mkdir(parents=True, exist_ok=True)

SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "vitalwear-local-demo-only")
MAX_UPLOAD_BYTES = 8 * 1024 * 1024

USER_AGENT = "VitalWearHackathon/1.0"
