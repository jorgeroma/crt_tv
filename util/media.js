
import {media_data} from '../media_data.js';

const getDatos = () => {
	try{
		const {selected, rotate, media} = media_data;
		// console.log(selected, rotate, media);
		return {selected, rotate, media};
	}catch(error){
		console.error('Error leyendo archivo', error);
	}

	return null;
};


const selTypeData = (media) => {
	if (media['type'] == "youtube") {
		attachYoutube(media['url']);
	} else if (media['type'] == "video") {
		attachVideo(media['url']);
	}else if (media['type'] == "image") {
		attachImage(media['url']);
	}
};

const playRandomMedia = () => {
	// console.log(getDatos());

	let {selected, rotate, media} = getDatos()
	console.log(media);
	try{

		var mediaSelected = null;
		if (!media) return;
		if (rotate){
			const n = Math.floor(Math.random() * media.length);
			console.log(n);
			mediaSelected = media[n];
		} else {
			mediaSelected = media[selected];
		}
		selTypeData(mediaSelected);
	}catch{
		console.log('Error');
		attachImage('logo.png');
	}
};

const touchToPlay = () => {
	var video = document.getElementById('background-video');
	
	const reproducirVideo = () => {
		video.play(); // Reproducir el video
	};

	document.body.addEventListener('click', reproducirVideo);
}

const getYTId = (url) => {
	return url.split('?v=')[1];
};

const attachYoutube = (url) => {
	const id = getYTId(url);

	const container = document.getElementById('container');

	container.innerHTML = 	`
		<div class="yt-video">
			<iframe height="100%" src="https://www.youtube-nocookie.com/embed/${id}?playlist=${id}&autoplay=1&loop=1&mute=1&controls=0&modestbranding" frameborder="0" allowfullscreen></iframe>
		</div>
	`;
};

const attachVideo = (url) => {
	const container = document.getElementById('container');
	const extension = url.split('.').pop();
	container.innerHTML = 	`
	<video id="background-video" autoplay muted loop >
	<source src="./videos/${url}" type="video/${extension}">
	</video>
	`;
	touchToPlay();
};

const attachImage = (url) => {
	const container = document.getElementById('container');
	
	container.style.backgroundImage = `url('./images/${url}')`;
	container.classList.add("image-container");
	// container.classList.add("terminal");
};




window.addEventListener("load", playRandomMedia);