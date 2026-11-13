import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const data=read('src/data/recipes.json'),report=read('docs/import-report.json');
const categories=['Soupes traditionnelles','Veloutés','Soupes du monde','Soupes froides','Soupes-repas'];
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,"'").toLowerCase();
const native=data.filter(r=>r.provider!=='RICARDO');
assert.equal(native.length,50,'Les 50 recettes initiales doivent être conservées');
assert.deepEqual(native.map(r=>normalize(r.title)).sort(),read('src/data/initial-corpus.json').map(normalize).sort(),'Respect de la liste initiale');
for(const category of categories)assert.equal(native.filter(r=>r.category===category).length,10,category+' : 10 recettes initiales');
assert.equal(new Set(data.map(r=>r.id)).size,data.length,'Identifiants uniques');
assert.equal(data.filter(r=>r.provider==='RICARDO').length,389,'Les 17 pages Ricardo doivent être présentes');
assert.equal(new Set(data.filter(r=>r.provider==='RICARDO').map(r=>r.sourceRecipeId)).size,389);
assert.equal(report.pages.length,17);assert.equal(report.pages.reduce((sum,p)=>sum+p.count,0),389);
assert.equal(report.total,data.length);assert.equal(new Set(data.map(r=>r.category)).size,5);
for(const r of data){
 for(const key of ['title','originalName','country','region','category','history','description','dietaryNote','verified','status'])assert.ok(r[key],`${r.id}: ${key}`);
 assert.ok(categories.includes(r.category),`${r.id}: catégorie`);assert.ok(r.mainIngredient&&r.tags.length);
 for(const key of ['prep','cook','rest'])assert.ok(Number.isFinite(r[key])&&r[key]>=0,`${r.id}: ${key}`);
 assert.ok(r.portions>0);assert.ok(r.sources.length>=1);
 for(const i of r.ingredients){assert.ok(i.name);assert.ok(i.quantity===null||(Number.isFinite(i.quantity)&&i.quantity>0));if(i.quantity===null)assert.ok(i.note)}
 for(const s of r.sources){assert.equal(new URL(s.url).protocol,'https:');assert.ok(s.title&&s.scope)}
 for(const v of r.variants)assert.ok(r.sources[v.source]);
 for(const key of ['file','author','license','alt','changes'])assert.ok(r.photo[key],`${r.id}: photo.${key}`);
 assert.ok(existsSync('public/'+r.photo.file),`${r.id}: image locale`);
 if(r.photo.kind==='generated')assert.ok(r.photo.note.includes('générée'),`${r.id}: transparence IA`);
 if(r.externalOnly){assert.equal(r.ingredients.length,0);assert.equal(r.steps.length,0);assert.equal(r.access,'restricted')}
 if(r.preparationExternal)assert.equal(r.steps.length,0);else assert.ok(r.steps.length>=5,`${r.id}: préparation documentée`);
 if(r.provider==='RICARDO'){assert.ok(r.sourceRecipeUrl.startsWith('https://www.ricardocuisine.com/recettes/'));assert.ok(r.sourceRecipeUrl.includes(String(r.sourceRecipeId)))}
}
assert.deepEqual(read('public/data/recipes.json'),data,'Copie publique synchronisée');
assert.equal(Object.values(report.categories).reduce((sum,c)=>sum+c.ricardo,0),389);
console.log(`${data.length} fiches dont 389 références Ricardo, 17 pages, 5 catégories, images locales et statuts : OK`);
