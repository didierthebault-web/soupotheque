import type { Ingredient, Recipe } from '../types/recipe';
export const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const total=(r:Recipe)=>r.prep+r.cook+r.rest;
export function matches(r:Recipe,query:string){const hay=normalize([r.title,r.originalName,r.country,r.region,r.category,r.provider||'',...r.tags,...r.ingredients.map(i=>i.name)].join(' '));return normalize(query).trim().split(/\s+/).every(word=>hay.includes(word))}
export function amount(i:Ingredient,portions:number,base:number){return i.quantity===null ? (i.note||'selon le goût') : `${new Intl.NumberFormat('fr-FR',{maximumFractionDigits:2}).format(i.quantity*portions/base)}${i.unit?' '+i.unit:''}`}
export interface ShoppingItem extends Ingredient { id:string; checked:boolean }
export function addIngredients(list:ShoppingItem[],ingredients:Ingredient[],portions:number,base:number):ShoppingItem[]{const next=list.map(i=>({...i}));for(const ingredient of ingredients){const quantity=ingredient.quantity===null?null:ingredient.quantity*portions/base;const id=normalize(ingredient.name)+'|'+ingredient.unit+'|'+(ingredient.note||'');const found=next.find(i=>i.id===id);if(found){if(found.quantity!==null&&quantity!==null)found.quantity+=quantity;found.checked=false}else next.push({...ingredient,quantity,id,checked:false})}return next}
export function readStorage<T>(key:string,fallback:T,valid:(v:unknown)=>v is T):T{try{const value:unknown=JSON.parse(localStorage.getItem(key)||'null');return valid(value)?value:fallback}catch{return fallback}}
