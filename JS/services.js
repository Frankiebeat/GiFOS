const API_KEY = "aRqS8UlEl1BptpJk79iC8dffVAezjF7g";
const ENDPOINT = "http://api.giphy.com/v1/gifs/";
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
let searchOffset = 0;
let SEARCH_LIMIT = 10;

/* API CONNECTIONS */

export default {
    /* SEARCH */

    /* Search API connection */

    /**
     * @description Connection to SEARCH API
     * @param offset
     * @param limit
     * @param random_id
     * @returns Promise
     */

    requestSearch: () => {
        return new Promise((resolve, reject) => {
            fetch(
                    `${ENDPOINT}search?api_key=${API_KEY}&q=${inputSearch.value}&limit=${SEARCH_LIMIT}&offset=${searchOffset}`
                )
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(`Error ${error}`));
        });
    },

    /* TRENDING */

    /* Trending API connection */

    /** @description Connection to TRENDING API
     *  @param limit = defines how many GIFS are brought,
     *  @param offset = defines the starting position of the array
     *  @returns Promise
     */

    requestTrending(limit, offset) {
        return new Promise((resolve, reject) => {
            fetch(`${ENDPOINT}trending?api_key=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(`Erorr ${error}`));
        });
    },
};