import API from './services.js';
const trendingGifsContainer = document.querySelector('#gif-grid')
var count = [];



/** 
 * TRENDING
 * @description brings the GIFS to the TRENDING API 
 */

const handleToTrending = () => {
    API.requestTrending()
        .then((response) => {
            const {
                data,
                pagination
            } = response;
            let trendingGifs = "";
            console.log(data, pagination)

            for (let i = 0; i < data.length; i++) {
                trendingGifs += markup(data[i])
            }

            /** @description Start painting trending gifs */
            trendingGifsContainer.innerHTML = trendingGifs;
        })

        .catch((error) => {
            console.warn(error);
        })




}


/** Paint Trending section GIFS */

const markup = (trendingGifs) => {
    const {
        title,
        images,
        username
    } = trendingGifs;
    /*console.log(title, url, username) */
    return `<li class="gif-card">
    <div class="hover-div">
        <img src=${images.fixed_height.url} alt""/>

        <div class="gif-actions">
            <i class="far fa-heart"></i>
            <i class="fas fa-download"></i>
            <i class="fas fa-expand-alt"></i>
        </div>

        <div class="gif-info">
            <p class="gif-user">${username}</p>
            <p class="gif-title">${title}</p>
        </div>
    </div>`
}

handleToTrending()