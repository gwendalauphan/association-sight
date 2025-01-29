# app/main.py
#Import logging
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS


import sqlite3
import os

#conf logs
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

#test d'un log
logger.info("Hello World")

app = Flask(__name__)
CORS(app)  # Autorise toutes les origines


# On peut utiliser une variable d'environnement pour le chemin de la DB si besoin
DATABASE_FILE = os.environ.get("DATABASE_FILE", "data.db")

def get_db_connection():
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/count-vote", methods=["GET"])
def count_vote():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as count FROM votes")
    result = cursor.fetchone()
    conn.close()
    return jsonify({"count": result["count"]})

@app.route("/submit-vote", methods=["POST"])



if __name__ == "__main__":
    # Pour debug local :
    # from init_db import init_db
    # init_db()
    # app.run(host="0.0.0.0", port=5000, debug=True)
    pass
