import API from "../Services/services.js"
<<<<<<< Updated upstream
import { favs } from "../Services/services.js"

console.log(favs)
=======
import { allFavs } from "../Services/services.js"
>>>>>>> Stashed changes

const searchContainer = document.querySelector(".search-gif-grid")

const handleFavGifs = () => {
    API.requestGifId()
    .then((response) => {
        const {data} = response;
        console.log(response)
        let favGifs = "";

        for (let i = 0; i < data.length; i++) {
            favGifs += markup(data[i]);
        }

        searchContainer.innerHTML = favGifs;


    })}


/** Paint FAV section GIFS */
const markup = (favGifs) => {
	const {
		title,
		images,
		username,
		id
	} = favGifs;

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


handleFavGifs()