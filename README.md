# La Soupothèque

Un monde de soupes à découvrir et à cuisiner.

Application française en React, TypeScript et Vite. Le carnet conserve ses données et illustrations localement. Les favoris et la liste de courses restent dans le navigateur, sans compte.

## Corpus et transparence

- Le corpus initial de 50 soupes est conservé séparément de la sélection Ricardo.
- Les **389 références** de la rubrique Ricardo ont été recensées sur **17 pages**, le 13 novembre 2026, sans doublon d’identifiant.
- 385 fiches Ricardo proposent leurs ingrédients publics et leurs durées dans le carnet. Vingt comprennent également une synthèse de préparation originale. Pour les autres, un lien ouvre les étapes sur le site source.
- Quatre fiches réservent leurs ingrédients et leur préparation aux abonnés Ricardo. Le carnet n’en reconstitue pas le contenu.
- Le classement comprend cinq collections : soupes traditionnelles, veloutés, soupes du monde, soupes froides et soupes-repas. Chaque fiche a une catégorie principale et un ingrédient principal.
- Les recettes n’ont pas été testées en cuisine. Les limites, adaptations et références sont signalées sur les fiches.

L’état chiffré réellement construit est disponible dans `docs/import-report.json`. Le total affiché est calculé depuis les données, jamais écrit en dur.

## Lancer et vérifier

Node.js 22 ou ultérieur et npm sont nécessaires.

```sh
npm ci
npm run dev -- --port 5188
npm run validate
npm test
npm run build
```

Aperçu : `http://127.0.0.1:5188/soupotheque/`.

```sh
npx playwright install chromium
npm run test:e2e
```

Les tests fonctionnels supposent que l’aperçu est déjà lancé. `SOUPOTHEQUE_TEST_URL` permet de changer son adresse. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` peut désigner un Chromium existant. Les captures sont écrites dans `docs/`.

## Organisation

- `src/components`, `src/pages`, `src/styles` : interface, navigation et impression.
- `src/types/recipe.ts` : schéma de données.
- `src/utils/recipes.ts` : recherche, portions, stockage et courses.
- `src/data/pilot-recipes.json`, `expansion-*.json` : corpus du carnet.
- `src/data/ricardo.json` : vingt préparations reformulées et quatre fiches de découverte de la première page.
- `src/data/ricardo-categories.json` : classement des 389 références.
- `src/data/recipes.json` : référentiel complet assemblé.
- `public/data/recipes.json` : copie compacte chargée par l’application.
- `public/images` : illustrations optimisées et anciens visuels archivés.
- `docs/import-report.json` : rapport d’import reproductible et décompte par catégorie.
- `tests/` : calculs et parcours navigateur.

Après une modification éditoriale, régénérer le catalogue puis exécuter les contrôles. L’import complet utilise les archives de travail locales dans `.cache`, exclues de la publication. Les scripts de collecte relisent uniquement les pages publiquement accessibles ; ils ne contournent pas l’accès abonné.

## Images

La direction artistique utilise des illustrations culinaires photoréalistes originales générées avec ImageGen : lumière naturelle, céramique artisanale, pierre claire et lin. Leur caractère généré est indiqué sur les cartes, les fiches et dans les crédits. Les visuels de collection sont représentatifs d’une famille ; la composition exacte peut différer de la recette. Aucune photographie Ricardo n’est copiée dans le site.

Les prompts, le mode de génération et la correspondance des fichiers sont documentés dans `docs/direction-artistique.md` et `docs/illustrations.json`. Les sources de génération d’origine sont conservées sur le poste ; toutes les images effectivement utilisées par le site sont dans `public/images`.

## Maintenance éditoriale

Voir `docs/maintenance.md`. Ne pas modifier directement la copie compacte de `public/data` : elle est produite depuis le référentiel. Une photographie ou illustration ne suffit pas à valider une recette ; les quantités, durées, origines, allergènes et instructions nécessitent leur propre contrôle.

## Hébergement

Le chemin Vite `/soupotheque/` et le routage par fragment sont compatibles avec GitHub Pages. Le workflow de publication se déclenche manuellement. Aucun dépôt public ni déploiement n’est créé automatiquement par l’import ou les tests.

Le site ne revendique aucune conformité RGAA complète. Les contrôles réalisés et leurs limites sont décrits dans `docs/rapport-tests.md`.

