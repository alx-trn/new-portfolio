# Portfolio

## Architecture

- `client/` : interface React, servie en développement par Vite.
- `server/` : API Node.js/Express, avec ses routes dans `server/src/routes/`.
- `assets/` : ressources statiques du portfolio.


## Démarrage en développement

Installer les dépendances une première fois :

```powershell
cd client
npm install
cd ..\server
npm install
```

Lancer ensuite le serveur API et l’interface dans deux terminaux distincts :

```powershell
cd server
npm run dev
```

```powershell
cd client
npm run dev
```

Vite sert l’interface sur `http://localhost:5173` et transmet les requêtes `/api`
au serveur sur `http://localhost:3001`. La route `GET /api/health` vérifie leur
communication.

## Routes API à prévoir

Les routes prévues sont documentées dans [`API_ROUTES.md`](./API_ROUTES.md).
Pour l'instant, seule la route de santé `GET /api/health` est implémentée.