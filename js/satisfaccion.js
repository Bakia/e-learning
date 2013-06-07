$(document).ready(function(e) {
	if(statusGeneral=="completed"){
		$("#encuesta").css("display","none");
		$("#listo").css("display","block");

	}else{
		$("#botonenviar").click(function(e) {
			e.preventDefault();
			if($('input[name=preguntauno]:checked', '#myf').val()==undefined
				||$('input[name=preguntados]:checked', '#myf').val()==undefined
				||$('input[name=preguntatres]:checked', '#myf').val()==undefined
				||$('input[name=preguntacuatro]:checked', '#myf').val()==undefined
				||$('input[name=preguntacinco]:checked', '#myf').val()==undefined
				||$('input[name=preguntaseis]:checked', '#myf').val()==undefined
				||$('input[name=preguntasiete]:checked', '#myf').val()==undefined
				||$('input[name=preguntaocho]:checked', '#myf').val()==undefined

				){
				alert("Debes llenar todos los campos para terminar");
		}else{
			
			var respuestas ="1:"+$('input[name=preguntauno]:checked', '#myf').val()+";2:"+
			$('input[name=preguntados]:checked', '#myf').val()
			+";3:"+
			$('input[name=preguntatres]:checked', '#myf').val()
			+";4:"+
			$('input[name=preguntacuatro]:checked', '#myf').val()
			+";5:"+
			$('input[name=preguntacinco]:checked', '#myf').val()
			+";6:"+
			$('input[name=preguntaseis]:checked', '#myf').val()
			+";7:"+
			$('input[name=preguntasiete]:checked', '#myf').val()
			+";8:"+
			$('input[name=preguntaocho]:checked', '#myf').val();
			
			
			if(statusGeneral!="completed"){
				doLMSSetValue('cmi.comments',respuestas);
				doLMSSetValue("cmi.interactions.0.id", "Q1");
				doLMSSetValue("cmi.interactions.0.type", "choice");
				doLMSSetValue("cmi.interactions.0.student_response", $('input[name=preguntauno]:checked', '#myf').val());			
				doLMSSetValue("cmi.interactions.0.result", "neutral");
				
				doLMSSetValue("cmi.interactions.1.id", "Q2");
				doLMSSetValue("cmi.interactions.1.type", "choice");
				doLMSSetValue("cmi.interactions.1.student_response", $('input[name=preguntados]:checked', '#myf').val());			
				doLMSSetValue("cmi.interactions.1.result", "neutral");
				
				doLMSSetValue("cmi.interactions.2.id", "Q3");
				doLMSSetValue("cmi.interactions.2.type", "choice");
				doLMSSetValue("cmi.interactions.2.student_response", $('input[name=preguntatres]:checked', '#myf').val());			
				doLMSSetValue("cmi.interactions.2.result", "neutral");
				
				doLMSSetValue("cmi.interactions.3.id", "Q4");
				doLMSSetValue("cmi.interactions.3.type", "choice");
				doLMSSetValue("cmi.interactions.3.student_response", $('input[name=preguntacuatro]:checked', '#myf').val());			
				doLMSSetValue("cmi.interactions.3.result", "neutral");
				
				
				
				doLMSSetValue('cmi.comments',respuestas);
				doLMSSetValue("cmi.interactions.4.id", "Q5");
				doLMSSetValue("cmi.interactions.4.type", "choice");
				doLMSSetValue("cmi.interactions.4.student_response", $('input[name=preguntacinco]:checked', '#myf').val());			
				doLMSSetValue("cmi.interactions.4.result", "neutral");
				
				doLMSSetValue("cmi.interactions.5.id", "Q6");
				doLMSSetValue("cmi.interactions.5.type", "choice");
				doLMSSetValue("cmi.interactions.5.student_response", $('input[name=preguntaseis]:checked', '#myf').val());			
				doLMSSetValue("cmi.interactions.5.result", "neutral");
				
				doLMSSetValue("cmi.interactions.6.id", "Q7");
				doLMSSetValue("cmi.interactions.6.type", "choice");
				doLMSSetValue("cmi.interactions.6.student_response", $('input[name=preguntasiete]:checked', '#myf').val());			
				doLMSSetValue("cmi.interactions.6.result", "neutral");
				
				doLMSSetValue("cmi.interactions.7.id", "Q8");
				doLMSSetValue("cmi.interactions.7.type", "choice");
				doLMSSetValue("cmi.interactions.7.student_response", $('input[name=preguntaocho]:checked', '#myf').val());			
				doLMSSetValue("cmi.interactions.7.result", "neutral");
				doLMSCommit();
				
				alert("Muchas gracias "+doLMSGetValue("cmi.core.student_name")+", tus respuestas han sido enviadas.");
				
			}
			terminar();
			
		}
		
		
	});
}
});