document.addEventListener("DOMContentLoaded", function() {
  const pokemonCardsContainer = document.getElementById("pokemon-cards");
  const searchInput = document.getElementById("site-search");
  const pokemonCardSearchContainer = document.getElementById("pokemon-card-search");

  
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

  function searchPokemon() {  // fonction pour la recherche des pokemon
      var searchTerm = searchInput.value.toLowerCase();
      // Effectuer une requête à l'API pour obtenir les informations sur le Pokémon recherché
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
          .then(response => response.json())
          .then(data => {
            //affichage de la card résultat de la recherche
              var pokemonCard = ` 
                  <div class="card">
                      <img src="${data.sprites.front_default}" alt="${data.name}" class="card-img-top">
                      <h5>${data.name}</h5>
                      <p>Id: ${data.id}</p>
                      <p>Height: ${data.height}</p>
                      <p>Weight: ${data.weight}</p>    
                  </div>
              `;
              pokemonCardSearchContainer.innerHTML = pokemonCard; // afficher la carte résultat dans le div correspondant dans le html
          })
          .catch(error => { // au cas ou il y'aurais une erreur lors de la récupération
              console.log("Pokémon not found.");
              pokemonCardSearchContainer.innerHTML = "<p>error</p>";
          });
  }

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

  // cette partie s'occupe de la liste des pokemons
  function createPokemonCard(pokemonData) {
    const pokemonCard = document.createElement("div");  //créer dans le div
    pokemonCard.classList.add("col-md-4", "mb-3");
    // structure html des cartes avec les informations de l'api dans la forme $ {pokemonData.information}
    pokemonCard.innerHTML = ` 
      <div class="card">
          <center><img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}"></center>
          <div class="card-body">
              <h5 class="card-title">${pokemonData.name}</h5>
              <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                      <h2 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${pokemonData.id}" aria-expanded="false" aria-controls="collapse-${pokemonData.id}">
                          Caracteristics
                      </button>
                      </h2>
                      <div id="collapse-${pokemonData.id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                          <p>Id: ${pokemonData.id}</p>
                          <p>height: ${pokemonData.height}</p>
                          <p>weight: ${pokemonData.weight}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `;
    return pokemonCard;
  }

  searchInput.addEventListener("input", searchPokemon); //rechercher le pokemon quand on met le nom du pokemon dans la barre de recherche
});