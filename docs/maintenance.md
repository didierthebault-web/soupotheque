# Ajouter ou corriger une fiche

1. Utiliser le type `Recipe` de `src/types/recipe.ts` et un identifiant stable en minuscules.
2. Choisir une seule catégorie parmi les cinq collections et un ingrédient principal. Ajouter des mots-clés précis. Documenter les origines disputées plutôt que les trancher arbitrairement.
3. Donner un rendement explicite, les durées en minutes, les ingrédients séparés et des instructions originales. Une quantité libre utilise `quantity: null` avec sa formulation dans `note`. Une unité non reconnue ou une fourchette reste littérale, sans recalcul automatique.
4. Citer uniquement les références effectivement consultées, avec le rôle de chaque source. Ne pas copier les introductions, conseils ou préparations des auteurs.
5. Conserver les groupes de préparation dans les notes d’ingrédients : la même huile utilisée dans une garniture et dans un potage peut rester sur deux lignes.
6. Vérifier la liste des allergènes, y compris bouillons et sauces. Ne pas déduire un régime d’une photographie, d’un titre ou d’une préparation partiellement accessible.
7. Une illustration doit être locale, optimisée, accompagnée d’un texte alternatif et de crédits. Marquer les images générées et les images représentatives de collection. Pour une photographie externe, vérifier la licence de réutilisation et ses attributions.
8. Ajouter la date de vérification et les limites. Ne pas annoncer un essai en cuisine sans l’avoir effectué.
9. Assembler avec `node scripts/import-catalog.mjs`, puis lancer `npm run validate`, `npm test` et `npm run build`. Un changement aux interactions justifie aussi les tests Playwright.

## Références externes

`preparationExternal: true` indique que les étapes complètes restent sur le site source. `externalOnly: true` indique qu’aucun ingrédient local n’est disponible ; les commandes de portions et de courses sont alors masquées. `access: restricted` décrit l’accès observé, sans contourner un abonnement.

## Actualiser Ricardo

Les scripts PowerShell de collecte sont fournis pour Windows : collecte des 17 pages, puis consultation des fiches. Les archives sources restent dans `.cache`, jamais dans le livrable public. L’extraction lit uniquement les sections ingrédients et préparation publiquement visibles. Examiner les changements de total et de pagination avant tout remplacement d’une sélection existante.

Les comptes et la pagination doivent être recalculés. Ne pas décrire 389 références sourcées comme 389 préparations entièrement reformulées. Conserver la distinction visible dans l’application.
