# Author: Naren P
# Opens a connection to the closet database.

import sqlite3

from vitalwear.config import DB


def conn():
    """Opens closet.db. Rows come back like dictionaries, so you can write row['name']."""

    db = sqlite3.connect(DB)
    db.row_factory = sqlite3.Row
    return db
