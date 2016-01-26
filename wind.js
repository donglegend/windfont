;
function loadEvent(fn){
	var oldFn = window.onload;
	if(typeof window.onload != "function"){
		window.onload = fn;
	}else{
		window.onload = function (){
			oldFn();
			fn();
		}
	}
}

function getEleById(id){
	return document.getElementById(id) || "";
}

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

var Wind = (function (){

	function Wind(conf){
		console.log(conf);
		this.type = "Wind";
		this.ele = getEleById(conf.ele);
		this.contentText = conf.contentText || "hell wind!";
		this.stepIndex = 0;
		this.stepSum = 0;
		this.init = true;
		if (this === window){
			return new Wind(conf);
		}
	}
	
	Wind.prototype = {
		run : function (){
			var s = this;

			if(!s.ele){
				return ;
			}
			if(s.init){
				s.stepIndex = 0;
				s.stepSum = s.contentText.length;
				s.init = false;
				s.ele.innerHTML = "";
			}
			var curText = s.ele.innerHTML;
			curText += s.contentText.charAt(s.stepIndex);
			s.ele.innerHTML = curText;
			if(s.stepIndex < s.stepSum-1){
				s.stepIndex++;
				requestAnimationFrame(s.run.bind(s));
			}
		}
	}

	Object.defineProperty(Wind, "prototype", {
		writable: false
	})
	return Wind;

})();


var ops = {
	"ele": "Wind",
	"contentText": "这里讲述的是一段可歌可泣可笑可爱的草根崛起史，一个物质要求宁滥勿缺的开朗少年行。一段可歌可泣可笑可爱的草根崛起史。 一个物质要求宁滥勿缺的开朗少年行。 书院后山里永恒回荡着他疑惑的声音： 宁可永劫受沉沦，不从诸圣求解脱？ ……..."
}

loadEvent(function (){
	var myWind = new Wind(ops);
	myWind.run();
})

