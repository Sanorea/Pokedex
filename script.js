
let allPokemon;
let pokemon = [];
let pokemonName = [];
let pokemonSearch = [];


async function init() {
    await loadPokemon();
    renderPokemonCard();
    searchPokemon();
    hideLoader();
}


async function loadPokemon() {
    for (let i = 1; i < 51; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        allPokemon = await response.json();
        pokemon.push(allPokemon);
    }
}


async function renderPokemonCard() {
    let container = document.getElementById('previewCard');
    container.innerHTML = '';
    pokemonName = [];
    for (let i = 0; i < pokemon.length; i++) {
        let name = pokemon[i]['name'];
        pokemonName.push(name);
        let nameToUpperCase = setFirstLetterUppercase(name)
        let image = pokemon[i]['sprites']['other']['official-artwork']['front_shiny'];
        let pokemonId = pokemon[i]['id'];
        let pokemonIdZeros = addZerosOnId(pokemonId);
        let { typeColorBgLeft, typeColorBgRight } = getBgColor(i);
        container.innerHTML += renderPokemonCardSmalHtml(nameToUpperCase, image, i, pokemonIdZeros, typeColorBgLeft, typeColorBgRight);
        renderTypeContainer(i);
    }
}


function setFirstLetterUppercase(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function getBgColor(i) {
    let typeColorBgLeft = getTypeColorBg(pokemon[i].types[0].type.name);
    let typeColorBgRight;
    if (pokemon[i].types.length === 1) typeColorBgRight = getTypeColorBg(pokemon[i].types[0].type.name);
    else typeColorBgRight = getTypeColorBg(pokemon[i].types[1].type.name);
    return { typeColorBgLeft, typeColorBgRight };
}


function renderTypeContainer(i) {
    let typeContainer = document.getElementById(`typeContainer${i}`);
    for (let j = 0; j < pokemon[i]['types'].length; j++) {
        let typ = pokemon[i]['types'][j]['type']['name'];
        let typeColor = getTypeColor(pokemon[i].types[j].type.name);
        typeContainer.innerHTML += renderTypeContainerHtml(typ, typeColor);
    }
}


function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
}


async function loadNextPokemon() {
    let currentCount = pokemon.length + 1;
    let endcount = currentCount + 21;
    showLoader()
    for (let a = currentCount; a < endcount; a++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${a}`;
        let response = await fetch(url);
        let nextPokemonArray = await response.json();
        pokemon.push(nextPokemonArray);
    }
    renderPokemonCard();
    hideLoader();
}


// Pokedex-Card

function renderPokedexCard(i) {
    loadPokedexCard();
    getData(i);
    loadAbout(i);
}


async function getData(i) {
    let pokedexContainer = document.getElementById('pokedex-bg');
    let name = pokemon[i]['name'];
    let nameToUpperCase = setFirstLetterUppercase(name);
    let image = pokemon[i]['sprites']['other']['official-artwork']['front_shiny'];
    let id = pokemon[i]['id'];
    let idFormatted = addZerosOnId(id);
    let { typeColorBgLeft, typeColorBgRight } = getBgColor(i);
    pokedexContainer.innerHTML = '';
    pokedexContainer.innerHTML += renderPokedexCardHtml(nameToUpperCase, image, idFormatted, typeColorBgLeft, typeColorBgRight, i);
}


function addZerosOnId(id) {
    let widthId = 3;
    let numStr = id.toString();
    let zerosToAdd = widthId - numStr.length;
    for (let i = 0; i < zerosToAdd; i++) {
        numStr = '0' + numStr;;
    }
    return numStr;
}


function loadBaseStats(i) {
    toggleVisibility('menuAbout', true, className = "pokedexMenu-p-activ");
    toggleVisibility('menuBaseStats', false, className = "pokedexMenu-p-activ");
    let aboutContainer = document.getElementById('aboutSection');
    aboutContainer.innerHTML = '';
    aboutContainer.innerHTML = renderBaseStatsSectionHtml(i);
    renderChart(i);
}


function loadAbout(i) {
    toggleVisibility('menuAbout', false, className = "pokedexMenu-p-activ");
    toggleVisibility('menuBaseStats', true, className = "pokedexMenu-p-activ");
    let aboutContainer = document.getElementById('aboutSection');
    aboutContainer.innerHTML = '';
    aboutContainer.innerHTML = renderAboutSectionHtml(i);
    renderAbilityContainer(i);
}


function renderAbilityContainer(i) {
    let abilityContainer = document.getElementById('abilityContainer');
    abilityContainer.innerHTML = '';
    for (let j = 0; j < pokemon[i]['abilities'].length; j++) {
        let ability = pokemon[i]['abilities'][j]['ability']['name'];
        abilityContainer.innerHTML += renderAbilityContainerHTML(ability)
    }
}


function loadPokedexCard() {
    document.getElementById('pokedex-bg').classList.remove('d-none');
}


function hidePokedexCard() {
    document.getElementById('pokedex-bg').classList.add('d-none');
}


function stopPropagation(event) {
    event.stopPropagation();
}


function searchPokemon() {
    let inputField = document.querySelector("#inputSearch");
    let container = document.getElementById("previewCard");
    inputField.addEventListener("input", function () {
        let search = inputField.value.toLowerCase();
        let assignedIndices = pokemonName.reduce((indices, poke, index) => {
            if (poke.toLowerCase().includes(search)) {
                indices.push(index);
            }
            return indices;
        }, []);
        container.innerHTML = '';
        renderSearchPokemon(assignedIndices, container)
    });
}


function renderSearchPokemon(assignedIndices, container) {
    assignedIndices.forEach(index => {
        let name = pokemon[index]['name'];
        let nameToUpperCase = setFirstLetterUppercase(name);
        let image = pokemon[index]['sprites']['other']['official-artwork']['front_shiny'];
        let pokemonId = pokemon[index]['id'];
        let pokemonIdZeros = addZerosOnId(pokemonId);
        let { typeColorBgLeft, typeColorBgRight } = getBgColor(index);
        container.innerHTML += renderPokemonCardSmalHtml(nameToUpperCase, image, index, pokemonIdZeros, typeColorBgLeft, typeColorBgRight);
        renderTypeContainer(index);
    });
}


function previewPokemon(i) {
    if (i === 0) {
        renderPokedexCard(i);
    } else {
        i--;
        renderPokedexCard(i);
    }
}


function nextPokemon(i) {

    if (i === pokemon.length - 1) {
        renderPokedexCard(i);
    } else {
        i++;
        renderPokedexCard(i);
    }
}


function toggleVisibility(elementId, show = true, className = "d-none") {
    const element = document.getElementById(elementId);
    show ? element.classList.remove(className) : element.classList.add(className); //wenn show = true, dann führe aus, ansonsten das andere
}


function showLoader() {
    toggleVisibility("loader-id", true);
    toggleVisibility("loader-id", true, "loader-hidden");
}


function hideLoader() {
    toggleVisibility("loader-id", false, "loader-hidden");
}

