function loopArray(list, cb){
	if (list.length <= 0){
		return;
	}
	var item;
	for(var i = 0, len = list.length; i<len; i++){
		item = list[i];
		cb(item, i);
	}
}
function loopObj(obj, cb){
	for(var p in obj){
		cb(p, obj[p]);
	}
}
function inserObj(obj1, obj2){
	loopObj(obj2, function (key, val){
		obj1[key] = val;
	});
}
function extend(obj){
	var result = {};
	loopArray(arguments, function (item, i){
		inserObj(result, item);
	});
	return result;
}

function getEleById(id){
	return document.getElementById(id) || "";
}