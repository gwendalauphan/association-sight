# app/Dockerfile

# 1) Choix d'une image de base Python
FROM python:3.10-slim

# 2) Définition du répertoire de travail dans le conteneur
WORKDIR /app

ENV FLASK_APP=main.py

# 3) Copier les fichiers nécessaires
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY init_db.py init_db.py
COPY main.py main.py

# 4) Exposer le port Flask (optionnel pour la documentation, dépendra de votre config)
EXPOSE 5000

# 5) Définir l'entrypoint pour initialiser la base de données et lancer l'application Flask
ENTRYPOINT ["sh", "-c", "python init_db.py && exec gunicorn -w 4 -b 0.0.0.0:5000 main:app"]

