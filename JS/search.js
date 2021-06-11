import API from './services.js';

const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
const searchContainer = document.querySelector(".search-gif-grid")
const searchResults = document.querySelector("#search-title")
let searchOffset = 0;
let SEARCH_LIMIT = 10;


/** 
 * @description Searches the GIFS in relation to the string entered
 * @param
 */

const handleToSearch = () => {
    API.requestSearch()
        .then((response) => {
            const {
                data,
                pagination
            } = response;
            let searchGifs = ""
            let searchTitle = '';
            console.log("Search Gifs", data, pagination)
            searchOffset = searchOffset + SEARCH_LIMIT;

            for (let i = 0; i < data.length; i++) {
                searchGifs += markup(data[i])
            }

            /** @description Start painting searchbar title  */
            searchTitle += markupTitle(inputSearch.value)
            searchResults.innerHTML = searchTitle;

            /** @description Start painting searchbar gifs */
            searchContainer.innerHTML = searchGifs;

        })

        .catch((error) => {
            console.warn(error);
        })


}

/** Paint Search section TITLE */
const markupTitle = (searchTitle) => {
    return `<hr>
    <h1> ${searchTitle} </h1>`
}

/** Paint Search section GIFS */
const markup = (searchGifs) => {
    const {
        title,
        images,
        username
    } = searchGifs;

    return `<li class="gif-card">
    <div class="hover-div">
        <img src=${images.original.url} alt""/>

        <div class="gif-actions">
            <i class="far fa-heart"></i>
            <i class="fas fa-download"></i>
            <i class="fas fa-expand-alt"></i>
        </div>

        <div class="gif-info">
            <p class="gif-user">${username}</p>
            <p class="gif-title">${title}</p>
        </div>
    </div>
    </li>`
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