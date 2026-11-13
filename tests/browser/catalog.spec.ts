import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import type {Recipe} from '../../src/types/recipe';
const data=JSON.parse(readFileSync(new URL('../../src/data/recipes.json',import.meta.url),'utf8')) as Recipe[];
test('389 références, pagination complète et classement combinable',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('');await expect(page.getByRole('heading',{level:1})).toContainText('Un peu de chaleur');
 await page.screenshot({path:'docs/catalogue-accueil-desktop.png',fullPage:true});
 await page.getByRole('link',{name:'Explorer les recettes'}).click();await expect(page.locator('#catalog-results')).toContainText(`${data.length} recettes`);await expect(page.locator('.recipe-card')).toHaveCount(24);
 await page.getByRole('button',{name:'Les découvertes RICARDO 389'}).click();await expect(page.locator('#catalog-results')).toContainText('389 recettes');await expect(page.getByRole('combobox',{name:'Page des recettes'})).toHaveCount(1);
 await page.getByRole('combobox',{name:'Page des recettes'}).selectOption('17');await expect(page.locator('.recipe-card')).toHaveCount(5);await expect(page.getByRole('button',{name:'Suivant'})).toBeDisabled();
 await page.screenshot({path:'docs/ricardo-page-17.png',fullPage:true});
 await page.getByRole('button',{name:'Veloutés',exact:true}).click();const expected=data.filter(r=>r.provider==='RICARDO'&&r.category==='Veloutés').length;await expect(page.locator('#catalog-results')).toContainText(`${expected} recettes`);await expect(page.getByRole('combobox',{name:'Page des recettes'})).toHaveValue('1');
 await page.getByRole('button',{name:'Filtres',exact:true}).click();await page.getByRole('combobox',{name:'Ingrédient principal',exact:true}).selectOption('Carotte');for(const c of await page.locator('.recipe-card').all())await expect(c.locator('.eyebrow')).toHaveText('Veloutés');
 await page.getByRole('button',{name:'Tout réinitialiser'}).click();await page.getByRole('textbox',{name:'Rechercher une recette'}).fill('zzzzzz');await expect(page.getByRole('heading',{name:'Aucune soupe ne correspond à ces envies.'})).toBeVisible();
 expect(errors).toEqual([]);
});
test('portions, favoris et courses conservés ; sources publiques et premium',async({page})=>{
 await page.goto('#/recette/soupe-miso');await expect(page.getByRole('heading',{level:1})).toHaveText('Soupe miso');await page.getByRole('button',{name:'Augmenter les portions'}).click();await expect(page.locator('output')).toHaveText('5');await expect(page.locator('.ingredients')).toContainText('250 g');
 await page.getByRole('button',{name:'Garder en favori'}).click();await page.getByRole('button',{name:'Ajouter à ma liste'}).click();await page.getByRole('link',{name:/Liste de courses,/}).click();await expect(page.locator('.shopping-list li')).toHaveCount(5);await page.getByRole('checkbox').first().check();await page.reload();await expect(page.getByRole('checkbox').first()).toBeChecked();
 await page.getByRole('link',{name:/Mes favoris,/}).click();await expect(page.locator('.recipe-card')).toHaveCount(1);
 await page.goto('#/recette/ricardo-11410');await expect(page.locator('.ingredients')).toContainText('réservée aux abonnés');await expect(page.getByRole('button',{name:'Ajouter à ma liste'})).toHaveCount(0);await expect(page.locator('.source-preparation a')).toHaveAttribute('href',/11410-creme/);
 const external=data.find(r=>r.provider==='RICARDO'&&r.preparationExternal&&!r.externalOnly)!;await page.goto(`#/recette/${external.id}`);await expect(page.locator('.ingredients li')).toHaveCount(external.ingredients.length);await expect(page.locator('.source-preparation a')).toHaveAttribute('href',external.sourceRecipeUrl!);
});
test('images locales, responsive, navigation clavier et chargement direct',async({page,request})=>{
 for(const file of [...new Set(data.map(r=>r.photo.file))]){const response=await request.get(file);expect(response.status()).toBe(200)}
 await page.goto('');await expect(page.getByRole('heading',{level:1})).toBeVisible();await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Aller au contenu'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 for(const route of ['#/catalogue','#/recette/veloute-potimarron','#/recette/ricardo-11370','#/pays','#/saisons','#/apropos','#/credits','#/accessibilite']){await page.goto(route);await expect(page.locator('h1')).toHaveCount(1)}
 await page.setViewportSize({width:390,height:844});for(const route of ['#/','#/catalogue','#/recette/ricardo-11329']){await page.goto(route);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}
 await page.screenshot({path:'docs/catalogue-fiche-mobile.png',fullPage:true});await page.goto('#/');await page.screenshot({path:'docs/catalogue-accueil-mobile.png',fullPage:true});await page.setViewportSize({width:1280,height:900});await page.goto('#/catalogue');await page.getByRole('button',{name:'Les découvertes RICARDO 389'}).click();await page.screenshot({path:'docs/catalogue-ricardo-desktop.png',fullPage:true});
});
