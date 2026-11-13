import {createRoot} from 'react-dom/client';
import App from './pages/App';
import type {Recipe} from './types/recipe';
import './styles/main.css';
import './styles/catalog.css';
const root=createRoot(document.getElementById('root')!);
root.render(<main className="wrap page-section" aria-busy="true"><p className="eyebrow">LA SOUPOTHÈQUE</p><h1 className="page-title">Votre carnet s’ouvre…</h1></main>);
fetch(import.meta.env.BASE_URL+'data/recipes.json').then(async response=>{if(!response.ok)throw new Error('Catalogue indisponible');const recipes=await response.json() as Recipe[];if(!Array.isArray(recipes))throw new Error('Catalogue invalide');root.render(<App recipes={recipes}/>)}).catch(()=>root.render(<main className="wrap page-section"><h1 className="page-title">Le carnet n’a pas pu s’ouvrir.</h1><p>Vérifiez votre connexion à cet aperçu, puis rechargez la page.</p><button className="button primary" onClick={()=>location.reload()}>Réessayer</button></main>));
