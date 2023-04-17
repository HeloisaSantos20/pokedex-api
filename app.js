 //fetch = método moderno que faz requisições Ajax (faz requisições assíncronas para obter dados *sem* que a página precise ser recarregada) no browser. Faz uma requisição HTTP e trás dados da URL que é especificada no argumento



// função que busca os pokemons
const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromisses = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => {
    // esse .then recebe um array com todos os resultados resolvidos de generatePokemonPromisses, gerando um objeto com informações do pokemon em questão. array [{info-pokemon1}, {info-pokemon2}]
    // reduce accumulator - gera a string a cada repetição (iteração), pokemon - objeto que é iterado
    return pokemons.reduce((accumulator, pokemon) => {
        // em cada obj : name (nome do pokemon) -> types (array de obj que especifica o tipo do pokemon) ->  cada obj tem um propriedade type que armazena name (nome do tipo do pokemon)
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        accumulator += `
        <li class = "card ${types[0]}">
            <img class = "card-image" alt= "${pokemon.name}" src="https://raw.githubusercontent.com/RafaelSilva2k22/PokemonImages/main/images/${pokemon.id}.png"/>
            <h2 class = "card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class= "card-subtitle">${types.join(' | ')}</p>
        </li>
         `
        return accumulator
    }, '') // valor inicial da string (vazia)

}

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js = "pokedex"]')
        ul.innerHTML = pokemons
}

const pokemonPromisses = generatePokemonPromisses();

Promise.all(pokemonPromisses)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
    
