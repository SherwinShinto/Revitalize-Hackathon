# Author: Naren P
# Finds the static folder (CSS and JS) inside each teammate's part of the code.

from pathlib import Path

import vitalwear


def static_folders():
    """Returns the vitalwear/static folder from Naren, Sherwin and Bazil (the ones that exist)."""
    folders = [Path(part) / "static" for part in vitalwear.__path__]
    return [folder for folder in folders if folder.is_dir()]
