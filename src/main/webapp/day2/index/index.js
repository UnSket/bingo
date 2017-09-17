function index(){
	var isValidatedMail = false;
	var isValidatedName = false;
	$('#mail').popover();
	$('#mail').unbind('focus');
	$('#mail').on('focus', hidePopover);
	$('#mail').unbind('blur');
	$('#mail').on('blur', check(/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i));
	
	$('#name').popover();
	$('#name').unbind('focus');
	$('#name').on('focus', hidePopover);
	$('#name').unbind('blur');
	$('#name').on('blur', check(/^[a-z]+/i));
	
	$('button').unbind('click');
	$('button').on('click', function(){
		if(!isValidatedName) {
			$('#name').popover('show');
		}
		if(!isValidatedMail) {
			$('#mail').popover('show');
		} 
		if (isValidatedMail && isValidatedName){
		    $.ajax({
              type: "POST",
              url: "/registration",
              data:
                  'name='+$('#name').val()+
                  '&email='+$('#mail').val()+
                  '&token='+localStorage.getItem('token')
              ,
              success: function(msg){
              if(msg!=="false"){
                alert( "Успешно зарегестрирован");
                localStorage.setItem("currentPage", "questions/");
                currentPage = "questions/";
                location.hash = "questions/";
                } else {
                //ошибки тут
                }
              }
            });
		}
	});
	
	function check(pattern) {
		return function(){
			if($(this).val() != '') {
				if(pattern.test($(this).val())){
					switch(this.name){
						case'почта': isValidatedMail = true;
						break;
						case'имя': isValidatedName = true;
						break;
					}
					return;
				} else {
					if(this.name === "имя"){
						$(this).attr('data-content',"Не верное " + this.name);
					} else {
						$(this).attr('data-content',"Не верная " + this.name);
					}
					$(this).popover("show");
				}
			} else {
				$(this).attr('data-content',"Поле не может быть пустым");
				$(this).popover("show");
			}
		}
	}

	function hidePopover(){
		$(this).popover('hide');
	}
	
}