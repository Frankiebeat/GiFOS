import API from "../Services/services.js";
import { favs } from "../Services/services.js";
const trendingGifsContainer = document.querySelector(".gif-grid");
const sliderLeftbtn = document.querySelector("#slide-left");
const sliderRightBtn = document.querySelector("#slide-right");

let offset = 0;
let sliderOffset = 0;
let containerWidth = 0;

/** DATA */
let gifsId = [];
let allGifs = [];
let trendingGifsFav = JSON.parse(localStorage.getItem('fav'));


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
			console.log(data, pagination);

			for (let i = 0; i < data.length; i++) {
				trendingGifs += markup(data[i]);
			}

			/** Save Data */
			allGifs.push(data);
			console.log("All Gifs", allGifs);

			/** @description Start painting trending gifs */
			trendingGifsContainer.innerHTML = trendingGifs;

			addEventFav();

			/** Save all of the Trending Gifs ID for the slider */
			sliderLeftbtn.setAttribute("style", "display:none");
			gifsId = data.map((i) => i.id);
			console.log("gifsId", gifsId);
		})

		.catch((error) => {
			console.warn(error);
		});
};

/** Paint Trending section GIFS */
const markup = (trendingGifs) => {
	const {
		title,
		images,
		username,
		id
	} = trendingGifs;

	/*console.log(title, images.fixed_height.url, username)*/

	return `<li class="gif-card" id="${id}">
    <div class="hover-div">
        <img src=${images.fixed_height.url} alt""/>

        <div class="gif-actions">
            <i class="far fa-heart fav" id="${id}"></i>
            <i class="fas fa-download"></i>
            <i class="fas fa-expand-alt"></i>
        </div>

        <div class="gif-info">
            <p class="gif-user">${username}</p>
            <p class="gif-title">${title}</p>
        </div>
    </div> 
    </li>`;
};

/** slideBtnHandles */

/** @description Move slider to the right */

const moveSliderRight = () => {
	sliderOffset += 420;
	trendingGifsContainer.scroll({
		left: sliderOffset,
		behavior: "smooth",
	});
	console.log(trendingGifsContainer.scrollLeft);
	sliderLeftbtn.setAttribute("style", "display:block");

	/** Display none in the right button when the scroll is over */

	if (trendingGifsContainer.scrollLeft >= 13020) {
		sliderRightBtn.setAttribute("style", "display:none");
	} else {
		sliderRightBtn.setAttribute("style", "display:block");
	}
};

/** Check the scrollbar position */

const moveSliderLeft = () => {
	sliderOffset += -420;
	trendingGifsContainer.scroll({
		left: sliderOffset,
		behavior: "smooth",
	});
	console.log(trendingGifsContainer.scrollLeft);

	sliderRightBtn.setAttribute("style", "display:block");

	if (trendingGifsContainer.scrollLeft <= 420) {
		sliderLeftbtn.setAttribute("style", "display:none");
	}
};

/** Add Event Fav on Trending Gifs Btns */

const addEventFav = () => {
	const btnFav = document.querySelectorAll(".fav");

	btnFav.forEach((item) => {
		item.addEventListener('click', () => handleGifId(item));
	});
};

/** Add Gif ID to "trendingGifsFav []" */

const handleGifId = (item) => {
	let fav = document.getElementById(item.id);
	/** If the id is not already included, the ID is pushed, else, its removed. */

	if (trendingGifsFav == null) { 
		trendingGifsFav = [];
		localStorage.setItem('fav', trendingGifsFav)
	}
	if (!trendingGifsFav.includes(fav.id)) {
		trendingGifsFav.push(fav.id)
		localStorage.setItem('fav', JSON.stringify(trendingGifsFav))
	} else {
		trendingGifsFav.splice(trendingGifsFav.indexOf(fav.id), 1)
		localStorage.setItem('fav', JSON.stringify(trendingGifsFav))
	}

	console.log('trendingGifFav', trendingGifsFav)
	console.log("item", item.id);
};

/** Event listeners */

sliderRightBtn.addEventListener("click", moveSliderRight);
sliderLeftbtn.addEventListener("click", moveSliderLeft);

/** Function Executions */

handleToTrending();