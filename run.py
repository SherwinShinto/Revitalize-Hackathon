# Authors: Naren P, Sherwin S, Bazil T
# Starts the VitalWear website. Run `python run.py`, then open http://127.0.0.1:5000
#
# The code is split across three folders (Naren, Sherwin, Bazil). Each one holds part of
# the same `vitalwear` package, so this file tells Python to look in all three.

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
TEAM_FOLDERS = ["Naren", "Sherwin", "Bazil"]

# Naren goes first because his folder has the main vitalwear/__init__.py
for folder in reversed(TEAM_FOLDERS):
    sys.path.insert(0, str(HERE / folder))

from vitalwear import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
