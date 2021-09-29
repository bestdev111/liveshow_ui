$(document).ready(function(){
	// console.log("hi");
 //    $('.input').focus(function(){
 //    	var tab_id = $(this).attr('href');
 //        $(tab_id).addClass('current')
 //    }).blur(function(){
 //        var tab_id = $(this).attr('href');
 //        $(tab_id).removeClass('current')
 //    });
    $(".slidebar-icon").click(function(){
	    $("#full-view").toggleClass("width100");
	    $("#full-view").toggleClass("left-right-padding");
	    $("#side-view").toggleClass("zero-width");
	});
	$('.tab-link').click(function(){
		var tab_id = $(this).attr('href');
		console.log(tab_id);
		$('.tab-link').removeClass('current');
		$(this).addClass('current');
	});
});
$(".side-menubar ul li a").click(function() {
	$(".side-menubar ul li a").removeClass("active-pink");
	$(this).trigger("click");
});
$('.carousel').carousel({
	interval : 3000
})
