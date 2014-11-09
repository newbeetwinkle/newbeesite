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

$('#editpostform').submit(function () {
	var  content = UE.getEditor('editor').getContent() || '';
	content = $.trim(content);
	if(content == ''){
		$('#info').html('文章内容都没，你以为你是姚宽啊！');
		$('#info').removeClass('hide');
		return false;
	}
});

widthFunctions();	