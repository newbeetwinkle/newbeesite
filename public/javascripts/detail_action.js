/**
 * Created by MacBookAir on 11/2/14.
 */

function submit_comment(postId){

    var comment = $("#comment_input").val();

    console.log(comment);
    if(comment == ''){
        alert('啥都没写，你评个JB啊！');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/posts/comment",
        data: {postId : postId, postContent : comment},
        dataType: "json",
        success: function(data){
            $('#comment_list').prepend(makeCommentUnit(data['user'].emailMd5, data['user'].nickname, data['comment'].content, data['commentTimeStr']));
        }
    });
}

function makeCommentUnit(emailMd5, nickname, content, commentTime){
    return '<li><img class="comment_avatar shadow" src="http://www.gravatar.com/avatar/' + emailMd5 + '?s=80">' +
    '<div class="comment_text"><label class="comment_nickname">' + nickname + '</label>' +
    '<p class="comment_comment_area">' + content + '</p>' +
    '<time class="comment_comment_time">' + commentTime + '</time></div></li>';
}