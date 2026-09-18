---
name: Expo Android packaging
description: Replit preview and Android distribution constraints for the Pilimpiku mobile artifact
---

Le projet mobile Expo peut être développé et vérifié dans Expo Go sur Replit. La génération ou la soumission Android finale ne fait pas partie du flux automatique de prévisualisation : elle doit être traitée séparément avec le paquet natif approprié et une soumission manuelle si nécessaire.

**Why:** La documentation Replit distingue le flux iOS guidé du flux Android manuel ; annoncer un APK automatique depuis le workflow Expo créerait une attente erronée.

**How to apply:** Lorsqu’une session mobile demande un APK/AAB, livrer d’abord l’artefact Expo fonctionnel, puis traiter explicitement le packaging Android comme une étape dédiée.

Pour un build Android local dans ce workspace, utiliser un JDK OpenJDK 17 standard et placer le SDK Android ainsi que les caches/répertoires temporaires Gradle sur le volume du workspace plutôt que dans `/home/runner` ou `/tmp`.

**Why:** La JVM GraalVM 19 a provoqué des crashs `SIGBUS`, et les petits volumes système ont atteint leur quota avec le SDK et les caches Gradle pourtant nécessaires au build.

**How to apply:** Préparer le SDK Android avec les composants demandés par Gradle, pointer `local.properties` vers ce SDK du workspace et conserver les caches de compilation hors des volumes à quota réduit.

Les variables `env` de `eas.json` ne sont pas injectées lors d’un `assembleRelease` Gradle local ; toute valeur nécessaire au bundle JavaScript, notamment l’URL d’API, doit être exportée explicitement pendant le bundling et vérifiée dans le bundle produit.

**Why:** Une APK pouvait s’installer et afficher l’interface tout en restant vide parce que `EXPO_PUBLIC_DOMAIN` était absent, alors que l’aperçu Expo le recevait automatiquement via son workflow.

**How to apply:** Avant de livrer une APK locale, vérifier que le bundle Android contient le domaine d’API de production et tester une route publique de l’API.

Au redémarrage simultané de plusieurs artifacts pnpm, les installations peuvent se concurrencer dans le store partagé et provoquer `ENOTEMPTY`; Metro peut alors échouer sur un dossier Expo temporairement absent (`ENOENT`).

**Why:** Le workflow mobile a échoué pendant que les workflows web et API réinstallaient les dépendances en parallèle, puis a redémarré correctement une fois ces opérations terminées.

**How to apply:** Après un échec de démarrage mobile lié à `node_modules`, laisser les installations finir, vérifier `pnpm exec expo install --check`, puis redémarrer le workflow mobile seul avant de modifier le code.