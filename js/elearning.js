var currentIndex=0;

(function($){
	var slides;
	var opcionesDefecto = {
        onInitComplete: function () {},
		widthSlide:960
	 };
	
	var methods = {
    init : function( options ) { 
		if(options) {
            $.extend(opcionesDefecto, options );
        }
     	
		slides = $(".seccion");
		methods.ordenar();
		
		opcionesDefecto.onInitComplete();
		
		methods.showSeccion(currentIndex);
		$("#derecha").click(function(e) {		
			methods.showSeccion(currentIndex+1); 
		});	
		$("#izquierda").click(function(e) {		
			methods.showSeccion(currentIndex-1); 
		});
		
		$(".siguiente-diapositiva").click(function(e) {		
			methods.showSeccion(currentIndex+1); 
		});
		
		$(".anterior-diapositiva").click(function(e) {		
			methods.showSeccion(currentIndex-1); 
		});	
		$(".ir-a-diapositiva").click(function(e) {	
			var dataId = $(this).data("iddediapositiva");
			if(dataId!=""&&dataId!=undefined){
				var temporalIndex=slides.index($(".secciones #"+dataId));
				methods.showSeccion(temporalIndex); 
			}
		});

		//Nuevo HOVER botones!
		$(".hover").each(function (i, val){
			var boton = $(this);
			boton.hover(function () {
				boton.find("img").eq(0).hide();
				boton.find("img").eq(1).show();
			}, function () {
				boton.find("img").eq(1).hide();
				boton.find("img").eq(0).show();
			})
		});
		
	
    },
	ordenar:function(){
		slides.each(function(index, element) {
			if(index<currentIndex){
				$(this).css("left",-opcionesDefecto.widthSlide);
				$(this).css("opacity",0);
			}else if(index>currentIndex){
				$(this).css("left",opcionesDefecto.widthSlide);
				$(this).css("opacity",0);
			}
			
		});
	
	},
	mostrarPerfil: function () {
		TweenLite.to( $("#barra-perfil"), 0.7, { css:{ top:"0px", opacity: 1}, ease:Circ.easeInOut, onComplete: function () {
			slides.eq(currentIndex).addClass("mostrando-perfil");
			slides.eq(currentIndex).removeClass("mostrar-perfil");
		} })
	},

	ocultarPerfil: function () {
		TweenLite.to($("#barra-perfil"), 0.7, {css:{top: "-70px", opacity: 0}, ease:Circ.easeInOut, onComplete: function () {
			slides.eq(currentIndex).removeClass("mostrando-perfil");
			slides.eq(currentIndex).addClass("mostrar-perfil");
		}})
	},
    showSeccion : function(index) {
		stopSong();
		if (index < 0||index >= slides.length){
			return false;
		}
		$(slides.eq(currentIndex)).trigger('empezoanimaciondesalida', []);

		
		TweenLite.to( slides.eq(currentIndex),0.7, {css:{left:index > currentIndex ? -opcionesDefecto.widthSlide : opcionesDefecto.widthSlide,opacity:1}, ease:Circ.easeInOut,onComplete:function(slide){
				$(slide).trigger('terminaranimaciondesalida', []);
				methods.ordenar();
			},onCompleteParams:[slides.eq(currentIndex)]
			});
		currentIndex=index;
		
		if (currentIndex < 0) currentIndex = slides.length - 1;
        else if (currentIndex >= slides.length) currentIndex = 0;
		
		$(slides.eq(currentIndex)).trigger('empezoanimaciondeentrada', []);

		
		
		TweenLite.to( slides.eq(currentIndex),0.7, {css:{left:0,opacity:1}, ease:Circ.easeInOut, onComplete: function (slide) {
				$(slide).trigger('terminaranimaciondeentrada', []);
				var dataAudio = $(slide).data("audio");
				if(dataAudio != "" && dataAudio !=undefined){
					stopSong();
					audios(dataAudio);
				}
				methods.ordenar();  
		
			},onCompleteParams:[slides.eq(currentIndex)]
		});
							
		switch(slides.eq(currentIndex).data("flechas")){
			
			case "derecha":
				$('#derecha').fadeIn("fast");
				$('#izquierda').fadeOut("fast");
			break;
			
			case "izquierda":
			 	$('#izquierda').fadeIn("fast");
				$('#derecha').fadeOut("fast");
			break;
			
			case "ambas":
				$('#derecha').fadeIn("fast");
				$('#izquierda').fadeIn("fast");
			
			break;
			
			default:
				$('#izquierda').fadeOut("fast");
				$('#derecha').fadeOut("fast");
			break;
		}
		

		 if (slides.eq(currentIndex).hasClass("mostrar-perfil") == true && slides.eq(currentIndex + 1).hasClass("mostrar-perfil") == true ) {
			slides.eq(currentIndex).bind( "terminaranimaciondeentrada", function () {
				methods.mostrarPerfil();
			})
		} else if ( slides.eq(currentIndex).hasClass("mostrar-perfil") == true && slides.eq(currentIndex + 1).hasClass("mostrar-perfil") == false ){
			slides.eq(currentIndex).bind( "terminaranimaciondeentrada", function () {
				methods.mostrarPerfil();
			})
			slides.eq(currentIndex).bind("empezoanimaciondesalida", function () {
				methods.ocultarPerfil();
			})
		}




        if (currentIndex == slides.length-1) {
           	$('#derecha').fadeOut("fast");
		}
		
		if (currentIndex == 0){
			$('#izquierda').fadeOut("fast");
		}
		
    }

  };
	
$.fn.elearningHTML=function(method){
	if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }  
	 };
})(jQuery);



/****** FIN E-LEARNING *******/


/*** PARA SECCIONES INTERNAS ****/


$.fn.extend({

 	seccionInterna: function () {
 		
 		var indexSeccion = 0;
		var idDiv = "#" + $(this).attr("id");
		var interna = $(idDiv + " .interna");
		var flechas = $(idDiv + " .flechas-internas")

		var cuantasInternas = $(idDiv + " .interna").length;

		// oculta todas y muestra la primera
		for (var i = cuantasInternas - 1; i >= 0; i--) {
			$( idDiv + " .interna").eq(i).hide();
		};
		$( idDiv + " .interna").eq(0).fadeIn(500);
	
		

	
		interna.each( function( index, element) {
			if ( index == indexSeccion ){
				$(this).fadeIn(500);
				$(this).css("left",0);
				$(this).css("opacity",1);
			} else if (index > indexSeccion) {
				$(this).hide();
				$(this).css("left",960);
				$(this).css("opacity",0);
			}		
		});		
		function ordenar () {
			interna.each(function(index, element) {
				if(index<indexSeccion){
					$(this).css("left",-960);
					$(this).css("opacity",0);
				}else if(index>indexSeccion){
					$(this).css("left",960);
					$(this).css("opacity",0);
				}
				
			});
		
		}

		function showInterna (index) {
			stopSong();
			
			if (index < 0 || index >= cuantasInternas){
				return false;
			}
			
			$(interna.eq(indexSeccion)).trigger('empezoanimaciondesalidainterna', []);
			
			
			
			
			TweenLite.to( 	interna.eq(indexSeccion),
							0.7,
							{
								css: {	
									display: "none",
									left: index > indexSeccion ? -960 : 960,
									opacity:1
								},
								ease:Circ.easeInOut,
								onComplete:function(slide){
									$(slide).trigger('terminaranimaciondesalidainterna', []);
									ordenar();
							},
							onCompleteParams:[interna.eq(indexSeccion)]
							}
			);
			
			
			
			indexSeccion = index;
			
			

			
			if (indexSeccion < 0) {
				indexSeccion = cuantasInternas - 1;
			} else if (indexSeccion >= cuantasInternas) {
				indexSeccion = 0;
			}
			
			$(interna.eq(indexSeccion)).trigger('empezoanimaciondeentradainterna', []);	
			
			TweenLite.to( 	interna.eq(indexSeccion),
							0.7,
			 				{
			 					css: {
			 						display: "block",
			 						left:0,
			 						opacity:1
			 					},
			 					ease:Circ.easeInOut,
			 					onComplete:function(slide){
									$(slide).trigger('terminaranimaciondeentradainterna', []);
									var dataAudio = $(slide).data("audio");
									if(dataAudio != "" && dataAudio !=undefined){
										stopSong();
										audios(dataAudio);
									}
									ordenar();  
								},
								onCompleteParams:[interna.eq(indexSeccion)]
							}
			);
								
	        

			// Casos Flechas Internas
			switch(interna.eq(indexSeccion).data("flechas")){
				
				case "derecha":
					flechas.find(".derecha").fadeIn(500);
					flechas.find(".izquierda").fadeOut(500);
				break;
				
				case "izquierda":
				 	flechas.find(".izquierda").fadeIn(500);
					flechas.find(".derecha").fadeOut(500);
				break;
				
				case "ambas":
					flechas.find(".derecha").fadeIn(500);
					flechas.find(".izquierda").fadeIn(500);
				
				break;
				
				default:
					flechas.find(".izquierda").fadeOut(500);
					flechas.find(".derecha").fadeOut(500);
				break;
			}


			if (indexSeccion == cuantasInternas - 1) {
	           	$('.derecha').fadeOut(50);
			}
			
			if (indexSeccion == 0){
				$('.izquierda').fadeOut(50);
			}

			
	    }
	    showInterna(indexSeccion);


	    $(".siguiente-interna").on("click", function () {
	    	showInterna(indexSeccion + 1);
		})

	    $(".anterior-interna").on("click", function () {
	    	showInterna(indexSeccion - 1);
	    })

		flechas.find(".derecha").click(function(e) {	
			showInterna(indexSeccion + 1);
			$("#izquierda").fadeOut(500);
		});	
		flechas.find(".izquierda").click(function(e) {		
			showInterna(indexSeccion - 1);
			$("#derecha").fadeOut(500);
		});

	}
	
})




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
		var cerrar = slideContainer.find(".cerrar")

		//console.log("Cuantos Textos:\t" + cuantosTextos);

		texto.each(function (i, val) {
			$(this).hide();
		})
		texto.eq(0).show();
		cerrar.hide();
		botonAnt.hide();

		function showSlide (index) {
			stopSong();
			
			texto.eq(indexSlide).fadeOut(500);
			
			indexSlide = index;
			
			texto.eq(indexSlide).delay(300).fadeIn(500);
			
			var dataAudio = texto.eq(indexSlide).data("audio");

			if (dataAudio != "" && dataAudio != "undefined") {
				stopSong();
				audios(dataAudio);
			};

			if(indexSlide <= 0){
				botonAnt.fadeOut(100);
				botonSig.fadeIn(100);
			} else if (indexSlide >= cuantosTextos - 1) {
				if (cerrarSlide == true) {
					cerrar.delay(1000).fadeIn(500);
				};
				botonSig.fadeOut(100);
				botonAnt.fadeIn(100);
			} else if (indexSlide > 0) {
				botonAnt.fadeIn(100);
				botonSig.fadeIn(100);
			};

		}

		cerrar.on("click", function () {
			stopSong();
			slideContainer.fadeOut(700);
			callbackCerrar();
		})


		botonSig.on("click", function () {
			showSlide(indexSlide + 1)
			////////console.log(indexSlide)
		})
		botonAnt.on("click", function () {
			showSlide(indexSlide - 1)
			////////console.log(indexSlide)
		})

	}

})