// Import éditorial contrôlé : aucune photographie ni prose de préparation n'est copiée.
import {readFileSync,writeFileSync} from 'node:fs';
const extracted=JSON.parse(readFileSync('docs/ricardo-source/extracted.json','utf8').replace(/^\uFEFF/,''));
const edits={
11410:{category:'Veloutés',main:'Patate douce',description:'Une crème de patate douce et de pois chiches, relevée de gingembre et de cari.',seasons:['Automne','Hiver']},
11399:{category:'Veloutés',main:'Panais',description:'Un potage clair de légumes-racines, accompagné de croûtons parfumés à la sauge.',seasons:['Automne','Hiver']},
11370:{category:'Soupes-repas',main:'Poulet',description:'Du poulet mijoté, des nouilles aux œufs et une fraîcheur anisée de fenouil.',seasons:['Automne','Hiver'],allergens:['Blé (gluten)','Œuf','Céleri'],steps:[
['Préparer le fenouil','Hacher le bulbe et réserver séparément ses tiges et son feuillage émincés. Tailler les autres légumes.'],
['Colorer le poulet','Dans l’huile chaude, dorer les cuisses par petites fournées : environ 4 minutes côté peau, puis 2 minutes de l’autre côté. Réserver.'],
['Faire le bouillon','Faire suer fenouil, céleri, carotte et oignon dans la casserole. Ajouter ail et gingembre, puis eau, curcuma et cuisses. Laisser frémir environ 50 minutes.'],
['Désosser et cuire les nouilles','Retirer le poulet ; après un léger refroidissement, enlever peau et os, puis détailler la chair. Cuire les nouilles séparément et égoutter.'],
['Réunir le bol','Remettre chair et nouilles dans le bouillon avec l’estragon et le fenouil réservé. Réchauffer, ajuster l’assaisonnement et servir.']],tip:'Garder les nouilles séparées du bouillon si le service est différé.'},
11369:{category:'Soupes-repas',main:'Pois cassé',description:'Pois jaunes, courge fondante et rôtie, bacon et fromage en grains composent un bol généreux.',seasons:['Automne','Hiver'],allergens:['Lait'],steps:[
['Partager la courge','Chauffer le four à 220 °C. Détailler 420 g de courge en dés ; râper le reste, après avoir retiré peau et graines.'],
['Préparer le bacon','Faire dorer le bacon environ 8 minutes. Réserver les morceaux et recueillir le gras de cuisson.'],
['Cuire les pois','Faire suer oignon, carotte et courge râpée dans une partie du gras. Ajouter bouillon, pois rincés, ail entier et épices. Mijoter environ 50 minutes, jusqu’à tendreté.'],
['Rôtir la garniture','En parallèle, enrober les dés de courge d’un peu de gras réservé et les rôtir environ 20 minutes ; remuer à mi-cuisson.'],
['Terminer et garnir','Extraire la pulpe des gousses d’ail et la remettre dans la soupe. Ajouter courge rôtie et bacon. Répartir le fromage en grains au service.']],tip:'Si le bacon rend peu de gras, compléter avec un peu d’huile ; cet ajout dépend du produit.'},
11368:{category:'Soupes-repas',main:'Veau',description:'Des boulettes aux herbes, de petits légumes et des pâtes dans un bouillon au parmesan.',seasons:['Automne','Hiver'],allergens:['Lait','Blé (gluten)'],steps:[
['Assembler les boulettes','Préchauffer à 220 °C. Mélanger parmesan, panko, ail, bouillon et épices. Attendre 2 minutes puis incorporer le veau et les herbes.'],
['Cuire au four','Former des boulettes régulières avec les mains légèrement huilées. Les répartir sur une plaque et cuire environ 15 minutes, jusqu’à cuisson complète.'],
['Préparer la soupe','Dorer la courgette 5 minutes dans l’huile. Ajouter l’oignon, puis le bouillon et la croûte de parmesan. Y laisser frémir les boulettes environ 20 minutes.'],
['Ajouter les dernières garnitures','Incorporer rapinis et zeste ; poursuivre environ 3 minutes. Cuire les petites pâtes séparément puis égoutter.'],
['Servir','Réunir pâtes et soupe. Ôter la croûte de fromage. Ajouter parmesan, basilic et citron dans les bols.']],tip:'La source propose aussi du porc haché ; le pilote retient le veau annoncé dans le titre.'},
11367:{category:'Soupes-repas',main:'Porc',description:'Un bouillon épicé au porc et à l’aubergine, équilibré par les arachides et le bok choy.',seasons:['Automne','Hiver'],allergens:['Arachide','Soja','Blé (gluten, selon sauces)'],steps:[
['Dorer le porc','Cuire la viande environ 8 minutes dans la moitié de l’huile en la détachant en petits morceaux. Réserver.'],
['Saisir l’aubergine','Ajouter le reste d’huile et dorer les cubes d’aubergine environ 5 minutes. Remettre le porc avec arachides, ail, épices, doubanjiang et gingembre. Remuer une minute.'],
['Préparer le liant','Délayer la fécule dans une petite partie de l’eau prévue, sans grumeaux.'],
['Mijoter','Verser le reste d’eau, le bouillon, les sauces soya, le Shaoxing et la cassonade. Maintenir un frémissement environ 20 minutes.'],
['Finir','Ajouter le liant et les bok choy. Remuer environ 2 minutes. Retirer cannelle et badiane avant le service ; garnir de coriandre.']],tip:'Le doubanjiang et les sauces peuvent contenir du blé ; lire chaque étiquette.'},
11356:{category:'Veloutés',main:'Chou-fleur',description:'Une base de chou-fleur et de haricots de Lima, avec une garniture de kale aux amandes.',seasons:['Automne','Hiver']},
11329:{category:'Veloutés',main:'Poivron rouge',description:'Poivrons rôtis et noix accompagnent des croquettes de halloumi dorées à l’air chaud.',seasons:['Été','Automne'],allergens:['Lait','Œuf','Blé (gluten)','Noix de Grenoble'],steps:[
['Rôtir les poivrons','Chauffer le four à 230 °C. Huiler les demi-poivrons avec un tiers de l’huile du potage. Rôtir environ 25 minutes, face coupée dessous.'],
['Faire le potage','Faire suer oignons et ail dans le reste d’huile. Ajouter les poivrons et tous les ingrédients du potage ; laisser frémir 10 minutes. Mixer et garder au chaud.'],
['Préparer la panure','Répartir farine et fenouil dans une assiette, œufs battus dans une autre et panko dans une troisième.'],
['Enrober le halloumi','Passer chaque tranche dans la farine, puis l’œuf et le panko. Presser la chapelure et huiler légèrement la surface.'],
['Dorer et servir','Cuire les croquettes à 200 °C en friteuse à air, par fournées espacées, 13 à 15 minutes ; retourner à mi-cuisson. Servir avec le potage.']],tip:'Les fournées de croquettes peuvent allonger le service selon la capacité de l’appareil.'},
11315:{category:'Soupes du monde',main:'Crevette',description:'Une proposition aigre-piquante aux crevettes, aux nouilles de riz et aux parfums de tom yum.',seasons:['Printemps','Été','Automne','Hiver']},
11165:{category:'Veloutés',main:'Carotte',description:'Carottes et pomme de terre composent un potage lisse, réveillé par le gingembre.',seasons:['Automne','Hiver'],allergens:[],diet:['Végétarien','Végétalien'],steps:[
['Tailler','Préparer oignon, ail et gingembre. Couper les carottes en rondelles et la pomme de terre en dés.'],
['Faire suer','Chauffer l’huile, puis y assouplir oignon, ail et gingembre sans coloration excessive.'],
['Développer la base','Ajouter les carottes et remuer encore 2 minutes. Verser le bouillon de légumes puis ajouter la pomme de terre.'],
['Cuire et mixer','Maintenir un frémissement environ 20 minutes, jusqu’à tendreté des légumes. Hors du feu, mixer soigneusement.'],
['Ajuster','Goûter, rectifier sel et poivre et servir. Ajouter seulement un filet d’huile de finition si souhaité.']],tip:'Cette adaptation retient le bouillon de légumes parmi les deux possibilités de la source.'},
11054:{category:'Veloutés',main:'Courge Butternut',description:'Une courge Butternut et une pomme de terre suffisent à donner une texture douce et veloutée.',seasons:['Automne','Hiver'],allergens:[],steps:[
['Préparer','Éplucher et épépiner la courge, puis couper sa chair et la pomme de terre en cubes. Hacher l’oignon et l’ail.'],
['Assouplir','Chauffer l’huile à feu doux. Y remuer oignon, courge et ail pendant environ 5 minutes.'],
['Mouiller','Ajouter bouillon et pomme de terre. Porter au frémissement, puis couvrir.'],
['Contrôler la cuisson','Cuire environ 20 minutes : la chair des deux légumes doit s’écraser facilement sous une fourchette.'],
['Mixer','Retirer du feu et réduire en purée. Détendre avec un peu de bouillon si nécessaire ; assaisonner avant de servir.']],tip:'Le bouillon de poulet fait partie de cette version ; elle n’est pas végétarienne.'},
10876:{category:'Veloutés',main:'Courge Butternut',description:'Courge et tomates rôtissent ensemble avant de devenir une crème aux parfums de thym.',seasons:['Été','Automne'],allergens:['Lait'],diet:['Végétarien'],steps:[
['Chauffer le four','Préchauffer à 220 °C avec deux grilles. Huiler les moitiés de courge avec un tiers de l’huile et les placer sur une plaque, face coupée dessous.'],
['Préparer les tomates','Dans une cocotte adaptée au four, réunir tomates, échalotes, ail, thym, piment et huile restante. Assaisonner.'],
['Rôtir','Mettre la cocotte en haut et la courge en bas. Cuire environ une heure jusqu’à tendreté et légère coloration.'],
['Réunir','Retirer le thym. Prélever la chair de courge et l’ajouter aux tomates. Verser le bouillon et chauffer ; protéger les mains des poignées brûlantes.'],
['Mixer et crémer','Hors du feu, mixer puis incorporer la crème. Ajuster la consistance et l’assaisonnement.']],tip:'Le pilote retient le bouillon de légumes, option explicitement proposée par Ricardo.'},
10647:{category:'Soupes-repas',main:'Poulet',description:'Poulet effiloché, fenouil et petits pois dans une soupe crémeuse au citron.',seasons:['Printemps','Automne','Hiver'],allergens:['Lait','Blé (gluten)'],steps:[
['Préparer','Couper le fenouil en dés et hacher l’ail. Râper la pomme de terre et prélever le zeste du citron.'],
['Faire suer','Faire fondre le beurre puis y assouplir fenouil et ail environ 5 minutes.'],
['Lier','Répartir la farine sur les légumes ; remuer une minute. Ajouter progressivement le bouillon.'],
['Mijoter','Incorporer le poulet déjà cuit, la pomme de terre et le zeste. Cuire à petit frémissement environ 10 minutes.'],
['Finir','Ajouter petits pois et crème. Chauffer encore 2 minutes ; goûter et garnir de feuillage de fenouil.']],tip:'Utiliser du poulet déjà cuit : le temps annoncé ne comprend pas sa cuisson initiale.'},
10581:{category:'Soupes-repas',main:'Courge spaghetti',description:'Des filaments de courge spaghetti, des haricots et du parmesan dans un bouillon tomaté.',seasons:['Automne','Hiver'],allergens:['Lait'],steps:[
['Préparer les bases','Prévoir de la courge spaghetti déjà cuite et effilée. Égoutter et rincer les haricots.'],
['Faire suer','Cuire oignon et carotte dans l’huile environ 5 minutes. Ajouter l’ail et remuer encore une minute.'],
['Mijoter','Verser bouillon, tomates et haricots. Ajouter l’origan et laisser frémir environ 20 minutes.'],
['Réunir hors du feu','Ajouter les filaments de courge, le parmesan et le persil. Remuer pour les répartir sans les écraser.'],
['Servir','Rectifier l’assaisonnement. Répartir dans les bols avec un peu de persil et de parmesan supplémentaires, si souhaité.']],tip:'La courge précuite est un ingrédient de départ ; son temps de cuisson n’est pas compris.'},
10578:{category:'Soupes traditionnelles',main:'Pain',description:'Une interprétation Ricardo de la sopa de ajo : pain, ail, paprika et œuf poché dans le bouillon.',seasons:['Automne','Hiver'],allergens:['Blé (gluten)','Œuf'],steps:[
['Préparer','Couper le jambon et le pain en petits morceaux. Hacher l’ail ; le pilote retient quatre gousses, bas de la fourchette source.'],
['Parfumer','Chauffer l’huile, puis cuire ail et jambon environ 3 minutes à feu moyen. Ajouter le pain et bien l’enrober.'],
['Mouiller','Incorporer les paprikas et le Cayenne, puis l’eau et le bouillon. Laisser frémir environ 5 minutes.'],
['Épaissir','Écraser le pain dans la soupe à la cuillère. Goûter avant d’ajouter du sel, le jambon étant salé.'],
['Pocher les œufs','Casser les œufs séparément dans la soupe. Couvrir et cuire doucement environ 6 minutes, jusqu’à ce que les blancs soient pris. Servir avec du persil.']],tip:'L’œuf peut cuire davantage selon le résultat souhaité ; les blancs doivent être pris.'},
10520:{category:'Veloutés',main:'Tomate',description:'Tomates rôties et ail confit apportent de la profondeur à cette crème au basilic.',seasons:['Été','Automne'],allergens:['Lait'],diet:['Végétarien'],steps:[
['Préparer la cocotte','Préchauffer à 190 °C. Couper le dessus de la tête d’ail pour découvrir les gousses.'],
['Assembler','Réunir dans une cocotte allant au four l’ail, les tomates, les oignons, l’huile et le concentré de tomate. Assaisonner.'],
['Rôtir','Cuire environ 55 minutes : ail et tomates doivent être très tendres.'],
['Récupérer l’ail','Laisser tiédir la tête d’ail environ 10 minutes, puis presser les gousses pour extraire leur pulpe. La remettre dans la cocotte.'],
['Mixer','Mixer les légumes, puis ajouter bouillon chaud et crème. Ajuster et réchauffer doucement ; garnir de basilic si souhaité.']],tip:'Le refroidissement de l’ail est compris dans les gestes de préparation, pas ajouté au temps total source.'},
10467:{category:'Soupes-repas',main:'Lentille corail',description:'Lentilles rouges, patate douce et lait de coco composent une soupe d’inspiration dal.',seasons:['Automne','Hiver'],allergens:['Lait'],diet:['Végétarien'],steps:[
['Préparer','Rincer les lentilles ; couper la patate douce en dés réguliers. Préparer ail, oignon et gingembre.'],
['Parfumer','Dorer légèrement l’oignon dans la matière grasse environ 4 minutes. Ajouter ail et gingembre, puis concentré de tomate et épices.'],
['Cuire les lentilles','Verser bouillon et lait de coco. Ajouter les lentilles et laisser frémir environ 5 minutes.'],
['Ajouter la patate douce','Poursuivre environ 10 minutes, jusqu’à ce qu’elle soit tendre. Remuer et ajouter un peu d’eau si nécessaire.'],
['Préparer la garniture','Mélanger yogourt, coriandre et jus d’agrume. Ajuster les deux préparations et garnir chaque bol de yogourt parfumé.']],tip:'Le beurre et le yogourt rendent cette version végétarienne, mais pas végétalienne.'},
10448:{category:'Veloutés',main:'Tomate',description:'Tomates rôties lentement et crème lisse, couronnées de croûtons de croissants au parmesan.',seasons:['Automne','Hiver'],allergens:['Lait','Blé (gluten)'],steps:[
['Égoutter les tomates','Préchauffer à 150 °C. Égoutter les tomates au-dessus d’un bol, les ouvrir et réserver soigneusement le jus.'],
['Rôtir','Étaler les tomates sur deux plaques, arroser de l’huile du groupe « Tomates rôties » et cuire environ une heure.'],
['Préparer la crème','Faire suer oignon et ail dans l’huile prévue. Ajouter pommes de terre, bouillon et jus réservé. Mijoter 20 minutes, puis ajouter tomates rôties et crème pour 5 minutes.'],
['Dorer les croûtons','Monter le four à 180 °C. Mélanger les cubes de croissant avec leur huile et le parmesan ; cuire environ 10 minutes en remuant à mi-cuisson.'],
['Mixer et dresser','Mixer la soupe, rectifier l’assaisonnement et répartir les croûtons au dernier moment.']],tip:'Les différentes quantités d’huile correspondent à des préparations séparées : conserver leurs repères.'},
10436:{category:'Veloutés',main:'Carotte',description:'Un potage lacté aux carottes, accompagné d’éclats croustillants de tortillas au fromage.',seasons:['Printemps','Été','Automne','Hiver'],allergens:['Lait','Blé (gluten)'],steps:[
['Préparer les légumes','Émincer l’oignon, couper les carottes en rondelles et la pomme de terre en cubes.'],
['Mijoter','Faire suer oignon et carottes dans le beurre. Ajouter pomme de terre, lait et bouillon. Cuire à frémissement environ 25 minutes.'],
['Mixer','Quand tous les légumes sont très tendres, retirer du feu et mixer. Goûter et ajuster.'],
['Former les craquelins','Chauffer le four à 180 °C. Badigeonner les tortillas de beurre fondu, les découper en triangles et répartir le fromage.'],
['Dorer et servir','Cuire les triangles environ 8 minutes, jusqu’à coloration. Les servir avec le potage chaud.']],tip:'Réserver le beurre du groupe « Craquelins » à la finition des tortillas.'},
10432:{category:'Soupes du monde',main:'Tofu',description:'Du tofu soyeux et des edamames dans un bouillon au gingembre, au mirin et au sésame.',seasons:['Printemps','Été','Automne','Hiver'],allergens:['Soja','Sésame','Blé (gluten, selon sauce soya)'],diet:['Végétarien','Végétalien'],steps:[
['Séparer la ciboule','Émincer l’oignon vert en gardant blanc et vert dans deux petits récipients. Hacher le gingembre.'],
['Parfumer','Chauffer l’huile végétale puis y assouplir le blanc d’oignon et le gingembre.'],
['Préparer le bouillon','Ajouter bouillon de légumes, sauce soya, mirin et huile de sésame. Porter au frémissement.'],
['Cuire les edamames','Verser les edamames dans le bouillon et cuire environ 3 minutes, ou selon les indications de leur emballage.'],
['Assembler','Répartir délicatement le tofu en cubes dans les bols. Verser le bouillon chaud et parsemer du vert d’oignon.']],tip:'Le tofu soyeux se brise facilement ; le répartir directement dans les bols.'},
10422:{category:'Soupes-repas',main:'Poulet',description:'Poulet, poireau et pommes de terre dans une soupe liée à la crème et au cheddar.',seasons:['Automne','Hiver'],allergens:['Lait','Blé (gluten)'],steps:[
['Préparer','Rincer et détailler le poireau, hacher l’ail et couper les pommes de terre. Prévoir le poulet déjà cuit.'],
['Lier la base','Assouplir poireau et ail dans le beurre. Ajouter la farine et remuer une minute avant de verser progressivement le bouillon.'],
['Mijoter','Ajouter poulet et pommes de terre. Maintenir un petit frémissement environ 15 minutes, puis incorporer les épinards.'],
['Ajouter la crème','Délayer la fécule dans la crème froide. Verser dans la soupe avec le cheddar et remuer environ une minute à frémissement.'],
['Dresser','Vérifier la tendreté des pommes de terre et ajuster l’assaisonnement. Garnir de cheddar et d’aneth.']],tip:'Le temps annoncé exclut la cuisson préalable du poulet.'},
10389:{category:'Soupes-repas',main:'Haricot blanc',description:'Un minestrone généreux aux légumes, aux haricots blancs et aux petites pâtes.',seasons:['Été','Automne'],allergens:['Céleri','Blé (gluten)','Lait'],steps:[
['Faire le soffritto','Chauffer l’huile puis assouplir oignon, carotte et céleri environ 8 minutes.'],
['Ajouter courgette et ail','Poursuivre environ 5 minutes en remuant, pour obtenir une légère coloration de la courgette.'],
['Cuire les légumes','Ajouter bouillon, eau, haricots verts, chou, pomme de terre, haricots blancs, tomates, laurier et croûte de parmesan. Laisser frémir environ 45 minutes.'],
['Cuire les pâtes','Pendant ce temps, cuire les coquilles dans une autre casserole d’eau bouillante salée. Égoutter puis réunir avec la soupe.'],
['Terminer','Enlever laurier et croûte de parmesan. Ajuster l’assaisonnement et servir avec le parmesan râpé.']],tip:'La mention « la meilleure » appartient au titre Ricardo et n’est pas une évaluation de La Soupothèque.'},
10350:{category:'Soupes-repas',main:'Pâte à lasagne',description:'Les saveurs d’une lasagne dans un bouillon tomaté aux saucisses, épinards et fromages.',seasons:['Automne','Hiver'],allergens:['Blé (gluten)','Lait'],steps:[
['Dorer la viande','Faire revenir la chair des saucisses dans l’huile environ 3 minutes, en la séparant avec une cuillère.'],
['Ajouter l’oignon','Poursuivre environ 4 minutes avec l’oignon haché, jusqu’à coloration.'],
['Mijoter','Verser bouillon, eau et tomates ; ajouter origan et piment. Laisser frémir environ 5 minutes.'],
['Cuire les pâtes','Ajouter les feuilles de lasagne cassées en morceaux. Cuire environ 15 minutes et vérifier leur tendreté.'],
['Finir hors du feu','Incorporer les épinards, goûter et servir. Répartir cottage et parmesan sur les bols.']],tip:'Les pâtes continuent d’absorber le bouillon au repos ; adapter la consistance avant de réchauffer.'},
10301:{category:'Soupes-repas',main:'Saumon',description:'Saumon, maïs et pommes de terre dans une chaudrée crémeuse gratinée au fromage.',seasons:['Automne','Hiver'],allergens:['Poisson','Mollusque','Lait','Blé (gluten)'],steps:[
['Préparer la base','Assouplir oignon et poireau dans le beurre environ 5 minutes. Ajouter la farine et remuer une minute.'],
['Mouiller et cuire','Incorporer jus de palourdes et lait en remuant. Ajouter les pommes de terre ; cuire environ 10 minutes à frémissement.'],
['Ajouter saumon et maïs','Ajouter maïs, crème et cubes de saumon. Poursuivre environ 4 minutes, en vérifiant la cuisson du poisson.'],
['Dorer le bacon','Faire revenir les lardons séparément, puis en incorporer les trois quarts dans la soupe.'],
['Gratiner','Répartir dans des bols adaptés au gril, posés sur une plaque. Couvrir de fromage et gratiner environ 2 minutes sous surveillance. Ajouter bacon restant et ciboulette.']],tip:'À défaut de bols compatibles avec le gril, servir la chaudrée sans passage au four.'}
};
const clean=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
function minutes(iso){const m=String(iso||'').match(/PT(?:(\d+)H)?(?:(\d+)M)?/);return m?Number(m[1]||0)*60+Number(m[2]||0):0}
function ingredient(i,group){
 let description=clean(i.description);let name=clean(i.title);let quantity=null,unit='',note=group?`${clean(group)} · `:'';
 const metric=description.match(/^(\d+(?:[.,]\d+)?)\s*(g|kg|ml|litres?)\b/i);
 const container=description.match(/^(\d+)\s+(boîtes?|blocs?|sacs?|bouteilles?)\s+de\s+(\d+)\s*(g|ml)/i);
 if(metric){quantity=Number(metric[1].replace(',','.'));unit=metric[2].toLowerCase();if(unit.startsWith('litre')){quantity*=1000;unit='ml'}description=description.slice(metric[0].length).trim().replace(/^\([^)]*\)\s*/,'').replace(/^d[’']|^de\s+/,'')}
 else if(container){quantity=Number(container[1]);unit=container[2].replace(/s$/,'');note+=`contenant de ${container[3]} ${container[4]} · `;description=description.slice(container[0].length).trim()}
 else {const count=description.match(/^(\d+(?:[.,]\d+)?)/);if(count){quantity=Number(count[1].replace(',','.'));unit='pièce';description=description.slice(count[0].length).trim();if(/gousses?/.test(description))unit='gousse';else if(/branches?/.test(description))unit='branche';else if(/bottes?/.test(description))unit='botte';else if(/tranches?/.test(description))unit='tranche';else if(/pincée/.test(description))unit='pincée';else if(/tête/.test(description))unit='tête';else if(/feuilles?/.test(description))unit='feuille';}}
 // Les notes culinaires factuelles sont conservées sans les équivalences impériales.
 description=description.replace(/\([^)]*\)/g,'').replace(/\s+/g,' ').trim();
 const tail=description.match(/,(?!\d)(.*)$/)?.[1]?.trim()||'';
 if(tail)note+=tail;
 if(quantity===null)note+=(note?' · ':'')+'pour le service, selon le goût';
 if(/piment|épices/.test(name)&&/facultatif/.test(clean(i.description)))note+=(note?' · ':'')+'facultatif';
 if(/bouillon de (poulet|légumes)/i.test(name)&&/ou de légumes|légumes ou de poulet/.test(clean(i.description))){name='Bouillon de légumes';note+=(note?' · ':'')+'option retenue parmi les bouillons proposés'}
 if(/veau ou de porc/.test(name)){name='Veau haché';note+=(note?' · ':'')+'veau retenu pour cette fiche'}
 if(/courge Butternut/i.test(name)&&/environ 900 g/.test(clean(i.description)))note+=(note?' · ':'')+'environ 900 g avant préparation';
 if(/courge Butternut/i.test(name)&&/environ 1 kg/.test(clean(i.description)))note+=(note?' · ':'')+'environ 1 kg avant préparation';
 if(/courge spaghetti/i.test(name))note+=(note?' · ':'')+'déjà cuite et défaite en filaments';
 if(/haricots romains/i.test(clean(i.description)))name='Haricots romains';
 if(/croûte de (fromage )?parmesan/i.test(clean(i.description)))name='Croûte de parmesan';
 if(/bâton de cannelle/i.test(name)){name='Bâton de cannelle';note=(group?clean(group)+' · ':'')+'environ 10 cm';}
 if(/surgelés?/.test(clean(i.description))&&!/surgelés?/.test(name))note+=(note?' · ':'')+'surgelé';
 name=name.replace(/^boîte de /i,'').replace(/^gousses? d[’']/i,'').replace(/^branches? de /i,'').replace(/^tête d[’']/i,'');
 return {name:name.charAt(0).toUpperCase()+name.slice(1),quantity,unit,note:note.replace(/(?: · ){2,}/g,' · ').replace(/ · $/,'')};
}
const recipes=extracted.map(src=>{
 const e=edits[src.id];if(!e)throw new Error('Référence non éditée '+src.id);
 const url='https://www.ricardocuisine.com/recettes/'+src.url;
 const ingredients=(src.ingredientGroups||[]).flatMap(g=>g.ingredients.map(i=>ingredient(i,g.description)));
 if(!src.external)ingredients.push({name:'Sel',quantity:null,unit:'',note:'selon le goût'},{name:'Poivre',quantity:null,unit:'',note:'selon le goût'});
 const limits=src.external?['Ingrédients et préparation réservés aux abonnés lors de la consultation : aucun contenu caché n’a été reconstitué.','Fiche de découverte uniquement ; consulter Ricardo pour cuisiner.']:['Synthèse et reformulation éditoriales de La Soupothèque ; non testée en cuisine.','Les durées publiées par Ricardo sont conservées ; elles peuvent dépasser la somme des cuissons décrites.'];
 if([10647,10422].includes(src.id))limits.push('Le temps de cuisson initial du poulet déjà cuit n’est pas inclus.');
 if(src.id===10581)limits.push('Le temps de cuisson initial de la courge spaghetti n’est pas inclus.');
 if(src.id===10520)limits.push('Les 10 minutes de tiédissement de l’ail sont comprises dans la préparation ; pas de repos supplémentaire ajouté.');
 const r={id:'ricardo-'+src.id,title:src.title,originalName:src.title,country:'Canada',region:'Québec · création contemporaine Ricardo',category:e.category,description:e.description,history:'Une proposition contemporaine publiée par Ricardo au Québec. Son classement dans La Soupothèque décrit la préparation ; il ne revendique pas une origine québécoise exclusive pour le plat ou ses inspirations.',portions:Number(String(src.portions).match(/\d+/)?.[0]||4),prep:minutes(src.prep),cook:minutes(src.cook),rest:Math.max(0,minutes(src.total)-minutes(src.prep)-minutes(src.cook)),difficulty:[11368,11329,10301,10448].includes(src.id)?'Intermédiaire':'Facile',seasons:e.seasons,diet:e.diet||[],mainIngredient:e.main,tags:['Ricardo','Québec',e.main,...(e.category==='Veloutés'?['potage','crème']:[])],ingredients,steps:(e.steps||[]).map(([title,text])=>({title,text})),tips:src.external?[]:[e.tip],variants:[],allergens:e.allergens||[],dietaryNote:src.external?'Composition complète non accessible : allergènes et régimes non vérifiés.':(e.allergens?.length?'Allergènes identifiés dans les ingrédients retenus ; ':'')+'Vérifier les étiquettes des bouillons, sauces, charcuteries et produits composés. Les accompagnements suggérés mais non listés ne sont pas inclus.',sources:[{title:'RICARDO — '+src.title,url,scope:src.external?'Titre, présentation et durées accessibles ; ingrédients et préparation réservés aux abonnés.':'Référence culinaire, proportions et durées ; préparation résumée et reformulée pour La Soupothèque.'}],verified:'2026-11-13',status:src.external?'À consulter chez Ricardo':'Adaptation documentée — illustration à préparer',limits,photo:{file:'images/placeholder.svg',author:'La Soupothèque',source:'',license:'Visuel original',licenseUrl:'',alt:src.title+' — illustration à préparer',changes:'',note:'Illustration en préparation'},provider:'RICARDO',sourceRecipeId:src.id,sourceRecipeUrl:url,externalOnly:src.external};
 return r;
});
writeFileSync('src/data/ricardo.json',JSON.stringify(recipes,null,2)+'\n');
console.log(`${recipes.length} références, ${recipes.filter(r=>!r.externalOnly).length} fiches avec ingrédients et préparation, ${recipes.filter(r=>r.externalOnly).length} découvertes externes.`);
