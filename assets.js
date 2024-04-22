function getTypeColor(type) {
    const typeColors = {
        fire: '#ff0000',
        water: '#6890F0',
        normal: '#a78f6a',
        bug: '#7bb348',
        grass: '#069b12',
        electric: '#d2d455',
        poison: '#6e386a',
        fairy: '#a637b8',
        ground: '#6e5431',
        flying: '#5271b3',
        fighting: '#530808',
        psychic: '#d433bf',
        rock: '#c2a75d',
        steel: '#8d809b',
        ice: '#4bcfe0',
        ghost: '#3d49af',
        dragon: '#563daf',
        dark: '#311f0f',
    };
    return typeColors[type] || '#000000';

}

function getTypeColorBg(type) {
    const typeColorsBg = {
        fire: '#ff000088',
        water: '#6890F088',
        normal: '#a78f6a88',
        bug: '#7bb34888',
        grass: '#069b1288',
        electric: '#d2d45588',
        poison: '#6e386a88',
        fairy: '#a637b888',
        ground: '#6e543188',
        flying: '#5271b388',
        fighting: '#53080888',
        psychic: '#d433bf88',
        rock: '#c2a75d88',
        steel: '#8d809b88',
        ice: '#4bcfe088',
        ghost: '#3d49af88',
        dragon: '#563daf88',
        dark: '#311f0f88',
    };
    return typeColorsBg[type] || '#000000';
}