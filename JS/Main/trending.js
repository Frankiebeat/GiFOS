import API from "../Services/services.js";
import { handleGifExpand, handleGifDownload, markup, addEventFav } from "./main.js";

const trendingGifsContainer = document.querySelector(".gif-grid");
const sliderLeftbtn = document.querySelector("#slide-left");
const sliderRightBtn = document.querySelector("#slide-right");
export const modal = document.querySelector(".modal");
export const modalContainer = document.querySelector(".modal-content")

let offset = 0;
let sliderOffset = 0;
let containerWidth = 0;

/** DATA */
let gifsId = [];
let allGifs = [];
let trendingGifsFav = [];


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



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
	  modal.style.display = "none";
	}
  }

// Close Modal when X is clicked
const handleTimesModal = () => { 
	modal.setAttribute("style", "display:none")
}


/** Event listeners */


sliderRightBtn.addEventListener("click", moveSliderRight);
sliderLeftbtn.addEventListener("click", moveSliderLeft);

/** Function Executions */

handleToTrending();