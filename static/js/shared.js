$(document).ready(function(){
	if($(window).scrollTop() > 100) {
		$(".fixed-nav").css({"background-color":"#6300FF"});
	} else {
		$(".fixed-nav").css({"background-color":"transparent"});
	}	
	
	$(window).on("scroll", function() {
		if($(window).scrollTop() > 100) {
			$(".fixed-nav").css({"background-color":"#6300FF"});
		} else {
			$(".fixed-nav").css({"background-color":"transparent"});
		}
	});
	$('.navbar-collapse ul li a').click(function(){
		$('.navbar-toggle:visible').click();
	});					
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(event) {
	  $('.pad-mob-feat a.active').removeClass('active');
	  $(event.target).addClass('active');
	});
	$('a[data-toggle="tab"]').on('slick-active', function(event) {
	  $('.pad-mob-feat a.active').removeClass('active');
	  $(event.target).addClass('active');
	});
	if(document.location.search.length > 4) {
		var query = window.location.search.substring(1); 
		var vars = query.split("&"); 
		for (var i=0;i < vars.length;i++) { 
			var pair = vars[i].split("="); 
			if( (pair[0].substring(0, 4) == "utm_") && (pair[1] != "")) {
				var xVal = pair[1].replace(/\+/g, '%20');
				sessionStorage.setItem( pair[0], decodeURIComponent( xVal ) );
			}            
		} 
	}			
});

function setHiddenFormFields() {
    var hiddenFields = document.querySelectorAll("input[name^='utm_']");
	for (var i=0; i<hiddenFields.length; i++) {
		var param = sessionStorage.getItem(hiddenFields[i].name);
		if (param) { 
			document.getElementsByName(hiddenFields[i].name)[0].value = param;
		}
	}
	if( $('#htuk').length > 0 ) {
		document.getElementById('htuk').value = document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}
}
