import API from "../Services/services.js"
import { favs } from "../Services/services.js"
import { handleGifExpand, handleGifDownload, handleGifId } from "./trending.js";


let nofav = document.querySelector(".no-fav-gifs")

// Check if user is on "fav"

window.favcheck = function() {
    var check = false;
    if(document.location.pathname === "/Pages/fav.html"){
      check=true;
      }
    console.log(check)
    return check;
}


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
        addEventFav()
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
            <i class="fas fa-download download" id="${id}"></i>
            <i class="fas fa-expand-alt expand" id="${id}"></i>
        </div>

        <div class="gif-info">
            <p class="gif-user">${username}</p>
            <p class="gif-title">${title}</p>
        </div>
    </div> 
    </li>`;
};

const addEventFav = () => {
	const btnTrash = document.querySelectorAll(".fav");
	const btnExpand = document.querySelectorAll(".expand")
	const btnDownload = document.querySelectorAll(".download")

	btnExpand.forEach((item) => {
		item.addEventListener('click', () => handleGifExpand(item));
	})

	btnDownload.forEach((item) => {
		item.addEventListener('click', () => handleGifDownload(item));
	})

	btnTrash.forEach((item) => {
		item.addEventListener('click', () => handleGifId(item));
	});
};



handleFavGifs()
favcheck()