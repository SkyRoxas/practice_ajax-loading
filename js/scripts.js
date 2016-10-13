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

function cookieSet() {
    Cookies.set('message', replyObj)
        //document.cookie = JSON.stringify(replyObj);
}

function cookieGetMessage() {

    //查看cookie,將cookie存取的 messageArray 資料帶回 messageArray
    var cookieArr = JSON.parse(Cookies.get("message")).message;
    console.log(cookieArr);
    for (var i = 0; i < cookieArr.length; i++) {
        messageArray.push(cookieArr[i]);
    }
    console.log("cookie", JSON.stringify(replyObj));
    //console.log('cookie-string',JSON.stringify(document.cookie));

    //直接將資料導入畫面
    $.each(replyObj, function($key, $value) {
        if ($key == "message") {

            for (var i = 0; i < $value.length; i++) {
                //取值加入wrap
                var group = i;
                $('.chat-content .chat-wrap').append('<div class ="message message-' + group + '"><div class ="field-content"></div></div>');
                $.each($value[i], function($key, $value) {
                    //角色
                    if ($key == "user") {
                        if ($value == "you") {
                            $('.chat-content').find('.message-' + group).addClass('right');
                        } else {
                            $('.chat-content').find('.message-' + group).addClass('left');
                        }

                    }
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

        }

    })

}

$(document).ready(function() {
    cookieGetMessage();
})


//訊息對話輸出
function outPutObj($user, $message) {

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
    //傳話角色
    messageObj.user = $user;
    //對話內容
    if ($message == null) {
        messageObj.message = $('textarea').val();
    } else {
        messageObj.message = $message;
    }
    //對話貼圖
    if ($message == null) {
        messageObj.messageImg = $('.image-item.active').find('img').attr('src');
    }
    //對話時間
    messageObj.time = time;
    //對話編號
    messageObj.uid = messageArray.length + 1;

    //打包為物件
    messageArray.push(messageObj);

    //傳入cookie
    cookieSet();


    $.each(replyObj, function($key, $value) {
            if ($key == "message") {
                //wrap
                var group = $value.length;
                $('.chat-content .chat-wrap').append('<div class ="message message-' + group + '"><div class ="field-content"></div></div>');

                //取值加入wrap
                $.each($value[$value.length - 1], function($key, $value) {
                    //角色
                    if ($key == "user") {
                        if ($value == "you") {
                            $('.chat-content').find('.message-' + group).addClass('right');
                        } else {
                            $('.chat-content').find('.message-' + group).addClass('left');
                        }

                    }
                    //時間
                    if ($key == "time") {
                        $('.chat-content').find('.message-' + group).children('.field-content').append('<div class ="field-item field-time"><h5>' + $value + '</h5></div>');
                    }

                    //訊息
                    if ($key == "message") {
                        if ($value == null) {
                            //console.log($value);
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
        //移動到訊息最下方
    scollToBottom('.chat-content');

}


//訊息產生
function around_message() {
    var message = ['馬上就要去當兵了～哀', '跟你說～我找到通往天國的鑰使了!!', '我就是傳說中的達爾！！！','不期不待～不受傷害～','跟你對話的我不是我,其實還有另外一個我！！','XD','說人話好不？'];
    var aroundNum = Math.floor(Math.random() * message.length);
    //console.log(aroundNum);
    return message[aroundNum];
}
around_message();

//訊息按鈕 把資訊導入物件內
function replybtn() {
    outPutObj('you');
    $('textarea').val(null);
    setTimeout(function() {
        outPutObj('friend', around_message());
    }, 2000);
}


//貼圖按鈕 把資訊導入物件內
function imgbtn() {
    outPutObj('you');
    setTimeout(function() {
        outPutObj('friend', around_message());
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
