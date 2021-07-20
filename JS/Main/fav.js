import API from "../Services/services.js"
import { favs } from "../Services/services.js"

let nofav = document.querySelector(".no-fav-gifs")


/* if there's no favs, display the "No Fav" div  */ 
if (favs.length == 0) 
{ nofav.setAttribute("style", "display:block")}
else {nofav.setAttribute("style", "display:none")}

console.log(favs)

const searchContainer = document.querySelector(".search-gif-grid")



/**
 * @description
 * brings the data of a specified gif trough its ID 
 */

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
            <i class="fas fa-trash fav" id="${id}"></i>
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