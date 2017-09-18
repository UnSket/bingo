function admin(){
	var section="";
	function addAddButtonLitner(){
		$(".add-answer").unbind("click");
		$(".add-answer").on("click", function(){
			var type = $(this).closest('.tab-pane').find('input[type="radio"][checked]').val();
			$(this).before('<div class="form-check"><input class="answers" type="text" value=""></div>');
		});
	}
	
	$('.hide').hide();
	
	$('.main>.nav-link').unbind('click');
	$('.main>.nav-link').on('click', function(e){
		$('.hide').hide();
		if($(this).attr('id') !== 'v-pills-new-tab'){
		e.preventDefault();
		if($($(this).attr('data-href')).css('display') !== "block") {
			$('.main>.nav-link.active').removeClass('active');
			$("div[data-id='"+$(this).attr('data-href')+"']").show();
			$(this).toggleClass('active');
			section=$(this).attr("data-section-name");
		}
		}
	});
	
	$('.addSection').unbind('click');
	$('.addSection').on("click",function(){
		$.ajax({
              type: "PUT",
              url: "/addSection",
              data: "json={'section':'"+$('.newSection').val()+"'}",
              success: function(msg){
              if(msg!=="false"){
                alert( msg );
                location.hash="/next";
                } else {
                //тут если секция не найдена
                }
              }
            });
	});
	
	addAddButtonLitner();
	
	$(".save").unbind('click');
	$(".save").on('click', function(){
		$father=$(this).closest('.tab-pane');
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
                alert( msg );
                location.hash="/next";
                } else {
                //тут если секция не найдена
                }
              }
            });
	});

	$(".update").unbind('click');
    $(".update").on('click', function(){
    		$father=$(this).closest('.tab-pane');
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
                    alert( msg );
                    location.hash="/next";
                    } else {
                    //тут обработка ошибок
                    }
                  }
                });
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