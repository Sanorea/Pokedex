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
            <tr class="descriptionContainer">
                <td class="descriptionText textAbilities">Fähigkeiten</td>
                <td id="abilityContainer"></td>
            </tr>
        </table>
    </div>
    `;
}

function renderAbilityContainerHTML(ability) {
    return /*html*/`
    ${ability}<br>
        `;
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

