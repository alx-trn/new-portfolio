# Les routes

React utilisera ces adresses pour demander ou envoyer des informations à
l'API. Elles commenceront toutes par `/api`.

Pour l'instant, seule la route suivante fonctionne :

- `GET /api/health` : vérifier que l'API répond.

Les autres routes seront ajoutées au fur et à mesure.

## Portfolio

- `GET /api/portfolio` : récupérer les informations de la page d'accueil.
- `GET /api/projects` : afficher la liste des projets.
- `GET /api/projects/:id` : afficher un projet. `:id` sera remplacé par son numéro.
- `GET /api/cv` : télécharger le CV.
- `POST /api/contact` : envoyer un message depuis le formulaire de contact.

## Administration

- `POST /api/auth/login` : se connecter.
- `POST /api/auth/logout` : se déconnecter.
- `GET /api/auth/me` : vérifier si l'administrateur est connecté.
- `GET /api/admin/dashboard` : afficher les informations du tableau de bord.

Pour les projets, catégories, compétences et labels, l'administration aura
besoin de routes pour afficher, créer, modifier et supprimer les éléments :

- `GET /api/admin/projects` et `POST /api/admin/projects`
- `PUT /api/admin/projects/:id` et `DELETE /api/admin/projects/:id`
- Les mêmes routes avec `categories`, `skills` ou `labels` à la place de `projects`.

Pour les images :

- `GET /api/admin/images` : afficher les images.
- `POST /api/admin/images` : ajouter une image.
- `DELETE /api/admin/images/:id` : supprimer une image.

Pour les informations du portfolio :

- `GET /api/admin/profile` et `PUT /api/admin/profile` : consulter et modifier le profil.
- `GET /api/admin/activities` et `PUT /api/admin/activities` : consulter et modifier les activités.