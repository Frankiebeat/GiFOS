import API from './services.js';

/** 
 * TRENDING
 * @description brings the GIFS to the TRENDING API 
 */

const handleToTrending = () => {
    API.requestTrending()
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.warn(error);
        })
}

handleToTrending()