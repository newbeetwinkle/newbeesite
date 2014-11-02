/**
 * Created by MacBookAir on 11/2/14.
 */

function submit_comment(postId){

    $.ajax({
        type: "POST",
        url: "/posts/comment",
        data: {postId : postId, postContent : $("#comment_input").val()},
        dataType: "json",
        success: function(data){
            var  a = '<li><div><img src="http://www.gravatar.com/avatar/'
                + data.emailMd5 + '?s=80">'
                + data.nickname + ':</div><div class="well"><p>'
                + data.content + ' </p><time>'
                + data.time + '</time></div></li>';
            $('.post_list').append(
                   a
            );
        }
    });
}