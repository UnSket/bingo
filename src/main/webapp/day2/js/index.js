$(function(){
    function goTo(){
                currentPage=localStorage.getItem('currentPage');
    			var path;
    			path = route().path;
    			if((!path || path[0] != currentPage) && path[0]!=="admin/") {
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
					case "admin":
					$.get("/getSections", function(data){
					var sections = JSON.parse(data);
						loadDust(sections/* {
						'sections' : [
							{"name":"section1",
							"questions":[
								{'text':'question1',
								'answers':'long long long long long answer',
								'area':'true',
								'id':'1'},
								{'text':'question2',
								'answers':['answ3','answ4'],
								'checkbox':'true',
								'id':'2'}
								]},
							{"name":"section2",
							"questions":[
								{'text':'question3',
								'answers':['answ1','answ2'],
								'radio':'true',
								'id':'3'},
								{'text':'question4',
								'answers':['answ3','answ4'],
								'checkbox':'true',
								'id':'4'}
								]},
							{"name":"section3"},
							{"name":"section4"}
						]} */);
					})
				}
    			
    			function loadDust(data){
					$.get(path.toString() + ".dust", function(dustData){
    				$('.wrapper>.container').empty();
    				dust.renderSource(dustData, data, function(err, out) {
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
	if(route().path[0]!=="admin/") {
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