const API_KEY = "aRqS8UlEl1BptpJk79iC8dffVAezjF7g";
const ENDPOINT = "http://api.giphy.com/v1/gifs/";

/* API CONNECTIONS */

export default {

    /* TRENDING */

    /* Trending API connection */

    /** @description Connection to TRENDING API
     *  @param limit = defines how many GIFS are brought,
     *  @param offset = defines the starting position of the array
     *  @returns Promise
     */

    requestTrending(limit, offset) {
        return new Promise((resolve, reject) => {
            fetch(`${ENDPOINT}trending?api_key=${API_KEY}&offset=${0}&limit=${36}`)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(`Erorr ${error}`));
        });
    },



    requestGifId() {
        return new Promise((resolve, reject) => {
            fetch(`http://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${searchValue}`)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(`Error ${error}`));
        })
    }


};