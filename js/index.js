//创建全局基础路径变量
var baseUrl = 'http://159.75.89.136:3000';
//获取导航分类数据,并分隔域
(function(){
	var catTemplate = document.querySelector('#cat-template').innerHTML;
	var catList = document.querySelector('.cat-list');
	myAjax.get(baseUrl + '/api_cat', {}, function(res){
		// console.log(res);
		//验证数据
		if(res.code != 0){
			console.log(res);
			return;
		};
		//证明数据是OK
		var arr = res.data;
		var str = '';
		for(var i = 0; i < arr.length; i++){
			//str += getCompile('<li><a href="">@cat_name@</a></li>', arr[i]);	
			//str += '<li><a href="">'+arr[i].cat_name+'</a></li>';	
			str += getCompile(catTemplate, arr[i]);
			
		};
		
		// console.log(str);
		catList.innerHTML = str;
	});
})();
//获取轮播图数据
(function(){
	var oBannerList = document.querySelector('.box');
	myAjax.get(baseUrl + '/api_banner',{bannerId : 1},function(res){
		console.log(res);
		if(res.code != 0){
			console.log(res);
			return;
		};
		
		//组装DOM
		var str = '';
		for(var i = 0; i < res.data.length; i++){
			str += `<li><a href=""><img src="img/loading.gif" wjsrc="${res.data[i].goods_thumb}" ></a></li>`;
		};
		console.log(str);
		oBannerList.innerHTML = str;
		//调用图片预加载
		
		console.log(document.querySelectorAll('.box li'));

		//调用轮播方法
		bannerPlay();
		wjLoading('.box');
	});
	//封装轮播图方法
	function bannerPlay(){
		// 轮播图js
		var banner = document.getElementById('banner');
		var last = document.getElementById("last");
		var next = document.getElementById("next");
		var box = document.getElementById("box");
		var List = box.getElementsByTagName('li');
		
		box.appendChild(List[0].cloneNode(true));
		console.log(List[6]);
		// 动态获取轮播图的ul宽度
		box.style.width = List.length * List[0].clientWidth + 'px';
		var n = 0;
		var moveTime = 500;
		var moveName = "quadEaseIn";
		var Next = function(){
			if(box.lock){return};
			n++;
			animate(box,{left:-List[0].clientWidth * n},moveTime,moveName,function(){
				if(n >= 6){
					n = 0;
					box.style.left = -List[0].clientWidth * n + 'px';
				};
			});
		};
		var Last = function(){
			if(box.lock){return};
			n--;
				if(n < 0){
					n = List.length - 1;
					box.style.left = -List[0].clientWidth * n + 'px';
					n--;
				};
			animate(box,{left:-List[0].clientWidth * n},moveTime,moveName);
		};
		next.onclick = Next;	
		last.onclick = Last;
		
		var timer = setInterval(Next,2000);
		
		banner.onmouseover = function(){
			clearInterval(timer);
		};
		banner.onmouseout = function(){
			timer = setInterval(Next,2000);
		};
	}
})();