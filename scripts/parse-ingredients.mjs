const fractions={'¼':.25,'½':.5,'¾':.75,'⅓':1/3,'⅔':2/3,'⅛':.125,'⅜':.375,'⅝':.625,'⅞':.875};
export function parseNumber(s){if(fractions[s]!==undefined)return fractions[s];if(s.includes('/')){const p=s.trim().split(/\s+/);const [a,b]=p.pop().split('/').map(Number);return (p.length?Number(p[0]):0)+a/b}return Number(s.replace(',','.'))}
export function ingredient(i,group=''){
 const raw=i.description||'',name=i.title||raw,m=raw.match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:[.,]\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])\s*(.*)$/);
 const literal=()=>({name,quantity:null,unit:'',note:[group,raw||'selon le goût'].filter(Boolean).join(' · ')});
 if(!m)return literal();let quantity=parseNumber(m[1]),tail=m[2],unit='pièce';if(/^(?:à|a|ou|-)\s*\d/.test(tail)||/^demi[e]?\b/i.test(tail))return literal();
 const metric=tail.match(/^(g|kg|ml|l|litres?)\b/i);
 if(metric){unit=metric[1].toLowerCase();if(/^l/.test(unit)){unit='ml';quantity*=1000}if(unit==='kg'){unit='g';quantity*=1000}tail=tail.slice(metric[0].length).trim()}
 else{const u=tail.match(/^(gousses?|branches?|bottes?|tranches?|feuilles?|boîtes?|blocs?|sacs?|bouteilles?|têtes?|pincées?)\b/i);if(u){unit=u[1].replace(/s$/,'');tail=tail.slice(u[0].length).trim()}else if(/^(c\.|cuill|tasses?|cups?|oz\b)/i.test(tail))return literal()}
 if(!Number.isFinite(quantity)||quantity<=0)return literal();
 const prep=tail.replace(/^\([^)]*\)\s*/,'').replace(/^(?:d[’']|de\s+)/,'');
 const notes=metric?(prep.match(/,(.*)$/)?.[1]||''):(['boîte','bloc','sac','bouteille'].includes(unit)?prep:prep.match(/,(.*)$/)?.[1]||'');
 return {name,quantity,unit,note:[group,notes].filter(Boolean).join(' · ')};
}
