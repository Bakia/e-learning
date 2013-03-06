var preload=true;
var currentAudio="";



/* 
	SI NO HAY AUDIOS: 
		
		- DESCOMENTAR LAS SIGIUENTES LINEAS 
		- COMENTAR EL JAVASCRIPT DE PANO DE CADA HTML 

*/
/*
$(document).ready(function(e) {
    listo();
});
function stopSong(){
	//console.log("parar audio");
}
function playSong(){
	//console.log("play audio");
}
*/

function listo(){
	if(preload){
		$("body").queryLoader2({
			barColor: "#6c1f7f",
			backgroundColor: "#ffffff",
			onComplete:init,
			percentage: true,
			barHeight: 1,
			completeAnimation: "grow",
			minimumTime: 500
		});
	}else{
		init();
	}
}
function init(){
	
	$("body").elearningHTML({
		onInitComplete:iniciar,
		widthSlide:960
	});
}
function audios(cual){
	currentAudio=cual+"";
	playSong(cual);
}


function iniciar(){

	/*		INICIO FUNCIONES MODULO 1		*/
	

	/*		FIN FUNCIONES MODULO 1			*/
	
}

function terminoaudio(){
	//console.log(currentAudio);
	switch(currentAudio){
			
			/*
			case "1":
				$("body").elearningHTML('showSeccion',(currentIndex + 1));
			break;
			*/

			/*		INICIO AUDIOS MODULO 1		*/
			
			/*case "2":
				stopSong();
				audios("3");
			break;*/
			
			/*		FIN AUDIOS MODULO 1			*/
				
								
			default:
				// $("#derecha").fadeIn();
			break;
			
	}
}




// MOSTRAR FLECHAS
function mostrarFlechaDer () {
	$("#derecha").fadeIn(300);
}
function mostrarFlechaIzq () {
	$("#izquierda").fadeIn(300);
}
function mostrarFlechas () {
	$("#izquierda").fadeIn(300);
	$("#derecha").fadeIn(300);
}






