import API from "../Services/services.js"
import { favs } from "../Services/services.js"
import { handleGifExpand, handleGifDownload, markup, addEventFav } from "./main.js";


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


handleFavGifs()
favcheck()