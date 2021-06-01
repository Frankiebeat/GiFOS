const API_KEY = 'aRqS8UlEl1BptpJk79iC8dffVAezjF7g';
const ENDPOINT = 'http://api.giphy.com/v1/gifs/';
let SEARCH_LIMIT = 10;
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
let searchOffset = 0;


/* Conexión con la API, EP del search */

const requestSearch = () => {
    return new Promise((resolve, reject) => {
        fetch(`${ENDPOINT}search?api_key=${API_KEY}&q=${inputSearch.value}&limit=${SEARCH_LIMIT}&offset=${searchOffset}`)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(`Error ${error}`));
    })
}

/* Busca los gifos de la palabra ingresada */

const handleToSearch = () => {
    requestSearch()
        .then((response) => {
            console.log(response)
            searchOffset = searchOffset + SEARCH_LIMIT;
        })
        .catch((error) => {
            console.warn(error);
        })
}

btnSearch.addEventListener("click", handleToSearch);





/* TRENDING */


const requestTrending = () => {
    return new Promise((resolve, reject) => {
        fetch(`${ENDPOINT}trending?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((trendingifos) => resolve(trendingifos))
            .catch((error) => reject(`Erorr ${error}`));

    })

}