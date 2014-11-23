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

function deletePost(postId) {
    if(confirm("确定删除文章？")) {
        $.ajax({
            url: '/admin/post/' + postId,
            type: 'DELETE',
            success: function(result) {
                if(result == true){
                    alert("删除成功");
                    window.location = "/admin/myposts";
                }
            }
        });
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

function addCategory(){
	var name = $('#categoryName').val();
	$.ajax({
            url: '/admin/addCategory/',
            data:{"categoryName": name},
            type: 'POST',
            success: function(result) {
                if(!result.err){
                	var li = $('<li class="list-group-item">' + name + '</li>');
                	$('#categoryList').append(li);
                	$('#categoryName').val('');
                }
            }
        });
}