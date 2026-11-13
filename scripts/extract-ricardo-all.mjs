import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const readJson=path=>JSON.parse(readFileSync(path,'utf8').replace(/^\uFEFF/,''));
const catalog=readJson('.cache/ricardo-catalog.json');
const decode=s=>s.replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#([0-9]+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&quot;/g,'"').replace(/&apos;|&#039;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&');
const clean=s=>decode(String(s||'').replace(/<[^>]*>/g,'')).replace(/\s+/g,' ').trim();
const rows=[];const errors=[];
for(const item of catalog.rows){
 const path=`.cache/ricardo-source/${item.id}.html`;if(!existsSync(path)){errors.push({id:item.id,error:'HTML absent'});continue;}
 const html=readFileSync(path,'utf8');
 let schema=null;
 for(const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
  try{const parsed=JSON.parse(match[1]);for(const candidate of (Array.isArray(parsed)?parsed:[parsed])){if(candidate['@type']==='Recipe'){schema=candidate;break;}for(const graph of candidate['@graph']||[]){if(graph['@type']==='Recipe')schema=graph;}}}catch{}
 }
 // Aucun accès au composant d'exclusivité, aucune reconstitution d'un contenu réservé.
 // Le mode de cuisson n'est lu que si les sections publiques ingrédients ET préparation existent.
 const publicIngredients=/class=["'][^"']*c-recipe-instructions--ingredients\b/.test(html);
 const publicPreparation=/class=["'][^"']*c-recipe-instructions--preparation\b/.test(html);
 let cooking=null;
 if(publicIngredients&&publicPreparation){
  for(const tag of html.matchAll(/<[^>]*\bdata-react-app=["']recipeCookingMode["'][^>]*>/gi)){
   const attr=tag[0].match(/\bdata-react-app-props=(["'])([\s\S]*?)\1/i);if(!attr)continue;
   try{const parsed=JSON.parse(decode(attr[2]));if(Array.isArray(parsed.ingredientGroups)&&Array.isArray(parsed.preparationGroups)){cooking=parsed;break;}}catch{}
  }
 }
 const externalOnly=!cooking;
 rows.push({id:item.id,title:item.title,url:'https://www.ricardocuisine.com/recettes/'+item.url,
  schema:schema?Object.fromEntries(['name','prepTime','cookTime','totalTime','recipeYield','recipeCategory','keywords','datePublished'].map(key=>[key,schema[key]??null])):null,
  publicIngredients,publicPreparation,externalOnly,
  ingredientGroups:externalOnly?[]:cooking.ingredientGroups.map(g=>({description:clean(g.description),ingredients:g.ingredients.map(i=>({id:i.id,title:clean(i.title),description:clean(i.description)}))})),
  preparationGroups:externalOnly?[]:cooking.preparationGroups.map(g=>({description:clean(g.description),preparations:g.preparations.map(p=>({description:clean(p.description),preparationOrder:p.preparationOrder}))}))
 });
}
writeFileSync('.cache/ricardo-extracted-all.json',JSON.stringify({collectedAt:'2026-11-13',count:rows.length,errors,rows},null,2)+'\n');
const external=rows.filter(r=>r.externalOnly);console.log(`${rows.length} fiches analysées, ${rows.length-external.length} préparations publiques, ${external.length} fiches sans préparation locale, ${errors.length} fichiers absents.`);
if(errors.length)console.log(errors);
