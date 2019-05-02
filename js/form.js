var emailAddress =  "";	
var iFrameDetection = (window === window.parent) ? false : true;

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var setProgProCookie = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
setProgProCookie(messageEvent,function(e) {
	var message = e.data.split('|');
	if(message[0] == "stage"){
	   $.cookie('progPro', message[1], {expires: 180, domain: 'crmtechnologies.com'});
	}
	if(message[0] == "height"){
		$('.fancybox-inner').css({ 'max-height': message[1] + "px" });
		$('.fancybox-inner').css({ 'min-height': message[1] + "px" });            
		$('.fancybox-inner').css({ 'height': message[1] + "px" });          
	}
},false); 

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
	'use strict';
	if (this == null) {
	  throw new TypeError('Array.prototype.find called on null or undefined');
	}
	if (typeof predicate !== 'function') {
	  throw new TypeError('predicate must be a function');
	}
	var list = Object(this);
	var length = list.length >>> 0;
	var thisArg = arguments[1];
	var value;

	for (var i = 0; i < length; i++) {
	  value = list[i];
	  if (predicate.call(thisArg, value, i, list)) {
		return value;
	  }
	}
	return undefined;
  };
}

var progPro = (function () {
    var myList = '';
	var loopField = ""; 
	var fieldsShown = 0;
	var progShown = 0;
    var country =  "country"; 
    var industry =  "industry1"; 
	var countryWithState = [ "USA", "Canada", "Australia" ];
	var explicitCountries = ["Canada", "Australia","New Zealand","Switzerland","Austria","Belgium","Denmark","Germany","Italy","Netherlands","Spain"];
	
	var setRequired = function(requiredField) {
      if($("label[for=" + requiredField + "] .required").length == 0) {
		window[requiredField].add(Validate.Presence, {failureMessage:"This field is required"});
		$("label[for=" + requiredField + "]").append('<span class="required">*</span>');
		console.log($("#" + requiredField).prop("name") + " is Required");
      }
	};
	
	var setField = function(progField, progStage) {
      try {
		loopField = progField;
		var progType = progPro.contactFields.find(findProgType)[3];   
		visibilityRules[progType](progField, progStage);
      } 
      catch(err) { 
        console.log( progStage + ": " + progField + " Not Found"); 
      }
	};
 
	var setForm = function() {
        if(progPro.formSet == true) { return; }
		progPro.formSet = true;
		console.log("Set Form: " + progPro.stage);
		$.each( progPro.fixedFields, function( index, item) {
			progPro.setField(item, -1);
		});
		if(progPro.stage > 5) { progPro.stage = 6; }
		switch (progPro.stage) {
			case -1:
				break;
			case 0:
				$.each( progPro.firstVisit, function( index, item) {
				  progPro.setField(item, progPro.stage);
				});
				break;
			case 1:
				$.each( progPro.firstVisit, function( index, item) {
					progPro.setField(item, progPro.stage);
				});
				break;
			case 2:
				$.each( progPro.secondVisit, function( index, item) {
					progPro.setField(item, progPro.stage);
				});
				break;
			case 3:
				$.each( progPro.thirdVisit, function( index, item) {
					progPro.setField(item, progPro.stage);
				});
				break;
			case 4:
				$.each( progPro.fourthVisit, function( index, item) {
					progPro.setField(item, progPro.stage);
				});
				break;       
			case 5:
				$.each( progPro.fifthVisit, function( index, item) {
					progPro.setField(item, progPro.stage);
				});
				break;
			case 6:
				break;
			default:
				$.each( progPro.firstVisit, function( index, item ) {
					progPro.setField(item, progPro.stage);
				});
				break;
		}
		$("input[type=submit]").parents('.form-design-field').show(); 
		$("form, #wrapper").show();	
		if(iFrameDetection == true) {	parent.postMessage('height|'+ $(document).height(),"*"); }
	};
    
	var setHiddenFields = function() {
		var query = window.location.search.substring(1); 
		var vars = query.split("&"); 
      console
      if(document.location.search.length) {
		for (var i=0;i < vars.length;i++) { 
			var pair = vars[i].split("="); 
			if($("[name='" + pair[0] + "']") && (pair[1] != "")) {
				var xVal = pair[1].replace(/\+/g, '%20');
				$("[name='" + pair[0] + "']").val( decodeURIComponent( xVal ) );
			}            
		} 
      }  
	};
 
	var mergeHiddenFields = function(uri) { 
		var thisStage = parseInt( $.cookie("progPro") ) + 1;
		if( isNaN(thisStage) ) { thisStage = 1; } 
		var query = window.location.search.substring(1); 
		var vars = query.split("&"); 
		for (var i=0;i < vars.length;i++) { 
			var pair = vars[i].split("="); 
			uri = updateQueryStringParameter(uri, pair[0],pair[1]);                         
		}		
		return uri + "&stage=" + thisStage;
	}; 
  
	var setStageCookie = function(e){   
        console.log("Received: " + e.data);
       	if( (isNaN(e) == false) ){ 
          $.cookie('progPro', e, {expires: 180, domain: 'crmtechnologies.com'}); 
        }
	}; 
  
	var updateQueryStringParameter = function(uri, key, value) {   
		var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");
		if (uri.match(re)) {
          	return uri.replace(re, '$1' + key + "=" + value + '$2');
		} else {
			var hash =  '';
          	if( uri.indexOf('#') !== -1 ){
				hash = uri.replace(/.*#/, '#');
				uri = uri.replace(/#.*/, '');
          	}
          	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
          	return uri + separator + key + "=" + value + hash;
		} 
    }; 
  
    var setGeolookup = function() {
        setField("stateProv", progPro.stage);
        setField("OptIn", progPro.stage);
    };
  
    var findWhatProblem = function(problem) { return problem[0] == $("[name='p']").val(); };	
  
    var findProgType = function(progProObj) { return progProObj[0] == loopField; };	
	
	var hideField = function(currentField) { $("[name=" + currentField + "]").parents('.form-design-field').hide(); };
	
	var showField = function(currentField, currentStage, Validation) {
		console.log(currentField + ": " + fieldsShown + " of " + progPro.maxFields + " in " + currentStage);
		if(currentStage == -1) {
			$("[name=" + currentField + "]").parents('.form-design-field').show(); 
			fieldsShown++;
            if(Validation == "Required") {
                setRequired( $("[name=" + currentField + "]").prop('id') );
            }  
		} else if ((fieldsShown < progPro.maxFields) && (progShown < progPro.maxProgFields)) {
			console.log(currentField + ": " + progShown + " of " + progPro.maxProgFields + " in " + currentStage);
			$("[name=" + currentField + "]").parents('.form-design-field').show(); 
			progShown++;
			fieldsShown++;
            if(Validation == "Required") {
                setRequired( $("[name=" + currentField + "]").prop('id') );
            }           
		}
	};

	var resetForm = function() { 
        $("span.required").remove(); 
		$.each( progPro.contactFields, function( index, item) {
          if(($("[name=" + item[0] + "]").is(':visible') == true)) { fieldsShown--; }          
          if($("[name=" + item[0] + "]").attr("type") != "checkbox") {              
            $("[name=" + item[0] + "]").val("");
          } else {
			$("[name=" + item[0] + "]").prop("checked",false);
			$("[name=" + item[0] + "]").data("visible","true");           
          }  
		});	
 		     
		progPro.stage = 0;
        progPro.formSet = false;
		progPro.setForm();
		if(iFrameDetection == true) {	parent.postMessage('height|'+ $(document).height(),"*"); }    		
    };
  	
    var visibilityRules = { 
		
		Required: function(currentField, currentStage) {
			showField(currentField, currentStage, "Required");
		},

		Optional: function(currentField, currentStage) {
          
			showField(currentField, currentStage);
		},

		OptionalIfBlank: function(currentField, currentStage) {           
			if(($("[name=" + currentField + "]").val() == "") || ($("[name=" + currentField + "]").val() == null)) {
				showField(currentField, currentStage);
			}
		},  

		RequiredIfBlank: function(currentField, currentStage) {         
			if(($("[name=" + currentField + "]").val() == "") || ($("[name=" + currentField + "]").val() == null)) {
				showField(currentField, currentStage, "Required");              
			}
		}, 
		
		Hide: function(currentField, currentStage) {
				hideField(currentField, currentStage);       
		},   

		ReturnVisitIfBlank: function(currentField, currentStage) {           
			if( ($("[name=" + currentField + "]").val() == "") && (progPro.stage > 1) ) {
				showField(currentField, currentStage);
			}
		},   		
		
		OptIn: function(currentField, currentStage) {
			var myCountry = $("[name=" + country + "]").val();
			myCountry =  myCountry.trim();
			console.log( $("[name=" + currentField + "]").val() + " " +  $("[name=" + currentField + "]").data("visible") );
			if(($("[name=" + currentField + "]").not(':checked')) && ($("[name=" + country + "]").val() != "USA") && ($("[name=" + currentField + "]").data("visible") == "true")) {              
            	showField(currentField, currentStage);
				$("[name=" + currentField + "]").prop("checked",false);             
          	} else if($("[name=" + currentField + "]").data("visible") == "false") {              
				hideField(currentField, currentStage);  
				$("[name=" + currentField + "]").prop("checked",true);            
          	} else if ($("[name=" + country + "]").val() == "USA") { 
				$("[name=" + currentField + "]").prop("checked",true);                
            } else if($("[name=" + currentField + "]").data("visible") == "true") {
				hideField(currentField, currentStage);            
            } else {
             	showField(currentField, currentStage);             
            }  
		},

		State: function(currentField, currentStage) {  
			var myCountry = $("[name=" + country + "]").val();
 			myCountry =  myCountry.trim();          
			if( $.inArray(myCountry, countryWithState) > -1 ) {
				showField(currentField, currentStage);
            } else {
				hideField(currentField, currentStage);              
            } 
            if( myList == "" ) {
              myList = $("[name=" + currentField + "]").html();
            }
            if(myCountry == "Australia") {
            	myList = $("[name=" + currentField + "]").html();
            	$("[name=" + currentField + "]").html('<option value="">-- Please Select -- </option><option value="ACT">Austl. Cap. Terr.</option><option value="NSW">New South Wales</option><option value="NT">Northern Territory</option><option value="QLD">Queensland</option><option value="SA">South Australia</option><option value="TAS">Tasmania</option><option value="VIC">Victoria</option><option value="WA">Western Australia</option>');
            } else {
            	$("[name=" + currentField + "]").html(myList);              
            }  
		}
    };	

    return {      
		setField: setField,
		setForm: setForm,
		setRequired: setRequired,
		setHiddenFields: setHiddenFields,
		mergeHiddenFields: mergeHiddenFields,      
		setGeolookup: setGeolookup,
		resetForm: resetForm,
		setStageCookie: setStageCookie
    };   
})();      

	progPro.optInAllowed = "true";  
	progPro.formSet = false;
	progPro.showSession = false;
	progPro.stage = 0;

    var query = window.location.search.substring(1); 
    var vars = query.split("&"); 
    for (var i=0;i<vars.length;i++) { 
      var pair = vars[i].split("=");  
      if (pair[0] == "stage") { 
         progPro.stage = parseInt( pair[1] ); 
      }
      if ((emailAddress == "") && (pair[0] == "em")) { 
         emailAddress = pair[1]; 
      }	  
    }
	console.log( progPro.stage );
  
      progPro.stage = 0;      
      progPro.maxFields = 20;
      progPro.maxProgFields = 20;      
      progPro.fixedFields = [   "emailAddress", "lastName", "company", "stateProv", "OptIn", "subscribeToEvents1", "subscribeToNewsletter1" ];	
      progPro.firstVisit = [ "firstName", "jobTitle", "country", "busPhone", "industry1", "marketingAutomationProvider1" ];
        
	  
	progPro.contactFields = [
		[ 
		  "emailAddress", //Form Field
		  'C_EmailAddress', //Eloqua Contact Field
		  '', //Default Value
		  'Required' //Display Rule for Download Form		  
		],
		[ 
		  "firstName", 
		  'C_FirstName', 
		  '', 
		  'RequiredIfBlank' //Display Rule for Download Form		  
		],
		[ 
		  "lastName", 
		  'C_LastName', 
		  '', 
		  'RequiredIfBlank' //Display Rule for Download Form		  
		],
		[ 
		  "jobTitle", 
		  'C_Title', 
		  '', 
		  'RequiredIfBlank' //Display Rule for Download Form		 
		],
		[ 
		  "company", 
		  'C_Company', 
		  '', 
		  'RequiredIfBlank' //Display Rule for Download Form		  
		],
		[ 
		  "country", 
		  'C_Country', 
		  '', 
		  'RequiredIfBlank' //Display Rule for Download Form		 	
		],
		[ 
		  "stateProv", 
		  'C_State_Prov', 
		  '',
		  'State' //Display Rule for Download Form		
		],
		[ 
		  "busPhone", 
		  'C_BusPhone', 
		  '',
		  'OptionalIfBlank' //Display Rule for Download Form		 
		],      
		[ 
		  "industry1", 
		  'C_Industry1', 
		  '', 
		  'RequiredIfBlank' //Display Rule for Download Form			
		],
		[ 
		  "marketingAutomationProvider1", 
		  'C_Marketing_Automation_Provider1', 
		  '', 
		  'hide' //Display Rule for Download Form	 
		],                    
		[ 
		  "OptIn", 
		  'C_Subscribe_to_General_Comms1', 
		  '', 
		  'OptIn' //Display Rule for Download Form		 
		],                    
		[ 
		  "subscribeToNewsletter1", 
		  'C_Subscribe_to_Newsletter1', 
		  '', 
		  'OptIn' //Display Rule for Download Form		 
		],                    
		[ 
		  "subscribeToEvents1", 
		  'C_Subscribe_to_Events1', 
		  '', 
		  'OptIn' //Display Rule for Download Form		 
		]   
	];

  
$( document ).ready(function() {

    $("form :input").each(function(index, elem) {
        var eId = $(elem).attr("id");
        var label = null;
    });  
  
    if ( $(".elq-form").length > 0 ) {
		$("form").hide();	
        $("[name='asset']").val(asset);       
		progPro.setHiddenFields();  
    }

	if(iFrameDetection == true) {	
		$("form").prop("target", "_top");
	}
	
    $.each( progPro.contactFields, function( index, item) {
        $("[name='" + this[0] + "']").parents(".item-padding").hide();
    });	
	
    progPro.setForm(); 
	
	$( "[name=country]" ).change(function() { 
		progPro.setField("stateProv", -1);
		progPro.setField("OptIn", -1);
		progPro.setField("subscribeToNewsletter1", -1);
		progPro.setField("subscribeToEvents1", -1);      
		if(iFrameDetection == true) {	parent.postMessage('height|'+ $(document).height(),"*"); }
    }); 
	$( "[type=checkbox]" ).change(function() { 
      if($(this).prop("checked")) {
        $(this).data("visible","");
      } else {
        $(this).data("visible","true");        
      }  
    }); 
	$( "#resetForm" ).click(function(e) {  
        e.preventDefault();
        progPro.resetForm();
    });  

    $("a[href*='lightbox']").each(function( i ) {
		console.log(this.href);               
		var aVar = progPro.mergeHiddenFields( this.href );
		console.log(aVar);        
		$(this).data("fancybox-href", aVar );      
    });  
  
});

var VisitorLookupId = "3bcb6edea97748e891794b0903d716ce";	// LOOKUP A:  The ID of your Visitor Web Data Lookup
var ContactLookupId = "d0c507a032e147a69a27b56c71c87221";	// LOOKUP B:  The ID of your Contact/Datacard Web Data Lookup
var VisitorUniqueField = "V_ElqEmailAddress";				// Unique field's HTML Name from LOOKUP A (usually V_Email_Address)
var ContactUniqueField = "C_EmailAddress";					// Unique field's HTML Name from LOOKUP B (usually C_EmailAddress)
var FirstLookup = true;
