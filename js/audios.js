var playerDeAudio;
soundManager.setup({
	url: 'audio/swf/',
	onready: listo,
	debugMode: false,
	ontimeout: function() {
		//error de carga
	}
});

/*
function listo(){
	// alert("listo para play");
}
function terminoaudio(){
	// alert("termino Audio");
}
*/

function playSong(intt)
{
	if(playerDeAudio !== undefined){
		playerDeAudio.destruct();
	}
	playerDeAudio = soundManager.createSound({
		id: 'aSound',
		url: 'audio/mp3/'+intt+'.mp3',
		onfinish:function(){
			playerDeAudio.destruct();
			terminoaudio();
		}
	});

	playerDeAudio.play();
}
function stopSong(){
	if(playerDeAudio !== undefined){
		playerDeAudio.destruct();
	}
}

