# app/init_db.py
import os
import sqlite3

DATABASE_FILE = os.environ.get("DATABASE_FILE", "data.db")

def init_db():
    conn = sqlite3.connect(DATABASE_FILE)
    c = conn.cursor()

    # Création d'une table "users" avec un username unique et un vote éventuellement null
    c.execute('''
        CREATE TABLE IF NOT EXISTS votes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            vote TEXT,
            email TEXT,
            petitMot TEXT
        )
    ''')

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized.")
