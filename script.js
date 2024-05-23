const searchButton = document.getElementById("search-button");

const pokeSprite = document.getElementById("sprite");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const types = document.getElementById("types");
const pokeHp = document.getElementById("hp");
const pokeAttack = document.getElementById("attack");
const pokeDefense = document.getElementById("defense");
const pokeSpecialAttack = document.getElementById("special-attack");
const pokeSpecialDefense = document.getElementById("special-defense");
const pokeSpeed = document.getElementById("speed");
const errorMessage = document.getElementById("error-message");

//freecodecamp API
// const pokedex = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokedex = "https://pokeapi.co/api/v2/pokemon";

const searchPokemon = () => {
    const searchInput = document.getElementById("search-input");

    if(searchInput.value.toLowerCase() == 'rick') {
        console.log('Rickrolled!');

        let rickWrapper = document.getElementById('_what_is_this');
        let rick = document.getElementById('rick');
        let pokemonInfo = document.getElementById('pokemon_info');

        function openFullscreen() {
            if (rick.requestFullscreen) {
                rick.requestFullscreen();
            } else if (rick.webkitRequestFullscreen) { /* Safari */
                rick.webkitRequestFullscreen();
            } else if (rick.msRequestFullscreen) { /* IE11 */
                rick.msRequestFullscreen();
            }
        }

        pokemonInfo.classList.add('hidden');
        rickWrapper.classList.remove('hidden');
        rick.setAttribute('autoplay','autoplay');
        rick.play();
        openFullscreen();


    } else {
        let url = "";

        if (!isNaN(parseInt(searchInput.value))) {
            url = `${pokedex}/${searchInput.value}`;
        } else {
            url = `${pokedex}/${searchInput.value.toLowerCase()}`;
        }

        fetch(`${url}`)
            .then((res) => res.json())
            .then((data) => {
                const pokemonTypes = [];

                for (let i = 0; i < data["types"].length; i++) {
                    pokemonTypes.push(
                        `<span>${data["types"][i]["type"]["name"]}</span>`
                    );
                }

                pokeSprite.src = data["sprites"]["front_default"];
                console.log(data);
                pokeName.textContent = data["name"];
                pokeId.textContent = data["id"];
                pokeWeight.textContent = data["weight"];
                pokeHeight.textContent = data["height"];
                types.innerHTML = pokemonTypes.join(", ");
                pokeHp.textContent = data["stats"][0]["base_stat"];
                pokeAttack.textContent = data["stats"][1]["base_stat"];
                pokeDefense.textContent = data["stats"][2]["base_stat"];
                pokeSpecialAttack.textContent = data["stats"][3]["base_stat"];
                pokeSpecialDefense.textContent = data["stats"][4]["base_stat"];
                pokeSpeed.textContent = data["stats"][5]["base_stat"];

                // Hide the error message if the fetch is successful
                errorMessage.style.display = "none";
            })
            .catch((err) => {
                // Show the error message if the fetch fails
                errorMessage.style.display = "block";
                console.error("Error fetching Pokémon data:", err);
            });
    }
};

searchButton.addEventListener("click", searchPokemon);
