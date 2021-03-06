/**
 * Created by MacBookAir on 11/2/14.
 */

function submit_comment(postId){

    var comment = $("#comment_input").val();

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
            $('#comment_list').prepend(makeCommentUnit(data['avatarURL'], data['user'].nickname, data['comment'].content, data['commentTimeStr']));
            $('#comment_count_board').html('共有 '+ data['count'] +' 条评论');
            $("#comment_input").val('');
        }
    });
}

function makeCommentUnit(avatarURL, nickname, content, commentTime){
    return '<li><img class="comment_avatar shadow" src="' + avatarURL + '">' +
    '<div class="comment_text"><label class="comment_nickname">' + nickname + '</label>' +
    '<p class="comment_comment_area">' + content + '</p>' +
    '<time class="comment_comment_time">' + commentTime + '</time></div></li>';
}

var pageNow = 2;

$(function(){
    var postId = $("#postId").val();

    $('#comment_list').scrollPagination({
        'contentPage': '/posts/comment_list', // the url you are fetching the results
        'contentData': {'postId': postId, 'commentCount': $('#comment_list').children().size() - 1}, // these are the variables you can pass to the request, for example: children().size() to know which page you are
        'scrollTarget': $(window), // who gonna scroll? in this example, the full window
        'heightOffset': 10, // it gonna request when scroll is 10 pixels before the page ends
        'beforeLoad': function(opts){ // before load function, you can display a preloader div
            opts.contentData = {'postId': postId, 'pageNow': pageNow++};
            $('#comment_loading').fadeIn();
        },
        'afterLoad': function(elementsLoaded){ // after loading content, you can use this function to animate your new elements
            $('#comment_loading').fadeOut();
            if ($('#comment_list').children().size() > 100){ // if more than 100 results already loaded, then stop pagination (only for testing)
                $('#comment_nomoreresults').fadeIn();
                $('#comment_list').stopScrollPagination();
            }
        }
    });


    $.scrollUp({
        scrollName: 'scrollUp',      // Element ID
        scrollDistance: 300,         // Distance from top/bottom before showing element (px)
        scrollFrom: 'top',           // 'top' or 'bottom'
        scrollSpeed: 300,            // Speed back to top (ms)
        easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
        animation: 'fade',           // Fade, slide, none
        animationSpeed: 200,         // Animation speed (ms)
        scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
        scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
        scrollText: 'TOP',           // Text for element, can contain HTML
        scrollTitle: false,          // Set a custom <a> title if required.
        scrollImg: false,            // Set true to use image
        activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 2147483647           // Z-Index for the overlay
    });

});

