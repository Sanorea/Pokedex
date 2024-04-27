
let allPokemon;
let pokemon = [];
let pokemonName = [];
let pokemonSearch = [];

async function init() {
    await loadPokemon();
    renderPokemonCard();
    searchPokemon();
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

function renderPokemonCardSmalHtml(name, image, i, pokemonId, typeColorBgLeft, typeColorBgRight) {
    return /*html*/`
    <div  onclick="renderPokedexCard(${i})" class="pokemonCardSmal" style="background: linear-gradient(to right, ${typeColorBgLeft} 35%, ${typeColorBgRight} 65%);">
        <h2>${name}</h2>
        <p class="idText">#${pokemonId}</p>
        <div class="containerSmalCard">
            <div class="typeContainer" id="typeContainer${i}"></div>
            <img class="imageSmalCard" src="${image}">    
        </div>
    </div>
    `;
}

function renderTypeContainerHtml(typ, typeColor) {
    return /*html*/`
    <div class="typ" style="background-color: ${typeColor}">${typ}</div>
    `;
}

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
}

async function loadNextPokemon() {
    let currentCount = pokemon.length + 1;
    let endcount = currentCount + 21;
    for (let a = currentCount; a < endcount; a++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${a}`;
        let response = await fetch(url);
        let nextPokemonArray = await response.json();
        pokemon.push(nextPokemonArray);
    }
    renderPokemonCard();
    console.log('pokemonloadMore :>> ', pokemon);
}

// Pokedex-Card

function renderPokedexCard(i) {
    console.log('i-init :>> ', i);
    loadPokedexCard();
    getData(i);
    loadAbout(i);


}

async function getData(i) {
    console.log('pokemon :>> ', pokemon);
    console.log('i :>> ', i);
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

function renderPokedexCardHtml(name, image, id, typeColorBgLeft, typeColorBgRight, i) {
    return /*html*/`
    
    <div class="pokedex-form-bg">
        <div onclick="stopPropagation(event)">
            <img class="arrow" src="./img/linker-pfeil.png" alt="" onclick="previewPokemon(${i})">    
        </div>
        
        <div class="pokedex-form" onclick="stopPropagation(event)">
            <div class="bg-pokedex-upper-image">
                <div id="pokedex" style="background: linear-gradient(to right, ${typeColorBgLeft} 35%, ${typeColorBgRight} 65%)">
                    <h2 id="pokemonName">${name}</h2>
                    <p>#${id}</p>
                </div>
            </div>
            <div class="info-container">
                <div class="image-Container-pokedex-card">
                <img class="imagePokedexCard" src="${image}">                
                </div>
                <div class="pokedexMenu">
                    <p id="menuAbout" class="pokedexMenu-p-activ" onclick="loadAbout(${i})">About</p>
                    <p id="menuBaseStats" onclick="loadBaseStats(${i})">Base Stats</p>
                </div>            
                <div class="infoSection" id="aboutSection"></div>
                <div class="infoSection" id="baseStatsSection"></div>
            </div>
        </div>
        <div onclick="stopPropagation(event)">
            <img class="arrow" src="./img/rechter-pfeil.png" alt="" onclick="nextPokemon(${i})">    
        </div>
        
    </div>        
    `;
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
    setMenuActiv('menuBaseStats');
    setMenuInactiv('menuAbout')
    let aboutContainer = document.getElementById('aboutSection');
    aboutContainer.innerHTML = '';
    aboutContainer.innerHTML = renderBaseStatsSectionHtml(i);
    renderChart(i);

}

function loadAbout(i) {

    setMenuActiv('menuAbout');
    setMenuInactiv('menuBaseStats');
    let aboutContainer = document.getElementById('aboutSection');
    aboutContainer.innerHTML = '';
    aboutContainer.innerHTML = renderAboutSectionHtml(i);

}

function renderBaseStatsSectionHtml() {
    return /*html*/`
    <div class="chartContainer">  
        <canvas id="myChart">test</canvas>
    </div>
    `;
}

function renderAboutSectionHtml(i) {
    return /*html*/`
    <div>
        <table>
            <tr>
                <td class="descriptionText">Grösse</td>
                <td>${pokemon[i]['height'] / 10} m</td>
            </tr>
            <tr>
                <td class="descriptionText">Gewicht</td>
                <td>${pokemon[i]['weight'] / 10} kg</td>
            </tr>
        </table>
    </div>
    `;
}



function setMenuActiv(menuId) {
    document.getElementById(menuId).classList.add('pokedexMenu-p-activ')
}

// function toggleClassLists(menuId, bool, classList) {
//     bool ? document.getElementById(menuId).classList.add(classList) : document.getElementById(menuId).classList.remove(classList);
// }


function setMenuInactiv(menuId, bool, classList) {
    document.getElementById(menuId).classList.remove('pokedexMenu-p-activ');
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

function previewPokemon(i){
    if (i === 0) {
        renderPokedexCard(i);   
        console.log('test :>> ', i);
    } else{
        i--;
        renderPokedexCard(i); 
        console.log('i-preview :>> ', i);    
    }

}

function nextPokemon(i){
   console.log('pokemon :>> ', pokemon.length);
    if (i === pokemon.length-1) {
        renderPokedexCard(i);   
        console.log('test2 :>> ', i);
        console.log('pokemon :>> ', pokemon); 
    } else {
        i++;
        renderPokedexCard(i);        
        console.log('i-next :>> ', i);  
        console.log('pokemon.length :>> ', pokemon.length);
    }

}