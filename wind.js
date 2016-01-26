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
		this.timer = null;
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

			var curChart = s.contentText.charAt(s.stepIndex);
	       	var nextFourChars = s.contentText.substr(s.stepIndex,4);
	       	if(nextFourChars=='<BR>' || nextFourChars=='<br>'){
	       		curChart  = '<BR>';
	       		s.stepIndex+=3;
	       	}

			curText += curChart;
			s.ele.innerHTML = curText;
			if(s.stepIndex < s.stepSum-1){
				s.stepIndex++;
				s.timer = requestAnimationFrame(s.run.bind(s));
			}else{
				cancelAnimationFrame(s.timer);
			}
		}
	}

	Object.defineProperty(Wind, "prototype", {
		writable: false
	})
	return Wind;

})();


function main(){
	var txt = getEleById("txt").innerHTML;
	var ops = {
		"ele": "Wind",
		"contentText": txt
	}
	var myWind = new Wind(ops);
	myWind.run();
}

loadEvent(main);

