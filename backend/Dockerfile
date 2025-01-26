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

# 4) Initialiser la base de données
RUN python init_db.py

# 5) Exposer le port Flask (optionnel pour la documentation, dépendra de votre config)
EXPOSE 5000

# 6) Lancer l'application Flask
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "main:app"]

