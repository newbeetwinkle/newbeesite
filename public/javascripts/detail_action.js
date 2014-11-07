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
                + data['user'].emailMd5 + '?s=80">'
                + data['user'].nickname + ':</div><div class="well"><p>'
                + data['comment'].content + ' </p><time>'
                + data['comment'].commentTime + '</time></div></li>';
            $('.comment_list').append(a);
        }
    });
}