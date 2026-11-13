import {describe,it,expect} from 'vitest';
import {matches,amount,addIngredients,readStorage} from '../src/utils/recipes';
import data from '../src/data/recipes.json';
import type {Recipe,Ingredient} from '../src/types/recipe';
const recipes=data as Recipe[];
describe('recherche culinaire',()=>{
 it('retrouve les accents, ingrédients et noms originaux',()=>{expect(matches(recipes[0],'OIGNON')).toBe(true);expect(matches(recipes[2],'misoshiru')).toBe(true);expect(matches(recipes[3],'xeres')).toBe(true);expect(matches(recipes[4],'italie chou')).toBe(true)});
 it('combine les termes et exclut les faux résultats',()=>{expect(matches(recipes[2],'tofu france')).toBe(false);expect(matches(recipes[0],'inexistant')).toBe(false)});
});
describe('portions et liste de courses',()=>{
 const g:Ingredient={name:'Tomate',quantity:1000,unit:'g'};
 it('adapte les nombres sans multiplier les mentions libres',()=>{expect(amount(g,2,4)).toBe('500 g');expect(amount({name:'Sel',quantity:null,unit:'',note:'selon le goût'},8,4)).toBe('selon le goût')});
 it('additionne seulement les lignes de même unité et même préparation',()=>{let list=addIngredients([], [g],2,4);list[0].checked=true;list=addIngredients(list,[g,{name:'Tomate',quantity:1,unit:'pièce'}],4,4);expect(list).toHaveLength(2);expect(list[0].quantity).toBe(1500);expect(list[0].checked).toBe(false);expect(list[1].quantity).toBe(1)});
 it('garde une mention non numérique unique',()=>{const salt={name:'Sel',quantity:null,unit:'',note:'selon le goût'};const list=addIngredients(addIngredients([],[salt],4,4),[salt],8,4);expect(list).toHaveLength(1);expect(list[0].quantity).toBeNull()});
 it('supporte un stockage absent ou indisponible',()=>{expect(readStorage('none',[],(v):v is never[]=>Array.isArray(v))).toEqual([])});
});
