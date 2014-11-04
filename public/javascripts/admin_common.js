$(document).ready(function(){
	$('ul.main-menu li a').each(function(){
			
			if($(this)[0].href==String(window.location)) {
				
				$(this).parent().addClass('active');
				$(this).parent().parent().show();
					
			}
	
	});
});

$(window).bind("resize", widthFunctions);

function widthFunctions(e) {

    var winHeight = $(window).height();
    var winWidth = $(window).width();

	var contentHeight = $("#content").height();

	if (winHeight) {
		$("#content").css("min-height",winHeight);
	}
}

widthFunctions();	