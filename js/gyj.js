//  1.计算后样式
//  2.缓冲运动及运动模型
//  3.获取子元素节点
//  4.获取元素净位置方法
//  5.统一滚轮方法
//  6.ajax封装方法
//  7.模板方法 getCompile(templateStr,data)
//  8.图片预加载
//  9.获取地址参数

// 封装计算后样式方法
function fetchComputedStyle(ele, property){
	if(window.getComputedStyle){
		return parseFloat(getComputedStyle(ele)[property]);
	}else{
		return parseFloat(ele.currentStyle[property]);
	};
};

// 缓冲运动方法
// 第一个参数t表示当前帧
// 第二个参数b表示起始位置 初始点
// 第三个参数c表示变化量 = 目标位置 - 起始位置
// 第四个参数d表示总帧数
var Tween = {
	linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	//二次的
	quadEaseIn: function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	quadEaseOut: function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	quadEaseInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	//三次的
	qubicEaseIn: function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	qubicEaseOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	qubicEaseInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	//四次的
	quartEaseIn: function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	quartEaseOut: function(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	quartEaseInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	quartEaseIn: function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	quartEaseOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	quartEaseInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	//正弦的
	sineEaseIn: function(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	sineEaseOut: function(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	sineEaseInOut: function(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	expoEaseIn: function(t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	expoEaseOut: function(t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	expoEaseInOut: function(t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	circEaseIn: function(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	circEaseOut: function(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	},
	circEaseInOut: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	elasticEaseIn: function(t, b, c, d, a, p) {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticEaseOut: function(t, b, c, d, a, p) {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
	},
	elasticEaseInOut: function(t, b, c, d, a, p) {
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (.3 * 1.5);
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	},
	//冲过头系列
	backEaseIn: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backEaseOut: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backEaseInOut: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	//弹跳系列
	bounceEaseIn: function(t, b, c, d) {
		return c - Tween.bounceEaseOut(d - t, 0, c, d) + b;
	},
	bounceEaseOut: function(t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	},
	bounceEaseInOut: function(t, b, c, d) {
		if (t < d / 2) return Tween.bounceEaseIn(t * 2, 0, c, d) * .5 + b;
		else return Tween.bounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}
}

//运动模型方法封装
function animate(obj,targetObj,times,tweenName,callback){
	//验证实际参数，即 运动对象，目标点，时间
	if(arguments.length >=3 && typeof arguments[0] != 'object' || typeof arguments[1] != 'object' || typeof arguments[2] != 'number'){
		//进来三个参数，不是要求的 就手动抛出错误
		throw new Error('必传三个参数，第一个为要运动的对象，第二个为要目标点对象，第三个为运动时间');
	}else if(arguments.length == 3){
		//缓冲名和回调函数没有传，框架里有用到，tweenName默认为linear callback默认为null
		tweenName = 'linear';
		callback = null;
	}else if(arguments.length == 4){
		//验证它是 缓冲string 还是函数 function
		switch(typeof arguments[3]){
			case'string':
				callback = null;
				break;
			case'function':
				callback = arguments[3];
				tweenName = 'linear';
				break;
			default:
				throw new Error('第四个参数要么是sting类型的缓冲名，或者是回调函数');		
		};
	}else if(arguments.length == 5 && typeof arguments[3] != 'string' ||typeof arguments[4] != 'function'){
		throw new Error('第四个参数必须为string类型的缓冲名，第五个参数必须为回调函数');
	}
	//关锁
	obj.lock = true;
	// 设置定时器
	var interval = 10;
	// 设置初始位置
	var startObj = {};
	for(var k in targetObj){
		startObj[k] = parseFloat(fetchComputedStyle(obj,k));
	}
	
	// 总帧数
	var maxCount = parseInt(times / interval);
	// 计算步长
	// var step = {};
	// for(var k in targetObj){
	// 	step[k] = (targetObj[k] - startObj[k]) / maxCount;
	// }
	
	// 加入缓冲效果，要把之前的步长改为变化的量
	// 变化的量 = 目标点 -初始值
	var changeObj = {};
	for(var k in targetObj){
		changeObj[k] = targetObj[k] - startObj[k];
	}
	// 设置计数器
	var count = 0;
	
	var timer;
	timer = setInterval(function(){
		// 对所有属性进行一次性累加
		count ++;
		// for(var k in step){
		// 	startObj[k] += step[k];
		// }
		
		for(var k in startObj){
			if(k == 'opacity'){
				obj.style[k] = Tween[tweenName](count, startObj[k], changeObj[k], maxCount);
				obj.style.filter = 'alpha(opacity=' + Tween[tweenName](count, startObj[k], changeObj[k], maxCount) +')';
			}else{
				obj.style[k] = Tween[tweenName](count, startObj[k], changeObj[k], maxCount) + 'px';
			}
		}
		
		// 验证 拉回终点
		if(count == maxCount){
			clearInterval(timer);
			for(var k in targetObj){
				startObj[k] = targetObj[k];
			}
			obj.lock = false;
			// btn.disabled = false;
			callback && callback.call(obj);
		}
	
	},interval)
}

// 获取子元素节点
function children(obj, n){
	//定义一个空数组 存
	var arr = [];
	for(var i = 0; i < obj.childNodes.length; i++){
		//验证
		if(obj.childNodes[i].nodeType == 1){
			arr.push(obj.childNodes[i]);
		};
	};
	
	//返回结果
	//return arr;
	if(arguments.length == 1){
		return arr;
	}else{
		if(arguments[1] == 'last'){
			return arr[arr.length - 1];
		}else if(typeof arguments[1] == 'number'){
			return arr[n];
		};
	};
};

// 获取元素净位置方法
function getAllTop(obj){
	var allTop = obj.offsetTop;
	while(obj = obj.offsetParent){
		allTop += fetchComputedStyle(obj, 'border-top-width');
		allTop += obj.offsetTop;
	};
	return allTop;
};
function getAllLeft(obj){
	var allLeft = obj.offsetLeft;
	while(obj = obj.offsetParent){
		allLeft += fetchComputedStyle(obj, 'border-left-width');;
		allLeft += obj.offsetLeft;
	};
	return allLeft;
};

// 统一滚轮方法
function mouseWheelHandler(event){
	// 验证
	if(event.wheelDelta){
		var direction = event.wheelDelta < 0 ? -1 : 1;
	}else{
		var direction = event.detail < 0 ? 1 : -1;
	}
	console.log(direction)
}
//封装序列化
function queryString(obj){
	var arr = [];
	for(var k in obj){
		arr.push(k + '=' + window.encodeURIComponent(obj[k]));
	};
	return arr.join('&');
}
//ajax封装
var myAjax = {
	get : function(url,data,callback){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >= 200 && xhr.status <300 || xhr.status == 304){
					var res = JSON.parse(xhr.response);
					callback(res);
				}
			}
		}
		var dataStr = queryString(data);
		var dataOk = dataStr ? '?' + dataStr : '';
		xhr.open('get',url + dataOk);
		xhr.send();
	},
	
	post : function(url,data,callback){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readystate == 4){
				if(xhr.status >= 200 && xhr.status <300 || xhr.status == 304){
					var res = JSON.parse(xhr.response);
					callback(res);
				}
			}
		}
		var dataStr = queryString(data);
		xhr.open('post',url);
		xhr.setRequestHeader('content-Type','application/x-www-form-urlencoded');
		xhr.send(dataStr);	
	},
	ajax : function(obj){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					var res = JSON.parse(xhr.response);
					obj.success(res);
				}
			}
		}
		var dataStr = queryString(obj.data);
		if(obj.type == 'get'){
			var dataOk = dataStr ? '?' + dataStr : '';
			xhr.open('get',url + dataOk);
			xhr.send();
		}else if(obj.type == 'post'){
			xhr.open('open',obj,url);
			xhr.setRequestHeader('content-Type','application/x-www-form-urlencoded');
			xhr.send(dataStr);
		}
	}
}
//7.模板方法
//封装
function getCompile(str,data){
	return str.replace(/@([a-z0-9_-]+)@/g,function(match,$1){
		return data[$1];
	});
} 
//8.图片预加载
// function gyjLoading(parent){
// 	//获取所有带gyjsrc的元素
// 	var aImg = document.querySelectorAll(parent + '[gyjsrc]');
// 	if(!aImg){return aImg};
// 	//对这些图进行遍历
// 	for(var i = 0; i < aImg.length; i++){
// 		(function(m){
// 			var img = new Image();
// 			img.src = aImg[m].getAttribute('gyjsrc');
// 			img.onload = function(){
// 				aImg[m].src = aImg[m].getAttribute('gyjsrc');
// 				aImg[m].removeAttribute('gyjsrc');
// 			};
// 		})(i);
// 	};
// };

function wjLoading(parent){
	//获取所有的带 wjsrc的元素
	var aImg = document.querySelectorAll(parent + ' [wjsrc]');
	if(!aImg){return aImg};
	//对这些完进行遍历
	for(var i = 0; i < aImg.length; i++){
		(function(m){
			var img = new Image();
			img.src = aImg[m].getAttribute('wjsrc');
			img.onload = function(){
				aImg[m].src = aImg[m].getAttribute('wjsrc');
				aImg[m].removeAttribute('wjsrc');
			};
		})(i);
	};
};

// 9.获取地址参数
function getUrlData(property){
	var url = window.location.search.replace('?','');
	var re = new RegExp('(^|&)' + property + '=([^&]*)(&|$)');
	var result = url.match(re);
	if(!result) return null;
	return result[2];
}
