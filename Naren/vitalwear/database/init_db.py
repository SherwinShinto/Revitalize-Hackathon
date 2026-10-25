# Author: Naren P
# Creates the database tables the first time the site runs.

from vitalwear.database.conn import conn


def init_db():
    """Makes the items, plans and listings tables if they don't exist yet.
    Also renames old 'Joggers' items to 'Pants'.
    """

    with conn() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS items (
                id TEXT PRIMARY KEY,
                user TEXT,
                name TEXT,
                category TEXT,
                color TEXT,
                image TEXT,
                status TEXT DEFAULT 'new',
                price REAL DEFAULT 15,
                description TEXT DEFAULT ''
            )
        """)

        db.execute("""
            CREATE TABLE IF NOT EXISTS plans (
                id TEXT PRIMARY KEY,
                user TEXT,
                date TEXT,
                time TEXT
            )
        """)

        db.execute("""
            CREATE TABLE IF NOT EXISTS listings (
                id TEXT PRIMARY KEY,
                user TEXT,
                item_id TEXT,
                platforms TEXT,
                created_at TEXT
            )
        """)

        # Update previously saved joggers without deleting clothes.
        db.execute("""
            UPDATE items
            SET category='Pants',
                name=REPLACE(name, 'Joggers', 'Pants')
            WHERE category='Joggers'
        """)
