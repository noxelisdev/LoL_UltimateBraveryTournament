# Gestionnaire de Tournoi _League of Legends_ : _Ultimate Bravery_

Application contenant plusieurs outils permettant de gérer plus facilement et plus efficacement les tournois customs _Ultimate Bravery_ sur _League of Legends_.

## Liste des outils

Actuellement, l'application contient les outils suivants :
* Générateur d'une liste de champions aléatoires
* Générateur d'un stuff complet

### Générateur d'une liste de champions aléatoires

Le générateur de liste de champions aléatoires permet de créer une liste de champions, sélectionnés par tirage au sort parmis la liste des champions existants.

* Vous devrez saisir le nombre de champions désirés avant de lancer la génération (20 par défaut).
* Les champions ne pourront pas apparaître plus d'une fois dans la liste générée.

### Générateur d'un stuff complet

Le générateur de stuff complet permet de générer, pour chaque personnage d'une équipe, une liste d'objets à acheter (dans l'ordre d'achat), les sorts d'invocateurs à jouer, ainsi que le spell du champion que vous devrez maxer en premier.

* La liste des objets ne pourra pas contenir deux fois le même objet pour un même joueur.
* La liste des objets ne prend **pas** en compte les objets incompatibles. Il est cependant possible de regénérer un objet spécifique en cliquant dessus.
* La génération prend en compte le poste du joueur (voir plus bas).
* Pour chaque joueur, l'outil génère des bottes, un objet mythique et 4 objets légendaires (dans cet ordre).

Lors de la génération, vous devrez spécifier les différents champions de l'équipe, ainsi que leur poste.
* Pour un joueur jouant support, l'outil lui attribuera l'un des objets de support, avant de lui générer le reste des objets.
* Pour un joueur jouant jungle, l'outil lui attribuera l'un des objets de départ pour le poste de jungle, et lui attribuera automatiquement le sort d'invocateur Châtiment.

## Installation

```bash
git clone https://github.com/InFinity54/LoL_UltimateBraveryTournament.git LoL_UltimateBraveryTournament
cd LoL_UltimateBraveryTournament
yarn install
```

## Développement

(à déterminer)
