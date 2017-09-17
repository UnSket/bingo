$(function(){
    function goTo(){
                currentPage=localStorage.getItem('currentPage');
    			var path;
    			path = route().path;
    			if(!path || path[0] != currentPage) {
    				location.hash = currentPage;
    				return;
    			}
				switch(path[1]){
					case "questions" :
						$.get("/getQuestion?token="+localStorage.getItem("token"), function(data){
						    if(data != "false"){
						        if(data != "end"){
                                    var question = JSON.parse(data);
                                    loadDust(question);
							    }else {
                                    localStorage.setItem('currentPage', 'final/');
                                    location.hash="final/";
                                }
							} else {
							//обработка ошибок тут
							}
						});
						break;
					case "index":
					loadDust(null);
					break;
					case "final":
					loadDust();
					break;
				}
    			
    			function loadDust(data){
					$.get(path.toString() + ".dust", function(dustData){
    				$('.wrapper>.container').empty();
    				dust.renderSource(dustData, data /*{
    				'sections' : [
    					{"name":"section1",
    					"questions":[
    						{'name':'question1',
    						'answers':['answ1','answ2'],
    						'type':'radio',
    						'id':'1'},
    						{'name':'question2',
    						'answers':['answ3','answ4'],
    						'type':'checkbox',
    						'id':'2'}
    						]},
    					{"name":"section2",
    					"questions":[
    						{'name':'question3',
    						'answers':['answ1','answ2'],
    						'type':'radio',
    						'id':'3'},
    						{'name':'question4',
    						'answers':['answ3','answ4'],
    						'type':'checkbox',
    						'id':'4'}
    						]},
    					{"name":"section3"},
    					{"name":"section4"}
    				]} */, function(err, out) {
    					if (err) {
    						location.hash = currentPage;
    						console.log(err);
    					} else {
    						$('.wrapper>.container').append(out);
    						currentPage = path[0];
    						localStorage.setItem("currentPage", currentPage);
    						$.get(path.toString() + ".js", function(data){
    							window[path[path.length-1]]();
    						});
    					}
    				});
					}).fail(function(){
						location.hash = currentPage;
					});
				}
    	}

	var currentPage;
	currentPage = localStorage.getItem("currentPage");
	if(!currentPage){
		currentPage="index/";
		$.ajax({
          type: "POST",
          url: "/newExaminee",
          data: "section="+location.hash.slice(1),
          success: function(msg){
          if(msg!=="false"){
            alert( "Твой токен: " + msg );
            location.hash="";
            localStorage.setItem("token",msg);
            localStorage.setItem("currentPage", currentPage);
            start();
            } else {
            //тут если секция не найдена
            }
          }
        });
	} else {
	    start();
	}

	function start() {
        $(document).ready(function(){
            $.get('header.html', function(data){
                $('.wrapper').prepend(data);
            });
            $.get('footer.html', function(data){
                $('.content').append(data);
            });

            window.addEventListener("hashchange", goTo);

            goTo();
        });
	}
});