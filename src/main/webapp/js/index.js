$(function(){
    function goTo(){
                currentPage=localStorage.getItem('currentPage');
    			var path;
    			path = route().path;
    			if(!path || (path[0] != currentPage && path[0]!=="admin/")) {
    				location.hash = currentPage;
    				return;
    			}
				switch(path[1]){
					case "questions" :
						$.get("/getQuestion?token="+localStorage.getItem("token"), function(data){
						    if(data != "false"){
						        if(data != "end"){
						            console.log(data);
                                    var question = JSON.parse(data);
                                    loadDust(question);
							    }else {
                                    localStorage.setItem('currentPage', 'final/');
                                    location.hash="final/";
                                }
							} else {
								alert("Не шали!");
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
					console.log(sections);
						loadDust(sections);
					});
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
	if(!route().path[0] || route().path[0] !== "admin/") {
		currentPage = localStorage.getItem("currentPage");
		if(!currentPage){
			currentPage="index/";
			$.ajax({
				type: "POST",
				url: "/newExaminee",
				data: "section="+location.hash.slice(1),
				success: function(msg){
					if(msg!=="false"){
						location.hash="";
						localStorage.setItem("token",msg);
						localStorage.setItem("currentPage", currentPage);
						start();
					} else {
						alert("Не шали!");
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