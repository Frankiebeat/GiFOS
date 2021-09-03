/** Paint SECTION GIFS */

export const markup = (Gifs) => {
	const {
		title,
		images,
		username,
		id
	} = Gifs;

	/*console.log(title, images.fixed_height.url, username)*/

	return `<li class="gif-card" id="${id}">
    <div class="hover-div">
        <img src=${images.fixed_height.url} alt""/>

        <div class="gif-actions">
            <i class="far fa-heart fav" id="${id}"></i>
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


/** Add GIF BTN EVENTS */

export const addEventFav = () => {
	const btnFav = document.querySelectorAll(".fav");
	const btnExpand = document.querySelectorAll(".expand")
	const btnDownload = document.querySelectorAll(".download")

	btnExpand.forEach((item) => {
		item.addEventListener('click', () => handleGifExpand(item));
	})

	btnDownload.forEach((item) => {
		item.addEventListener('click', () => handleGifDownload(item));
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
		addEventFav()
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

		 return ` 
		 <div class="times-modal">
		 <i class="fa fa-times times-modal-x "></i> </div>
		 
		 <img src=${images.fixed_height.url} alt""/>
		 <div class="modal-info">
			 <div class="expand-gif-info">
				 <p> ${username} </p>
				 <h3> ${title} </h3>
			 </div>
			 <div class="expand-gif-actions">
				 <i class="far fa-heart fav" id="${id}"></i>
				 <i class="fas fa-download download btn-hover" id="${id}"></i>
		     </div>
		 </div>`;

		 
}

// HANDLE GIF DOWNLOAD 

export const handleGifDownload = (item) => {
    let id = document.getElementById(item.id)
        id = id.id;
    
        API.requestSingleGifId(id)
        .then((response) => {
            const { 
                data, pagination
            } = response; 
    
            // get image 
            let gif = response.data[0].images.original.url;
            // get image as blob
        API.requestBlobDownload(gif) 
            .then((response) => {
                let file = response
                 // create new element 
                 let a = document.createElement('a');
                 //use download attribute 
                 a.download = 'GiFOS-Gif';
                 a.href = window.URL.createObjectURL(file);
                 //store download url
                 a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                 a.click();
            }  )
        })}
    

/** Add Gif ID to "GifsFav []" */

export const handleGifId = (item) => {
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