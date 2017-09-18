	function route(){
		var hash=window.location.hash;
		if(hash) {
			path = hash.split('?')[0].slice(1).split('/');
			while(!path[path.length-1] && path.length !== 0){
				delete path[path.length-1];
				path.length -= 1;
			}
			path[path.length] = path[path.length-1];
			path[path.length - 2] += '/';
			path.toString = function(){
				var str="";
				for(var i=0; i<path.length; i++){
					str +=path[i];
				}
				return str;
			}
			if(hash.indexOf('?') !== -1 && hash.indexOf('?') < hash.length-1){
				vars = hash.split('?')[1].split('&');
				for(var i=vars.length-1;i >= 0; i--) {
					vars[vars[i].split("=")[0]]=vars[i].split("=")[1];
					delete vars[i];
				}
				return {path, vars};
			}
			return {path};
		} else {
			return "";
		}
	}