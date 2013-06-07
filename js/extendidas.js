
/*
$.fn.extend({
	unaFuncion: function (element) {
		// Codigo aquí 
	},
	otraFuncion: function (element) {
		// Codigo aquí 
	}
});
*/


/*
	$.fn.extend({

		slideInstrucciones: function (cerrarSlide, callbackCerrar) {

			var indexSlide = 0;

			var idDiv = "#" + $(this).attr("id");
			var slideContainer = $(idDiv + " .slide");
			var textosContainer = slideContainer.find(".textos");
			var texto = textosContainer.find(".texto");
			var cuantosTextos = slideContainer.find(".textos").length;
			var botones = slideContainer.find(".botones");
			var botonSig = botones.find(" .siguiente");
			var botonAnt = botones.find(" .anterior");
			var cerrar = slideContainer.find(".cerrar");

			//console.log("Cuantos Textos:\t" + cuantosTextos);

			texto.each(function (i, val) {
				$(this).hide();
			});

			texto.eq(0).show();
			cerrar.hide();
			botonAnt.hide();

			function showSlide (index) {
				stopSong();
				texto.eq(indexSlide).fadeOut(500);
				indexSlide = index;
				texto.eq(indexSlide).delay(300).fadeIn(500);

				var dataAudio = texto.eq(indexSlide).data("audio");

				if (dataAudio !== "" && dataAudio !== "undefined") {
					stopSong();
					audios(dataAudio);
				}

				if(indexSlide <= 0){
					botonAnt.fadeOut(100);
					botonSig.fadeIn(100);
				} else if (indexSlide >= cuantosTextos - 1) {
					if (cerrarSlide === true) {
						cerrar.delay(1000).fadeIn(500);
					}
					botonSig.fadeOut(100);
					botonAnt.fadeIn(100);
				} else if (indexSlide > 0) {
					botonAnt.fadeIn(100);
					botonSig.fadeIn(100);
				}
			}

			cerrar.on("click", function () {
				stopSong();
				slideContainer.fadeOut(700);
				callbackCerrar();
			});

			botonSig.on("click", function () {
				showSlide(indexSlide + 1);
				// console.log(indexSlide)
			});

			botonAnt.on("click", function () {
				showSlide(indexSlide - 1);
				// console.log(indexSlide)
			});

		}
	});
*/



/*==============================
	INICIO VARIABLES GLOBALES
==============================*/


/*==============================
	FIN VARIABLES GLOBALES
==============================*/

/*==============================
	INICIO FUNCIONES MODULO 1
==============================*/


/*==============================
	FIN FUNCIONES MODULO 1
==============================*/
