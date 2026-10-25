# Authors: Naren P, Sherwin S, Bazil T

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
