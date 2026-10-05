---
name: Chromium headless CDP
description: Particularités de connexion au débogueur Chromium pendant les vérifications navigateur locales.
---

Pour connecter un client WebSocket au débogueur de Chromium headless dans cet environnement, lancer Chromium avec `--remote-allow-origins=http://localhost` si le client envoie cette origine. Chromium formule la réponse positive comme `101 WebSocket Protocol Handshake`; vérifier le code HTTP 101 plutôt que de chercher littéralement `101 Switching Protocols`. Le client doit aussi conserver les octets éventuellement reçus après la fin des en-têtes HTTP.

**Why:** Sans ces précautions, une vérification navigateur peut échouer avant même de tester l’application, malgré un débogueur actif.

**How to apply:** Utiliser uniquement pour les sessions temporaires de contrôle CDP; ne pas ajouter ces options au démarrage de l’application.
