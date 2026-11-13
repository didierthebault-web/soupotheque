# Vérifications — 13 novembre 2026

## Version contrôlée

439 fiches : 50 recettes du corpus initial et 389 références Ricardo. Le contrôle éditorial vérifie l’appartenance des 50 titres à la liste initiale et leur répartition en dix recettes par collection. Le rapport `import-report.json` vérifie les dix-sept pages Ricardo, les identifiants uniques et le classement exhaustif.

Répartition totale : 84 soupes traditionnelles, 152 veloutés, 78 soupes du monde, 32 soupes froides et 93 soupes-repas.

## Contrôles exécutés

- `npm run validate` : réussi. Champs requis, temps, quantités, notes de quantités libres, références, index des variantes, catégories, images locales, transparence des illustrations, données publiques synchronisées et absence de reconstitution des quatre fiches réservées.
- `npm run build` : réussi, TypeScript puis Vite. JavaScript principal : environ 265 ko, 82 ko compressés. Le catalogue JSON est chargé séparément depuis les fichiers locaux du site.
- `npm test` : onze tests unitaires réussis, couvrant recherche insensible aux accents, portions, quantités libres, regroupement prudent des courses, stockage absent, fractions, unités, contenants et quantités ambiguës.
- `npm run test:e2e` : trois parcours Playwright réussis sous Chromium. Catalogue complet, page 17 de cinq références, filtres de catégorie et d’ingrédient, réinitialisation, résultat vide, portions, favoris, courses après rechargement, source publique, source réservée, chargement des illustrations locales, routes directes, clavier et affichage mobile sans débordement.
- Contrôle visuel des captures d’accueil sur ordinateur et téléphone. La nouvelle série remplace les visuels initiaux et conserve la direction artistique approuvée.

## Limites

Les recettes n’ont pas été exécutées ni dégustées. L’exactitude documentaire n’équivaut pas à un essai culinaire. Les portions, références de marques et rendements doivent être contrôlés au moment de cuisiner.

Les 389 références Ricardo comprennent 385 listes d’ingrédients publiques, vingt synthèses locales de préparation et quatre fiches dont le contenu culinaire reste réservé aux abonnés. Pour les 365 autres préparations publiques, le carnet ouvre les étapes sur le site d’origine ; il n’annonce pas une disponibilité intégrale hors ligne.

Les illustrations sont générées et certaines sont réutilisées pour plusieurs recettes d’une même famille. Elles ne certifient ni la composition exacte ni un résultat de cuisine réel. Aucune photographie protégée de Ricardo n’est incorporée.

Les parcours automatisés et le contrôle visuel ne constituent pas un audit RGAA/WCAG, un test avec lecteur d’écran ou une validation sur tous les navigateurs et appareils.

Le workflow GitHub Pages est préparé mais n’a pas été exécuté dans un dépôt distant. Aucune publication publique n’est revendiquée.
