function questions(){
	$('button').unbind('click');
	$('button').on('click', function(){
		var $answers=$(".form-check-input");
		var answer="";
		if($answers.length > 0){
			for(var i=0; i<$answers.length; i++){
				if($answers[i].checked) {
					answer += $answers[i].value+",";
				}
			}
			answer = answer.slice(0,-1);
		} else {
			answer = $("#area").val();
		}
		if(answer){
			alert(answer)
			$.ajax({
              type: "POST",
              url: "/addAnswer",
              data: "answer="+answer+"&token="+localStorage.getItem('token'),
              success: function(msg){
              if(msg!=="false"){
                alert( msg );
                location.hash="/next";
                } else {
                //тут если секция не найдена
                }
              }
            });
			location.hash="next";
		} else {
			alert("Выберите или введите ответ!");
			//тут сказать что надо бы заполнить поля
		}
	});
}