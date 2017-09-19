function admin(){
	var section="";
	$("[data-toggle='popover']").popover();
	
	$names = $(".name");
	for(var i=0; i<$names.length; i++){
		$names[i].href=encodeURI($names[i].href + "#" + $names[i].text);
		$names[i].text=$names[i].href;
	}
	//$names.removeAttr('href');
	$("a").unbind('click');
	$("a").on("click", function(){
		$("[data-toggle='popover']").popover('hide');
	});
	function addAddButtonLitner(){
		$(".add-answer").unbind("click");
		$(".add-answer").on("click", function(){
			var type = $(this).closest('.tab-pane').find('input[type="radio"][checked]').val();
			$(this).before('<div class="form-check"><input class="answers" type="text" value=""'+
			'data-toggle="popover" data-placement="left" data-trigger="manual" data-content="Поле не может быть пустым"></div>');
			$("[data-toggle='popover']").popover();
		});
	}
	function checkFields($father, patern){
		isOk=true;
		$checking=$father.find("[data-toggle='popover']");
		for(var i=0; i<$checking.length; i++){
			if($checking[i].value===""){
				isOk=false;
				$($checking[i]).attr('data-content', 'Поле не может быть пустым');
				$($checking[i]).popover("show");
			} else if(!patern.test($checking[i].value)){
				isOk=false;
				$($checking[i]).attr('data-content', 'Поле должно содержать хотябы одну букву');
				$($checking[i]).popover("show");
			}
		}
		return isOk;
	}
	
	$('.hide').hide();
	
	$('.main>.nav-link').unbind('click');
	$('.main>.nav-link').on('click', function(e){
		$('.hide').hide();
		if($(this).attr('id') !== 'v-pills-new-tab'){
			e.preventDefault();
			$('.main>.nav-link.active').removeClass('active');
			$("div[data-id='"+$(this).attr('data-href')+"']").show();
			$(this).toggleClass('active');
			section=$(this).attr("data-section-name");
			$prevDiv=$(".show.active");
			$(".show.active").removeClass("show active");
			$newDiv=$("#"+$(this).attr('data-new-question-href'));
			$("#"+$(this).attr('data-new-question-href')).addClass("show active");
		}
	});
	
	$('.addSection').unbind('click');
	$('.addSection').on("click",function(){
		var isOk=true;
		$father=$(this).closest('.tab-pane');
		isOk = checkFields($father, /^.*([a-zA-Z])+.*/i);
		if(isOk){
			$("[data-toggle='popover']").popover('hide');
			$.ajax({
				type: "PUT",
				url: "/addSection",
				data: "json={'section':'"+$('.newSection').val()+"'}",
				success: function(msg){
					if(msg!=="false"){
						location.hash="/next";
					} else {
						alert("Не шали!");
					}
				}
            });
		}
	});
	
	addAddButtonLitner();
	
	$(".save").unbind('click');
	$(".save").on('click', function(){
		var isOk=true;
		$father=$(this).closest('.tab-pane');
		isOk = checkFields($father, /^.*([a-zA-Zа-яА-Я])+.*/i);
		if(isOk){
			$("[data-toggle='popover']").popover('hide');
			type=$father.find('input[type="radio"]:checked').val();
			var answers="";
			if(type==="area"){
				answers = $father.find('.area-answer').val();
			} else {
				$fields=$father.find(".answers");
				for(var i=0; i< $fields.length; i++){
					answers += $fields[i].value+",";
				}
				answers=answers.slice(0,-1);
			}
			var jsonData="{'question':{'text':'"+$father.find('textarea').val()+"','type':'"
			+type+"','answers':'"+answers+"','correct_answer':'null'}, 'section':'"+section+"'}";
			$.ajax({
				type: "PUT",
				url: "/addQuestion",
				data: "jsonObj="+jsonData,
				success: function(msg){
					if(msg!=="false"){
						location.hash="/next";
					} else {
						alert("Не шали!");
					}
				}
			});
		}
	});

	$(".update").unbind('click');
    $(".update").on('click', function(){
    	var isOk=true;
		$father=$(this).closest('.tab-pane');
		isOk = checkFields($father, /^.*([a-zA-Zа-яА-Я])+.*/i);
		if(isOk){
    		type=$father.find('input[type="radio"]:checked').val();
    		var answers="";
    		if(type==="area"){
    			answers = $father.find('.area-answer').val();
    		} else {
    			$fields=$father.find(".answers");
    			for(var i=0; i< $fields.length; i++){
    				answers += $fields[i].value+",";
    			}
    			answers=answers.slice(0,-1);
    		}
    		var jsonData="{'question':{'id':'"+$father.attr('data-id')+"','text':'"+$father.find('textarea').val()+"','type':'"
    		+type+"','answers':'"+answers+"','correct_answer':'null'}, 'section':'"+section+"'}";
    		$.ajax({
				type: "POST",
				url: "/updateQuestion",
				data: "jsonObj="+jsonData,
				success: function(msg){
					if(msg!=="false"){
						location.hash="/next";
					} else {
						alert("Не шали!");
					}
				}
			});
		}
    });
	$(".type").unbind("change");
	$(".type").on("change", function(){
		var $father=$(this).closest('.tab-pane');
		var type=$father.find('input[type="radio"]:checked').val();
		var $fields=$father.find(".answers");
		if ($fields.length>0 && type==="area") {
			var answers="";
			for(var i=0; i< $fields.length; i++){
				answers += $fields[i].value+",";
			}
			$fields.remove();
			$father.find('.add-answer').remove();
			answers=answers.slice(0,-1);
			$father.find('#areaType').parent().parent().after('<textarea class="form-control area-answer">'+answers+'</textarea>');
		} else if($fields.length===0 && (type==="checkbox" || type==="radio")) {
			var $areaAnswer = $father.find('.area-answer');
			answers = $areaAnswer.val().split(',');
			$areaAnswer.remove();
			for(var i=answers.length-1; i>=0; i--){
				$father.find('#areaType').parent().parent().after('<div class="form-check"><input class="answers" type="text" value="'+answers[i]+'"></div>');
			}
			$father.find('br').before('<button class="btn btn-outline-dark add-answer" type="button">+</button>');
			addAddButtonLitner();
		}
	});
}