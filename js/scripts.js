var replyObj = new Object();
var messageArray = [];

replyObj.message = messageArray;


//時間
var mydate = new Date();
var time =
    mydate.getFullYear() + "/" +
    (mydate.getMonth() + 1) + '/' +
    mydate.getDate() + ' ' +
    mydate.getHours() + ':' +
    mydate.getMinutes();



//ajax loading
$.ajax({
    url: '/templates/nav-reply.html',
    success: function(result) {
        $('.chat-nav-ajax').html(result);
    }
});

function ajaxGet($project) {
    $.ajax({
        url: '/templates/' + $project + '.html',
        success: function(result) {
            $('.chat-nav-ajax').html(result);
        }
    });
}

//scroll置最底
function scollToBottom($element) {
    $($element).scrollTop($($element).scrollTop() + $($element).height());
}




$(document).ajaxComplete(function() {
    var imageItem = $('.chat-image').find('.image-content .wrap').children('.image-item');
    imageItem.eq(0).addClass('active');
    imageItem.each(function() {
        $(this).click(function() {
            imageItem.removeClass('active');
            $(this).addClass('active');
        })
    })
})



//好友訊息
function friendMessage() {
    setTimeout(function() {
        $('.chat-content .chat-wrap').append('<div class ="message friend-message left"><div class ="field-content"><div class ="field-item field-message"><p>你好安安</p></div><div class ="field-item field-time"><h5>' + time + '</h5></div></div>');
        scollToBottom('.chat-content');
    }, 2000);


}




//訊息按鈕 把資訊導入物件內
function replybtn() {
    var messageObj = new Object;
    messageObj.user = "you";
    messageObj.message = $('textarea').val();
    messageObj.time = time;
    messageObj.uid = messageArray.length + 1;
    messageArray.push(messageObj);
    console.log(JSON.stringify(replyObj));
    $.each(replyObj, function($key, $value) {
        if ($key == "message") {
            //wrap
            var group = $value.length;
            $('.chat-content .chat-wrap').append('<div class ="message message-' + group + ' ' + "right" + '"><div class ="field-content"></div></div>');
            //取值加入wrap
            $.each($value[$value.length - 1], function($key, $value) {
                if ($key == "time") {
                    $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-time"><h5>' + $value + '</h5></div>');
                }
                if ($key == "message") {
                    $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-message"><p>' + $value + '</p></div>');
                }
            })
        }
        $('textarea').val(null);
    })
    scollToBottom('.chat-content')
    friendMessage();
}



//貼圖按鈕 把資訊導入物件內
function imgbtn() {
    var messageObj = new Object;
    messageObj.user = "you";
    messageObj.message = $('.image-item.active').find('img').attr('src');
    messageObj.time = time;
    messageObj.uid = messageArray.length + 1;
    messageArray.push(messageObj);
    console.log(JSON.stringify(replyObj));
    $.each(replyObj, function($key, $value) {
        if ($key == "message") {
            //wrap
            var group = $value.length;
            $('.chat-content .chat-wrap').append('<div class ="message message-' + group + ' ' + "right" + '"><div class ="field-content"></div></div>');
            //取值加入wrap
            $.each($value[$value.length - 1], function($key, $value) {
                if ($key == "time") {
                    $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-time"><h5>' + $value + '</h5></div>');
                }
                if ($key == "message") {
                    $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-message message-image"><img src ="' + $value + '" style ="max-width:150px;"></div>');
                }
            })
        }
    })
    scollToBottom('.chat-content')
    friendMessage();
}
