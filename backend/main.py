# app/main.py

from flask import Flask, request, jsonify
import sqlite3
import os

app = Flask(__name__)

# On peut utiliser une variable d'environnement pour le chemin de la DB si besoin
DATABASE_FILE = os.environ.get("DATABASE_FILE", "data.db")

def get_db_connection():
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/connected", methods=["POST"])
def connected():
    data = request.get_json()
    if not data or "username" not in data:
        return jsonify({"error": "Username is required"}), 400
    
    username = data["username"].strip()
    if not username:
        return jsonify({"error": "Username cannot be empty"}), 400

    conn = get_db_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = c.fetchone()
    conn.close()

    if user is None:
        return jsonify({"error": f"User '{username}' not found"}), 404
    else:
        return jsonify({"message": f"User '{username}' is connected"}), 200

@app.route("/create", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data or "username" not in data:
        return jsonify({"error": "Username is required"}), 400
    
    username = data["username"].strip()
    if not username:
        return jsonify({"error": "Username cannot be empty"}), 400

    conn = get_db_connection()
    c = conn.cursor()
    
    # Vérifier si l'utilisateur existe déjà
    c.execute("SELECT * FROM users WHERE username = ?", (username,))
    existing_user = c.fetchone()
    if existing_user:
        conn.close()
        return jsonify({"error": f"User '{username}' already exists"}), 409
    
    # Insérer l'utilisateur
    c.execute("INSERT INTO users (username, vote) VALUES (?, ?)", (username, None))
    conn.commit()
    conn.close()

    return jsonify({"message": f"User '{username}' created successfully"}), 201

@app.route("/vote", methods=["POST"])
def vote():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request data is required"}), 400
    
    username = data.get("username", "").strip()
    asso = data.get("asso", "").strip()

    if not username or not asso:
        return jsonify({"error": "Both username and asso are required"}), 400

    conn = get_db_connection()
    c = conn.cursor()
    # Vérifier si l'utilisateur existe
    c.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = c.fetchone()
    if not user:
        conn.close()
        return jsonify({"error": f"User '{username}' not found"}), 404

    # Vérifier s'il a déjà voté
    if user["vote"] is not None:
        conn.close()
        return jsonify({"error": f"User '{username}' has already voted"}), 409
    
    # Mettre à jour son vote
    c.execute("UPDATE users SET vote = ? WHERE username = ?", (asso, username))
    conn.commit()
    conn.close()

    return jsonify({"message": f"User '{username}' voted for '{asso}'"}), 200

@app.route("/users", methods=["GET"])
def get_users():
    conn = get_db_connection()
    c = conn.cursor()

    # Récupérer tous les utilisateurs ayant voté
    c.execute("SELECT username FROM users WHERE vote IS NOT NULL")
    rows = c.fetchall()
    conn.close()

    users = [row[0] for row in rows]  # row[0] = username dans ce cas
    return jsonify({"users": users}), 200


if __name__ == "__main__":
    # Pour debug local :
    # from init_db import init_db
    # init_db()
    # app.run(host="0.0.0.0", port=5000, debug=True)
    pass
