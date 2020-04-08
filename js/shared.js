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
});
