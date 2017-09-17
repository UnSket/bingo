function admin(){
	$('.hide').hide();
	
	$('.main>.nav-link').unbind('click');
	$('.main>.nav-link').on('click', function(e){
		e.preventDefault();
		if($($(this).attr('data-href')).css('display') !== "block") {
			$('.hide').hide();
			$('.main>.nav-link.active').removeClass('active');
			$("div[data-id='"+$(this).attr('data-href')+"']").show();
			$(this).toggleClass('active');
		} else {
			$('.main>.nav-link.active').removeClass('active');
			$('.hide').hide();
		}
	});
}