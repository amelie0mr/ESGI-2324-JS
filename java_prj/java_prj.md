# Projet java script année 2023-2024
## Amélie MAIER B1 ESGI
### Questions de l'examen
* Comment structurer une page HTML pour afficher une liste de pokémon et un formulaire de recherche?
```html
//On peut utiliser des div et des countaineur comme je l'ai fait ci dessous
<div class="">
    <label for="site-search">Search the Pokémon:</label>
    <input type="search" id="site-search" name="q" class="search" />     
</div>
// avec un input type search pour la barre de recherche
// pour la liste de pokemon:
<div class="container">
    <center><h1 class="mt-5">Liste des Pokémon</h1></center>
    <div id="pokemon-cards" class="row mt-3"></div>
</div>
// ici un countainer contenant le titre et un div pour les cartes le container vas permettre de plus structurer la page

```

* Comment récupérer et afficher une liste initiale de pokemon avec l'api pokeapi
```js
// pour afficher une liste de pokemon initiale, on vas chercher le lien fetch de l'api:
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
// grace a ce lien (entre autre) on pourras avoir accès aux 151 premiers pokemons
// mais aussi grave à une fonction qui va dire d'afficher toute la liste des pokemon en disant de les ajouter dans les div correspondant dans le html
function fetchPokemonData(pokemonUrl) { // Fonction pour la récupération des informations d'un Pokémon spécifique
    fetch(pokemonUrl)
      .then(response => response.json())  
      .then(pokemonData => {  //si la réponse n'a pas d'erreurs
        const pokemonCard = createPokemonCard(pokemonData); //créer une carte pour le pokemon
        pokemonCardsContainer.appendChild(pokemonCard); //ajouter la carte au countainer
      })
      .catch(error => {
        console.error('Erreur', error);   // si il y'a erreur
      });
  }

```

* comment explorer l'api pour trouver les informations nnécessaires?

```js
// on peut trouver les informations nécéssaires grace à une commande de la forme ${pokemonData.information}
<div class="card">
    <img src="${data.sprites.front_default}" alt="${data.name}" class="card-img-top">
    <h5>${data.name}</h5>
    <p>Height: ${data.height}</p>
    <p>Weight: ${data.weight}</p>    
</div>
```

* Comment implémenter une fonctionnalité de recherche pour trouver des pokemon pas leur numéro?

```js
// Pour la recherche il faut une fonction en rapport avec l'input dans le html 
function searchPokemon() {  // fonction pour la recherche des pokemon
      var searchTerm = searchInput.value.toLowerCase();
      // Effectuer une requête à l'API pour obtenir les informations sur le Pokémon recherché
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
          .then(response => response.json())
          .then(data => {
              var pokemonCard = ` //affichage de la card résultat de la recherche
                  <div class="card">
                      <img src="${data.sprites.front_default}" alt="${data.name}" class="card-img-top">
                      <h5>${data.name}</h5>
                      <p>Height: ${data.height}</p>
                      <p>Weight: ${data.weight}</p>    
                  </div>
              `;
              pokemonCardSearchContainer.innerHTML = pokemonCard; //afficher la carte résultat dans le div correspondant dans le html
          })
          .catch(error => { // au cas ou il y'aurais une erreur lors de la récupération
              console.log("Pokémon not found.");
              pokemonCardSearchContainer.innerHTML = "<p>error</p>";
          });
  }

// ou l'on va dans la même fonction faire la forme html dans la quelle on voudrais que les données s'affichent
// mais il y'a aussi:
searchInput.addEventListener("input", searchPokemon);
// un event listener qui va activer la fonction recherche lorsque l'on va taper le nom du pokemon ou son identifiant
```
* Comment gérr les erreurs, comme une recherche qui ne retourne aucun résultat?
```js
// On regle les erreurs avec des promesses comme celles ci:
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')  // appeler l'api pokemon et fonction pour reécupérer les informations
    .then(response => response.json())
    .then(data => {
      // Pour chaque Pokémon, créer une carte Bootstrap et l'ajouter au conteneur
      data.results.forEach(pokemon => {
        fetchPokemonData(pokemon.url);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération de la liste des Pokémon:', error);
    });
```

* Comment manipuler les objets et tableaux retournés par l'api pour afficher les informations des pokemon


* Comment utiliser fetch pour faire des repuêtes asynchrones et traiter les données retournées?


* Comment travailler avec le format json pour extraire les données retournées par l'api
