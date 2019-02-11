        	$(document).ready(function(){
        		$(window).on("scroll", function() {
    		        if($(window).scrollTop() > 100) {
    		            $(".fixed-nav").css({"background-color":"#6300ff"});
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
        	});