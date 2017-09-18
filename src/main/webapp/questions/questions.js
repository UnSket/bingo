function questions(){
	$('button').unbind('click');
	$('button').on('click', function(){
		var $answers=$(".form-check-input");
		var answer="";
		var patern = /^.*([a-zA-Zа-яА-Я])+.*/i;
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
		if(answer && patern.test(answer)){
			$.ajax({
              type: "POST",
              url: "/addAnswer",
              data: "answer="+answer+"&token="+localStorage.getItem('token'),
              success: function(msg){
              if(msg!=="false"){
                location.hash="/next";
                } else {
                alert("Не шали!");
                }
              }
            });
		} else {
			alert("Выберите или введите ответ!");
			//тут сказать что надо бы заполнить поля
		}
	});
}