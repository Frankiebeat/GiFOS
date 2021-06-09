import API from './services.js';

const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
let searchOffset = 0;
let SEARCH_LIMIT = 10;


/** 
 * @description Searches the GIFS in relation to the string entered
 * @param
 */

const handleToSearch = () => {
    API.requestSearch()
        .then((response) => {
            console.log(response)
            searchOffset = searchOffset + SEARCH_LIMIT;
        })
        .catch((error) => {
            console.warn(error);
        })


}

const searcherAutoCom = document.querySelector("#search-list");
const searcherCross = document.querySelector("#times-search")

/** 
 * @description Brings the autocom menu when input is clicked
 */

const handleSearchInput = () => {
    searcherAutoCom.classList.remove('dis-n');
    searcherCross.classList.add('dis-b', 'times-search')
    btnSearch.classList.add('btn-search-active')
}

const closeSearchInput = () => {
    searcherAutoCom.classList.add('dis-n')
    searcherCross.classList.remove('dis-b', 'times-search')
    btnSearch.classList.remove('btn-search-active')
}

searcherCross.addEventListener('click', closeSearchInput);
inputSearch.addEventListener('click', handleSearchInput);
btnSearch.addEventListener("click", handleToSearch);

handleToSearch()