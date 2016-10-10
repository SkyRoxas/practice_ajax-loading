function ajaxGet($project) {
    $.ajax({
        url: '/templates/' + $project + '.html',
        success: function(result) {
            $('.chat-nav-ajax').html(result);
        }
    });
}
//ajaxGet('nav-image');
