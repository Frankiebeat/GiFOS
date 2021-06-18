/** PATHS */
const API_KEY = "aRqS8UlEl1BptpJk79iC8dffVAezjF7g";
const ENDPOINT = "http://api.giphy.com/v1/gifs/";

/** VARIABLES */
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
const searchContainer = document.querySelector(".search-gif-grid")
const searchResults = document.querySelector("#search-title")
const searchbarBottom = document.querySelector('.searchbarbottom');
const AutoCom = document.querySelector('.autocom-box');
const btnVerMas = document.querySelector('.ver-mas');

let searchOffset = 0;
let SEARCH_LIMIT = 12;

/** DATA */
let allGifs = [];
let totalGifs = 0;

/* SEARCH */

/** Autocom API Connection */

/** @description Connection to AUTOCOM API
 * @param limit
 * @param offset
 * @type String
 */

const requestAutoCom = (searchValue) => {
    return new Promise((resolve, reject) => {
        fetch(`http://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${searchValue}`)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(`Error ${error}`));
    })
}

/** HANDLE AUTOCOM 
 * @description Request the autocom suggests when the user starts typing
 * @param limit 
 * @param offset 
 */

const handleAutoCom = (SearchCross = false) => {
    const searchValue = inputSearch.value;
    requestAutoCom(searchValue)
        .then((response) => {
            const {
                data
            } = response;
            console.log(data)
            console.log('Svalue', searchValue)

            let list = "";
            let restoreSearch = '';

            restoreSearch = `<hr><li><img src="/Assets/icon-search.svg" alt="icon-search">Sugerencia</li>
                <li><img src="/Assets/icon-search.svg" alt="icon-search">Sugerencia</li>
                <li><img src="/Assets/icon-search.svg" alt="icon-search">Sugerencia</li>
                <li><img src="/Assets/icon-search.svg" alt="icon-search">Sugerencia</li>`;
            AutoCom.innerHTML = restoreSearch;



            if (data.length) {
                /** @description Loop Markup and Paiting */
                for (let i = 0; i < data.length; i++) {
                    list += markUpAutocom(data[i])
                    AutoCom.innerHTML = list;

                }

                addEventAutoComplete()

            } else {
                AutoCom.innerHTML = restoreSearch;

            }

            if (SearchCross == true) {
                AutoCom.innerHTML = restoreSearch;
            }

        })

        .catch((error) => reject(`Error ${error}`));
}

const markUpAutocom = (list) => {
    const {
        name
    } = list
    return `<hr>
    <li class="item-autocom" id="value-${name}"><img src="/Assets/icon-search.svg" alt="icon-search"> ${name} </li>`
}

/* Search API connection */

/**
 * @description Connection to SEARCH API
 * @param offset
 * @param limit
 * @param random_id
 * @returns Promise
 */

const requestSearch = () => {
    return new Promise((resolve, reject) => {
        fetch(`${ENDPOINT}search?api_key=${API_KEY}&q=${inputSearch.value}&limit=${SEARCH_LIMIT}&offset=${searchOffset}`)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(`Error ${error}`));
    });
}

/**  HANDLE SEARCH
 * @description Searches the GIFS in relation to the string entered
 * @param !Seemore = False ==> If true Changes offset and brings new Gifs
 */

const handleToSearch = (SeeMore = false) => {
    console.log(SeeMore)

    if (SeeMore == true) {
        searchOffset = totalGifs;
    } else {
        allGifs = []
        totalGifs = 0;
        searchOffset = 0;
    }
    searcherAutoCom.classList.add('dis-n');

    requestSearch()
        .then((response) => {
            const {
                data,
                pagination
            } = response;
            console.log("Search Gifs Info", data, pagination)

            let searchTitle = '';
            let Gifs = '';

            /** @description Save data */
            allGifs.push(data)
            totalGifs += data.length;

            /** @description Loop Markup */
            for (let i = 0; i < data.length; i++) {
                Gifs += markup(data[i])
            }

            /** @description Start painting searchbar title  */
            searchTitle += markupTitle(inputSearch.value);
            searchResults.innerHTML = searchTitle;
            searchTitle.toUpperCase;


            /** @descrpition If "Ver Más" is clicked, 12 more gifs are brought if not, offset is then set to 0 again */
            if (SeeMore == true) {
                searchContainer.innerHTML += Gifs;
            } else {
                searchContainer.innerHTML = Gifs;
            }

            /** @description Remove Searchbar Bottom */
            searchbarBottom.classList.add('dis-n');

            /** @ descrpiton If offset is == 36, "ver más" dissapears */
            if (totalGifs < 48) {
                btnVerMas.classList.remove('dis-n');
            } else {
                btnVerMas.classList.add('dis-n');
            }
        })

        .catch((error) => {
            console.warn(error);
        })
}

/** GIFS MARKUP  */

/** Paint Search section TITLE */
const markupTitle = (searchTitle) => {
    return `<hr>
    <h1> ${searchTitle} </h1>`
}

/** Paint Search section GIFS */
const markup = (Gifs) => {
    const {
        title,
        images,
        username
    } = Gifs;

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

/** AUTOCOM BOX  */

const searcherAutoCom = document.querySelector("#search-list");
const searcherCross = document.querySelector("#times-search")

/** 
 * @description Adds the Event 'Click' to the autocom Items
 */

const addEventAutoComplete = () => {
    const autocomItem = document.querySelectorAll('.item-autocom')

    autocomItem.forEach((autocomItem) => {
        autocomItem.addEventListener('click', handleAutoComItem)
    })
}

/**
 * @description Replaces the input with selected Item and executes handleToSearch
 */

const handleAutoComItem = () => {
    inputSearch.value = event.target.id.replace('value-', '')
    handleToSearch();

}

/** 
 * @description Brings the autocom menu when input is clicked
 */

const handleSearchInput = () => {
    searcherAutoCom.classList.remove('dis-n');
    searcherCross.classList.add('dis-b', 'times-search')
    btnSearch.classList.add('btn-search-active')
}


/** 
 * @description Closes the autocom menu when cross is clicked
 */

const closeSearchInput = () => {
    searcherAutoCom.classList.add('dis-n')
    searcherCross.classList.remove('dis-b', 'times-search')
    btnSearch.classList.remove('btn-search-active')
    inputSearch.value = "";
}

/** EVENTS  */

searcherCross.addEventListener('click', closeSearchInput);
inputSearch.addEventListener('input', handleAutoCom)
inputSearch.addEventListener('click', handleSearchInput);
btnSearch.addEventListener("click", handleToSearch);
btnVerMas.addEventListener('click', () => handleToSearch(true));