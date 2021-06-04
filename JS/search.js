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

btnSearch.addEventListener("click", handleToSearch);

handleToSearch()