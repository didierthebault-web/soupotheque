import {describe,it,expect} from 'vitest';
import {ingredient,parseNumber} from '../scripts/parse-ingredients.mjs';
describe('quantités culinaires importées',()=>{
 it('reconnaît fractions simples, mixtes et typographiques',()=>{expect(parseNumber('1/2')).toBe(.5);expect(parseNumber('1 1/2')).toBe(1.5);expect(parseNumber('½')).toBe(.5);expect(parseNumber('1,5')).toBe(1.5)});
 it('normalise les volumes et les masses sans multiplier les équivalences',()=>{expect(ingredient({title:'Bouillon',description:'1,5 litre (6 tasses) de bouillon'},'Soupe')).toMatchObject({name:'Bouillon',quantity:1500,unit:'ml',note:'Soupe'});expect(ingredient({title:'Carotte',description:'0,5 kg de carottes'})).toMatchObject({quantity:500,unit:'g'})});
 it('conserve les contenants et leur taille au lieu de confondre poids et nombre',()=>{const i=ingredient({title:'Tomate',description:'2 boîtes de 540 ml de tomates'},'Potage');expect(i.quantity).toBe(2);expect(i.unit).toBe('boîte');expect(i.note).toContain('540 ml')});
 it('ne transforme pas une fourchette ou une unité ambiguë en valeur arbitraire',()=>{expect(ingredient({title:'Ail',description:'1 à 2 gousses d’ail'}).quantity).toBeNull();expect(ingredient({title:'Huile',description:'2 c. à soupe d’huile'}).quantity).toBeNull();expect(ingredient({title:'Sel',description:'Au goût'}).quantity).toBeNull()});
 it('conserve les préparations séparées dans les notes',()=>{expect(ingredient({title:'Huile',description:'15 ml d’huile'},'Croûtons').note).toBe('Croûtons');expect(ingredient({title:'Oignon',description:'1/2 oignon, haché'},'Soupe')).toMatchObject({quantity:.5,note:'Soupe ·  haché'})});
});
