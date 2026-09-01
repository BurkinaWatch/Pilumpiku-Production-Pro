---
name: Expo Android packaging
description: Replit preview and Android distribution constraints for the Pilimpiku mobile artifact
---

Le projet mobile Expo peut être développé et vérifié dans Expo Go sur Replit. La génération ou la soumission Android finale ne fait pas partie du flux automatique de prévisualisation : elle doit être traitée séparément avec le paquet natif approprié et une soumission manuelle si nécessaire.

**Why:** La documentation Replit distingue le flux iOS guidé du flux Android manuel ; annoncer un APK automatique depuis le workflow Expo créerait une attente erronée.

**How to apply:** Lorsqu’une session mobile demande un APK/AAB, livrer d’abord l’artefact Expo fonctionnel, puis traiter explicitement le packaging Android comme une étape dédiée.