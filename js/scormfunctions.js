var debug = false;  // set this to false to turn debugging off

var output = window.console; // output can be set to any object that has a log(string) function
                             // such as: var output = { log: function(str){alert(str);} };

// Define exception/error codes
var _NoError = {"code":"0","string":"No Error","diagnostic":"No Error"};
var _GeneralException = {"code":"101","string":"General Exception","diagnostic":"General Exception"};

var initialized = false;

// local variable definitions
var apiHandle = null;

function doLMSInitialize()
{
   if (initialized) return "true";
   
   var api = getAPIHandle();
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nLMSInitialize was not successful.");
      return "false";
   }

   var result = api.LMSInitialize("");
   if (result.toString() != "true")
   {
      var err = ErrorHandler();
      message("LMSInitialize failed with error code: " + err.code);
   }
   else
   {
	   initialized = true;
   }

   return result.toString();
}

function doLMSFinish()
{
   if (! initialized) return "true";
   
   var api = getAPIHandle();
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nLMSFinish was not successful.");
      return "false";
   }
   else
   {
      // call the LMSFinish function that should be implemented by the API
      var result = api.LMSFinish("");
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
         message("LMSFinish failed with error code: " + err.code);
      }
   }

   initialized = false;
   
   return result.toString();
}

function doLMSGetValue(name)
{
   var api = getAPIHandle();
   var result = "";
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nLMSGetValue was not successful.");
   }
   else if (! initialized && ! doLMSInitialize())
   {
      var err = ErrorHandler(); // get why doLMSInitialize() returned false
      message("LMSGetValue failed - Could not initialize communication with the LMS - error code: " + err.code);
   }
   else
   {
      result = api.LMSGetValue(name);

      var error = ErrorHandler();
      if (error.code != _NoError.code)
      {
         // an error was encountered so display the error description
         message("LMSGetValue("+name+") failed. \n"+ error.code + ": " + error.string);
         result = "";
      }
   }
   return result.toString();
}

function doLMSSetValue(name, value)
{
   var api = getAPIHandle();
   var result = "false";
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nLMSSetValue was not successful.");
   }
   else if (! initialized && ! doLMSInitialize())
   {
      var err = ErrorHandler(); // get why doLMSInitialize() returned false
      message("LMSSetValue failed - Could not initialize communication with the LMS - error code: " + err.code);
   }
   else
   {
      result = api.LMSSetValue(name, value);
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
         message("LMSSetValue("+name+", "+value+") failed. \n"+ err.code + ": " + err.string);
      }
   }

   return result.toString();
}

function doLMSCommit()
{
   var api = getAPIHandle();
   var result = "false";
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nLMSCommit was not successful.");
   }
   else if (! initialized && ! doLMSInitialize())
   {
      var err = ErrorHandler(); // get why doLMSInitialize() returned false
      message("LMSCommit failed - Could not initialize communication with the LMS - error code: " + err.code);
   }
   else
   {
      result = api.LMSCommit("");
      if (result != "true")
      {
         var err = ErrorHandler();
         message("LMSCommit failed - error code: " + err.code);
      }
   }

   return result.toString();
}

function doLMSGetLastError()
{
   var api = getAPIHandle();
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nLMSGetLastError was not successful.");
      //since we can't get the error code from the LMS, return a general error
      return _GeneralException.code; //General Exception
   }

   return api.LMSGetLastError().toString();
}

function doLMSGetErrorString(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nLMSGetErrorString was not successful.");
      return _GeneralException.string;
   }

   return api.LMSGetErrorString(errorCode).toString();
}

function doLMSGetDiagnostic(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nLMSGetDiagnostic was not successful.");
      return "Unable to locate the LMS's API Implementation. LMSGetDiagnostic was not successful.";
   }

   return api.LMSGetDiagnostic(errorCode).toString();
}

function ErrorHandler()
{
   var error = {"code":_NoError.code, "string":_NoError.string, "diagnostic":_NoError.diagnostic};
   var api = getAPIHandle();
   if (api == null)
   {
      message("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
      error.code = _GeneralException.code;
      error.string = _GeneralException.string;
      error.diagnostic = "Unable to locate the LMS's API Implementation. Cannot determine LMS error code.";
      return error;
   }

   // check for errors caused by or from the LMS
   error.code = api.LMSGetLastError().toString();
   if (error.code != _NoError.code)
   {
      // an error was encountered so display the error description
      error.string = api.LMSGetErrorString(error.code);
      error.diagnostic = api.LMSGetDiagnostic(""); 
   }

   return error;
}

function getAPIHandle()
{
   if (apiHandle == null)
   {
      apiHandle = getAPI();
   }

   return apiHandle;
}

function findAPI(win)
{
	var findAPITries = 0;
   while ((win.API == null) && (win.parent != null) && (win.parent != win))
   {
      findAPITries++;
      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (findAPITries > 7) 
      {
         message("Error finding API -- too deeply nested.");
         return null;
      }
      
      win = win.parent;
   }
   return win.API;
}

function getAPI()
{
   var theAPI = findAPI(window);
   if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined"))
   {
      theAPI = findAPI(window.opener);
   }
   if (theAPI == null)
   {
      message("Unable to find an API adapter");
   }
   return theAPI
}

function message(str)
{
   if(debug)
   {
      output.log(str);
   }
}

/************************** PORTE *******************************/

var startDate;
var exitPageStatus;
var statusGeneral;

function loadPage()
{
   var result = doLMSInitialize();

   var status = doLMSGetValue( "cmi.core.lesson_status" );

   if (status == "not attempted")
   {
	  // the student is now attempting the lesson
	  doLMSSetValue( "cmi.core.lesson_status", "incomplete" );
   }
   statusGeneral=status;

   exitPageStatus = false;
   startTimer();
}

function startTimer()
{
   startDate = new Date().getTime();
}

function computeTime()
{
   if ( startDate != 0 )
   {
      var currentDate = new Date().getTime();
      var elapsedSeconds = ( (currentDate - startDate) / 1000 );
      var formattedTime = convertTotalSeconds( elapsedSeconds );
   }
   else
   {
      formattedTime = "00:00:00.0";
   }

   doLMSSetValue( "cmi.core.session_time", formattedTime );
}

function doBack()
{
   doLMSSetValue( "cmi.core.exit", "suspend" );

   computeTime();
   exitPageStatus = true;
   
   var result;

   result = doLMSCommit();

	// NOTE: LMSFinish will unload the current SCO.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.   
   
   result = doLMSFinish();

}

function doContinue( status )
{
   // Reinitialize Exit to blank
   doLMSSetValue( "cmi.core.exit", "" );

   var mode = doLMSGetValue( "cmi.core.lesson_mode" );

   if ( mode != "review"  &&  mode != "browse" )
   {
      doLMSSetValue( "cmi.core.lesson_status", status );
   }
 
   computeTime();
   exitPageStatus = true;
   
   var result;
   result = doLMSCommit();
	// NOTE: LMSFinish will unload the current SCO.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.   

   result = doLMSFinish();

}

function doQuit( status )
{
   computeTime();
   exitPageStatus = true;
   
   var result;

   result = doLMSCommit();

   result = doLMSSetValue("cmi.core.lesson_status", status);
   
	// NOTE: LMSFinish will unload the current SCO.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.   

   result = doLMSFinish();
}

function unloadPage( status )
{
   stopSong();

	if (exitPageStatus != true)
	{
		doQuit( statusGeneral );
	}

	// NOTE:  don't return anything that resembles a javascript
	//		  string from this function or IE will take the
	//		  liberty of displaying a confirm message box.
	
}


function convertTotalSeconds(ts)
{
   var sec = (ts % 60);

   ts -= sec;
   var tmp = (ts % 3600);  //# of seconds in the total # of minutes
   ts -= tmp;              //# of seconds in the total # of hours

   // convert seconds to conform to CMITimespan type (e.g. SS.00)
   sec = Math.round(sec*100)/100;
   
   var strSec = new String(sec);
   var strWholeSec = strSec;
   var strFractionSec = "";

   if (strSec.indexOf(".") != -1)
   {
      strWholeSec =  strSec.substring(0, strSec.indexOf("."));
      strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
   }
   
   if (strWholeSec.length < 2)
   {
      strWholeSec = "0" + strWholeSec;
   }
   strSec = strWholeSec;
   
   if (strFractionSec.length)
   {
      strSec = strSec+ "." + strFractionSec;
   }


   if ((ts % 3600) != 0 )
      var hour = 0;
   else var hour = (ts / 3600);
   if ( (tmp % 60) != 0 )
      var min = 0;
   else var min = (tmp / 60);

   if ((new String(hour)).length < 2)
      hour = "0"+hour;
   if ((new String(min)).length < 2)
      min = "0"+min;

   var rtnVal = hour+":"+min+":"+strSec;

   return rtnVal;
}


loadPage();



$(document).ready(function(e) {
	$("#terminarCurso").click(function(e) {
		terminar();
	});
	$(".terminarCurso").click(function(e) {
		terminar();
	});
});
function terminar(){
	exitPageStatus = true;
	computeTime();
	doLMSCommit();
	doLMSSetValue( "cmi.core.lesson_status","completed");
	doLMSFinish();
}

