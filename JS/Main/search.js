import { handleGifExpand } from "./trending.js";

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
const searchTrendingContainer = document.querySelector('.trending-search')
const searchTrendingItem = document.querySelector('.t-item')

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

const handleAutoCom = () => {
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

            restoreSearch = `<hr><li><i class="fas fa-search"></i>Sugerencia</li>
                <li><i class="fas fa-search"></i>Sugerencia</li>
                <li><i class="fas fa-search"></i>Sugerencia</li>
                <li><i class="fas fa-search"></i>Sugerencia</li>`;

            // AutoCom.innerHTML = restoreSearch;

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
        })

        .catch((error) => reject(`Error ${error}`));
}

const markUpAutocom = (list) => {
    const {
        name
    } = list
    return `<hr>
    <li class="item-autocom" id="value-${name}"><i class="fas fa-search"></i> ${name} </li>`
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

            addEventFav()

            /** @description Remove Searchbar Bottom */
            searchbarBottom.classList.add('dis-n');

            /** @ descrpiton if totalGifs > 48 != 0 , "ver más" appears, If search is null, shows message */
            const nullSearch = document.querySelector('.search-null')
            if (totalGifs < 48 && totalGifs != 0 && data.length >= 12) {
                btnVerMas.classList.remove('dis-n');
                nullSearch.classList.add('dis-n')
            } else if (totalGifs == 0) {
                nullSearch.classList.remove('dis-n')
                btnVerMas.classList.add('dis-n')
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
        username,
        id
    } = Gifs;

    return `<li class="gif-card" id="${id}">
    <div class="hover-div">
        <img src=${images.original.url} alt""/>

        <div class="gif-actions">
            <i class="far fa-heart fav" id="${id}"></i>
            <i class="fas fa-download"></i>
            <i class="fas fa-expand-alt expand" id="${id}"></i>
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

/** TRENDING SEARCH  */

const requestTrendingSearch = () => {
    return new Promise((resolve, reject) => {
        fetch(`http://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(`Error ${error}`));
    })
}

const handleTrendingSearch = () => {
    requestTrendingSearch()
        .then((response) => {
            const {
                data
            } = response
            console.log(data)

            let trendingItem = '';

            let splicedArray = data.splice(0, 5)
            console.log(splicedArray)

            for (let index = 0; index < splicedArray.length; index++) {

                if (index != 4) {
                    trendingItem = markupTrendingSearch(splicedArray[index] + ',')
                } else {
                    trendingItem = markupTrendingSearch(splicedArray[index] + '.')
                }
                searchTrendingContainer.innerHTML += trendingItem;
            }

            addEventTrendingSearch()
            

        })
        .catch((error) => (`Error ${error} en HandleTrendingSearch`));
}

/** @description MarkUp for each trending search item */

const markupTrendingSearch = (trendingItem) => {
    const {
        data
    } = trendingItem;
    return `<li class="t-item"> ${trendingItem}</li>
`;
}

/**
 * @description Replaces the input with selected Item and executes handleToSearch
 */

const handleTrendingSearchItem = () => {
    inputSearch.value = event.target.innerText.slice(0, -1);
    handleToSearch();

}

/** @description Add events to each trending search item
 */

const addEventTrendingSearch = () => {
    const trendingSearchItem = document.querySelectorAll('.t-item')

    trendingSearchItem.forEach((trendingSearchItem) => {
        trendingSearchItem.addEventListener('click', handleTrendingSearchItem)
    })
}


/** Add Event Fav on Searchbar Gifs Btns */

const addEventFav = () => {
    const btnFav = document.querySelectorAll(".fav");
    const btnExpand = document.querySelectorAll(".expand")

    btnExpand.forEach((item) => {
		item.addEventListener('click', () => handleGifExpand(item));
	})

    btnFav.forEach((item) => {
        item.addEventListener('click', () => handleGifId(item));
    });
};

/** Add Gif ID to "favGif []" */

const handleGifId = (item) => {
    let searchbarGifsFav = JSON.parse(localStorage.getItem('fav'));
    let fav = document.getElementById(item.id);
    /** If the id is not already included, the ID is pushed, else, its removed. */

    if (searchbarGifsFav == null) { 
		searchbarGifsFav = [];
		localStorage.setItem('fav', searchbarGifsFav)
	}
	if (!searchbarGifsFav.includes(fav.id)) {
		searchbarGifsFav.push(fav.id)
		localStorage.setItem('fav', JSON.stringify(searchbarGifsFav))
	} else {
		searchbarGifsFav.splice(searchbarGifsFav.indexOf(fav.id), 1)
		localStorage.setItem('fav', JSON.stringify(searchbarGifsFav))
    }
    console.log('searchbarFav', searchbarGifsFav)
    console.log("item", item.id);
};


/** EVENTS  */

searcherCross.addEventListener('click', closeSearchInput);
inputSearch.addEventListener('input', handleAutoCom);
inputSearch.addEventListener('click', handleSearchInput);
btnSearch.addEventListener("click", handleToSearch);
btnVerMas.addEventListener('click', () => handleToSearch(true));


handleTrendingSearch()