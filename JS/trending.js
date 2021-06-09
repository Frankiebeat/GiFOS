import API from './services.js';
const trendingGifsContainer = document.querySelector('.gif-grid')
const sliderLeftbtn = document.querySelector('#slide-left')
const sliderRightBtn = document.querySelector('#slide-right')
let gifsId = [];
let offset = 0;
let sliderOffset = 0;
let containerWidth = 0;


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

            /** Save all of the Trending Gifs ID for the slider */
            sliderLeftbtn.setAttribute('style', 'display:none')
            gifsId = data.map((i) => i.id);
            console.log('gifsId', gifsId)
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

    /*console.log(title, images.fixed_height.url, username)*/

    return `<li class="gif-card" id="gif-id">
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


/** slideBtnHandles */

/** @description Move slider to the right */

const moveSliderRight = () => {
    sliderOffset += 420;
    trendingGifsContainer.scroll({
        left: sliderOffset,
        behavior: "smooth"
    })
    console.log(trendingGifsContainer.scrollLeft)
    sliderLeftbtn.setAttribute('style', 'display:block')

    /** Display none in the right button when the scroll is over */

    if (trendingGifsContainer.scrollLeft >= 13020) {
        sliderRightBtn.setAttribute('style', 'display:none')
    } else {
        sliderRightBtn.setAttribute('style', 'display:block')
    }
}


/** Check the scrollbar position */



const moveSliderLeft = () => {
    sliderOffset += -420;
    trendingGifsContainer.scroll({
        left: sliderOffset,
        behavior: 'smooth'
    })
    console.log(trendingGifsContainer.scrollLeft)

    sliderRightBtn.setAttribute('style', 'display:block')

    if (trendingGifsContainer.scrollLeft <= 420) {
        sliderLeftbtn.setAttribute('style', 'display:none')
    }
}

/** Event listeners */


sliderRightBtn.addEventListener("click", moveSliderRight)
sliderLeftbtn.addEventListener("click", moveSliderLeft)




/** Function Executions */


handleToTrending()