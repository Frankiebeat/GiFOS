import API from "../Services/services.js";
import { favs } from "../Services/services.js";
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
            <i class="fas fa-expand-alt expand" id="${id}"></i>
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
	const btnExpand = document.querySelectorAll(".expand")

	btnExpand.forEach((item) => {
		item.addEventListener('click', () => handleGifExpand(item));
	})

	btnFav.forEach((item) => {
		item.addEventListener('click', () => handleGifId(item));
	});
};

/** Handle EXPAND Gif */

export const handleGifExpand = (item) => {
	let id = document.getElementById(item.id)
	id = id.id;
	API.requestSingleGifId(id)
	.then((response) => {
		const { 
			data, pagination
		} = response; 
		console.log(response)

		let expandGif = "";

		expandGif = paintModal(data[0])
		modalContainer.innerHTML = expandGif;
		const timesModal = document.querySelector(".times-modal-x")
		timesModal.setAttribute("style", "display:block")
		timesModal.addEventListener("click", handleTimesModal)

	})
	modal.setAttribute("style", "display:block")


	console.log(id)
}

const paintModal = (expandGif) => { 
	const { title,
		 images, 
		 username, 
		 id } = expandGif;

		 console.log(expandGif)

		 return ` <div class="times-modal">
		 <i class="fa fa-times times-modal-x "></i></div>
		 
		 <img src=${images.fixed_height.url} alt""/>
		 <div class="modal-info">
			 <div class="expand-gif-info">
				 <p> ${username} </p>
				 <h3> ${title} </h3>
			 </div>
			 <div class="expand-gif-actions">
				 <i class="far fa-heart fav" id="${id}"></i>
				 <i class="fas fa-download btn-hover"></i>
			 </div>`;

}

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

/** Add Gif ID to "trendingGifsFav []" */

const handleGifId = (item) => {
	let fav = document.getElementById(item.id);
	let trendingGifsFav = JSON.parse(localStorage.getItem('fav'));
	
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