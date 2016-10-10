jQuery(document).ready(function($) {
    $.ajax({
        url: "/templates/nav-reply/nav-reply.html",
        success: function(result) {
            $(".chat-nav-ajax").html(result);
        }
    });
})
