$(function () {
	    var $win = $(window);

        $win.scroll(function () {
                if ($win.height() + $win.scrollTop() >= $(document).height() * 0.3 || $win.height() + $win.scrollTop() <= $(document).height() * 0.1 ) {
                        setTimeout(function(){
                                //main
                            pollingCheckAndSeek();
                        }, 1000);
                }
        });
});


// $(function () {
// 	$(document).ready(function(){
// 			$('.UnLikeLink').betterTooltip({speed: 150, delay: 300});
// 	});
// });



