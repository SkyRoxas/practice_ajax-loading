//ajax loading
$(document).ready(function() {
    $.ajax({
        url: '../templates/nav-reply.html',
        success: function(result) {
            $('.chat-nav-ajax').html(result);
        }
    });
})


function ajaxGet($project) {
    $.ajax({
        url: '../templates/' + $project + '.html',
        success: function(result) {
            $('.chat-nav-ajax').html(result);
        }
    });
}

//scroll置最底
function scollToBottom($element) {
    $($element).scrollTop($($element).scrollTop() + $($element).height());
}


//add active class
$(document).ready(function() {
    var navItem = $('.chat-nav').find('.chat-nav-wrap').children('button');
    navItem.eq(0).addClass('active');
    navItem.each(function() {
        $(this).click(function() {
            navItem.removeClass('active');
            $(this).addClass('active');
        })
    })
})


//add active class for message image
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





var replyObj = new Object();
var messageArray = [];

replyObj.message = messageArray;

function cookieGetMessage() {

    //查看cookie
    console.log("cookie", document.cookie);
    //console.log('cookie-string',JSON.stringify(document.cookie));
}

$(document).ready(function() {
    cookieGetMessage();
})



//好友對話輸出
function friendMessage() {

    //時間
    var mydate = new Date();
    var time =
        mydate.getFullYear() + "/" +
        (mydate.getMonth() + 1) + '/' +
        mydate.getDate() + ' ' +
        mydate.getHours() + ':' +
        mydate.getMinutes();

    //物件輸出
    var messageObj = new Object;

    messageObj.user = "friend";
    messageObj.message = "你好安安";
    //messageObj.messageImg = $('.image-item.active').find('img').attr('src');
    messageObj.time = time;
    messageObj.uid = messageArray.length + 1;
    messageArray.push(messageObj);

    console.log(JSON.stringify(replyObj));

    $.each(replyObj, function($key, $value) {
        if ($key == "message") {
            //wrap
            var group = $value.length;
            $('.chat-content .chat-wrap').append('<div class ="message message-' + group + ' ' + "left" + '"><div class ="field-content"></div></div>');

            //取值加入wrap
            $.each($value[$value.length - 1], function($key, $value) {
                //時間
                if ($key == "time") {
                    $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-time"><h5>' + $value + '</h5></div>');
                }

                //訊息
                if ($key == "message") {
                    if ($value == null) {
                        console.log($value);
                    } else {
                        $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-message"><p>' + $value + '</p></div>');
                    }
                }

                //貼圖
                if ($key == "messageImg") {
                    if ($value == null) {
                        console.log($value);
                    } else {
                        $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-message-image"><img src ="' + $value + '" style ="max-width:150px;"></div>');
                    }

                }

            })
        }

    })
    scollToBottom('.chat-content');
    //document.cookie = JSON.stringify(replyObj);
}


//訊息對話輸出
function outPutObj() {

    //時間
    var mydate = new Date();
    var time =
        mydate.getFullYear() + "/" +
        (mydate.getMonth() + 1) + '/' +
        mydate.getDate() + ' ' +
        mydate.getHours() + ':' +
        mydate.getMinutes();

    //物件輸出
    var messageObj = new Object;

    messageObj.user = "you";
    messageObj.message = $('textarea').val();
    messageObj.messageImg = $('.image-item.active').find('img').attr('src');
    messageObj.time = time;
    messageObj.uid = messageArray.length + 1;
    messageArray.push(messageObj);
    document.cookie = JSON.stringify(replyObj);
    //console.log(JSON.stringify(replyObj));

    $.each(replyObj, function($key, $value) {
        if ($key == "message") {
            //wrap
            var group = $value.length;
            $('.chat-content .chat-wrap').append('<div class ="message message-' + group + ' ' + "right" + '"><div class ="field-content"></div></div>');

            //取值加入wrap
            $.each($value[$value.length - 1], function($key, $value) {
                //時間
                if ($key == "time") {
                    $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-time"><h5>' + $value + '</h5></div>');
                }

                //訊息
                if ($key == "message") {
                    if ($value == null) {
                        console.log($value);
                    } else {
                        $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-message"><p>' + $value + '</p></div>');
                    }
                }

                //貼圖
                if ($key == "messageImg") {
                    if ($value == null) {
                        console.log($value);
                    } else {
                        $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-message-image"><img src ="' + $value + '" style ="max-width:150px;"></div>');
                    }

                }

            })
        }

    })

}




//訊息按鈕 把資訊導入物件內
function replybtn() {
    outPutObj();
    $('textarea').val(null);
    scollToBottom('.chat-content');
    setTimeout(function() {
        friendMessage();
    }, 2000);
}


//貼圖按鈕 把資訊導入物件內
function imgbtn() {
    outPutObj();
    scollToBottom('.chat-content');
    setTimeout(function() {
        friendMessage();
    }, 2000);
}


//綁定 button click
$(document).ajaxComplete(function() {
    $('button.replybtn').click(function() {
        replybtn();
    })
    $('button.imgbtn').click(function() {
        imgbtn();
    })
})
