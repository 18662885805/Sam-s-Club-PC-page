//顶部栏鼠标移动效果！
$("#nav_top_list_ul").children("li").mouseover(
	function  () {
		$(this).css({background:"#004b8e",color:"white"}).children("ul").stop().slideDown(300);
	}
);
$("#nav_top_list_ul").children("li").mouseout(
	function  () {
		$(this).css({background:"",color:"#8fccf8"}).children("ul").stop().slideUp(300);
	}
);

//登录状态验证
if ($.cookie("user")) {
 	document.getElementsByClassName("nav_top_login")[0].innerHTML = "欢迎尊敬的会员朋友！"
}




//获取导航栏对象！
var onavbot = document.getElementsByClassName("nav_bot")[0];
var onavbot1 = document.getElementById("navbot1");
var onavbot2 = document.getElementById("navbot2");
var onavbot3 = document.getElementById("navbot3");
var onavbot4 = document.getElementById("navbot4");
var onavbot5 = document.getElementById("navbot5");
var onavbot6 = document.getElementById("navbot6");
var onavbot7 = document.getElementById("navbot7");
var onavbot8 = document.getElementById("navbot8");
var onavbot9 = document.getElementById("navbot9");
var onavbot10 = document.getElementById("navbot10");
var onavbot11 = document.getElementById("navbot11");

//导航栏吸顶效果！
document.onscroll = function(){
	 var scrollt = document.body.scrollTop||document.documentElement.scrollTop;
	 if (scrollt > 102) {
	 	onavbot.style.position = "absolute";    
	 	onavbot.style.top = scrollt + "px"; 
	 	onavbot.style.zIndex = 10;
	 }else{
	 	onavbot.style.position = ""; 
	 }
}


//导航栏鼠标移动事件！
function navbotmouse(obj,str){
	obj.onmouseover = function(){	
		obj.children[1].style.display = "block";
		obj.children[1].innerHTML = str;
		obj.classList.add("navactive");
		obj.children[0].style.color = "#004b8e";
	}
	obj.onmouseout = function () {
		obj.children[1].style.display = "none";
		obj.classList.remove("navactive");
		obj.children[0].style.color = "white";
	}
}
navbotmouse(onavbot1,navstr1);
navbotmouse(onavbot2,navstr2);
navbotmouse(onavbot3,navstr1);
navbotmouse(onavbot4,navstr4);
navbotmouse(onavbot5,navstr5);
navbotmouse(onavbot6,navstr1);
navbotmouse(onavbot7,navstr1);
navbotmouse(onavbot8,navstr4);
navbotmouse(onavbot9,navstr5);
navbotmouse(onavbot10,navstr10);
navbotmouse(onavbot11,navstr5);


//nav 轮播图模块！
var timer = null;
var iNow = -1;
function bannermove(){
	timer = setInterval(()=>{
		
		if (iNow == 6) {
			iNow = 0;
		} else{
			iNow ++
		}
		$(".imgbox").children("li").eq(iNow).stop().fadeIn(300).siblings().stop().fadeOut();
		$(".imgbtn").children("li").eq(iNow).css(
			{"background":"#0e5593","color":"white"}
			).siblings().css(
				{"background":"#f3f8fc","color":"#33383e"}
			)
	},2000)
}
bannermove();
$(".imgbtn").children("li").hover(
	function () {
		clearInterval(timer);
		iNow = $(this).index();
		$(".imgbox").children("li").eq(iNow).stop().fadeIn(300).siblings().stop().fadeOut();
		$(".imgbtn").children("li").eq(iNow).css(
			{"background":"#0e5593","color":"white"}
			).siblings().css(
				{"background":"#f3f8fc","color":"#33383e"}
			)
	},function () {
		bannermove();
	}
)


//大叔推荐数据展示！
ajaxGet("http://localhost/JiangMinYu/data/recommend2.json").then(function (res) {
	var str = "";
	var res =JSON.parse(res);
	console.log(res)
	for (var i = 0;i<res.length;i++) {
		str += `
		<dl>
			<dt><a href="tramier.html"><img src="${res[i].src}" /></a></dt>
			<dd>
				<p>
				<span><a href="http://localhost/JiangMinYu/tramier.html">${res[i].name}</a></span><br />			
				<span>${res[i].price}</span>
				</p>
				<p>
					<span>${res[i].comment1}</span><br />
					<span>${res[i].comment2}</span>
				</p>
			</dd>
		</dl>
		`
	}
		var obj = document.getElementById("recommend_box");
		obj.innerHTML = str;
	
})



//会员热购分区数据加载！

//生鲜食品
ajaxGet("http://localhost/JiangMinYu/data/bestbuy01.json").then(function (res) {
var str = "";
var res =JSON.parse(res);
for (var i = 0;i<res.length;i++) {
	str += `
	<dl data-id="${res[i].goodsId}">
		<dt><img src="${res[i].src}" /></dt>
		<dd>
			<span>${res[i].name}</span>
			<span>${res[i].price}<em><i class="iconfont">&#xe609;</i></em></span>
		</dd>
	</dl>
`
}
var bestbuy = `<div>` + str + `</div>
	<p id="bestbuy_next`+1+`"><i class="iconfont" >&#xe6a7;</i></p>
	<p id="bestbuy_prev`+1+`"><i class="iconfont" >&#xe697;</i></p>
`
var obj = document.getElementById("freshfood_right");
obj.innerHTML = bestbuy;
fn1("freshfood_right");
fn2("#bestbuy_next1","#bestbuy_prev1")
$("em").click(function(){
	alert("成功添加至购物车！");
	var index = $(this).parent().parent().parent().attr("data-id");
			
			var goods = [];
			
			if(!$.cookie("goods")){
				goods.push({
					"id":index,
					"num":1
				})
				
				var a = JSON.stringify(goods)

				$.cookie("goods",a)
			}else{
				goods = JSON.parse($.cookie("goods"));
				
				var onOff = true;
				
				for(var i=0;i<goods.length;i++){
					if(index == goods[i].id){
						goods[i].num++
						onOff = false;
					}
				}
				if(onOff){
					goods.push({
						"id":index,
						"num":1
					})
				}
				
				var b = JSON.stringify(goods);
				$.cookie("goods",b)
			}
})
})
console.log($.cookie("goods"));
//零食饮料
ajaxGet("http://localhost/JiangMinYu/data/bestbuy02.json").then(function (res) {
var str = "";
var res =JSON.parse(res);
for (var i = 0;i<res.length;i++) {
	str += `
	<dl data-id="${res[i].goodsId}">
		<dt><img src="${res[i].src}" /></dt>
		<dd>
			<span>${res[i].name}</span>
			<span>${res[i].price}</span>
		</dd>
	</dl>
`
}
var bestbuy = `<div>` + str + `</div>
	<p id="bestbuy_next`+2+`"><i class="iconfont">&#xe6a7;</i></p>
	<p id="bestbuy_prev`+2+`"><i class="iconfont">&#xe697;</i></p>
`
var obj = document.getElementById("snack_right");
obj.innerHTML = bestbuy;
fn1("snack_right");
fn2("#bestbuy_next2","#bestbuy_prev2")
$(".iconfont").click(function(){
	
	var index = $(this).parent().parent().parent().attr("data-id");
			
			var goods = [];
			
			if(!$.cookie("goods")){
				goods.push({
					"id":index,
					"num":1
				})
				
				var a = JSON.stringify(goods)

				$.cookie("goods",a)
			}else{
				goods = JSON.parse($.cookie("goods"));
				
				var onOff = true;
				
				for(var i=0;i<goods.length;i++){
					if(index == goods[i].id){
						goods[i].num++
						onOff = false;
					}
				}
				if(onOff){
					goods.push({
						"id":index,
						"num":1
					})
				}
				
				var b = JSON.stringify(goods);
				$.cookie("goods",b)
			}
})
})
//宝宝中心
ajaxGet("http://localhost/JiangMinYu/data/bestbuy03.json").then(function (res) {
var str = "";
var res =JSON.parse(res);
for (var i = 0;i<res.length;i++) {
	str += `
	<dl data-id="${res[i].goodsId}">
		<dt><img src="${res[i].src}" /></dt>
		<dd>
			<span>${res[i].name}</span>
			<span>${res[i].price}</span>
		</dd>
	</dl>
`
}
var bestbuy = `<div>` + str + `</div>
	<p id="bestbuy_next`+3+`"><i class="iconfont">&#xe6a7;</i></p>
	<p id="bestbuy_prev`+3+`"><i class="iconfont">&#xe697;</i></p>
`
var obj = document.getElementById("babycenter_right");
obj.innerHTML = bestbuy;
fn1("babycenter_right");
fn2("#bestbuy_next3","#bestbuy_prev3")
$(".iconfont").click(function(){
	
	var index = $(this).parent().parent().parent().attr("data-id");
			
			var goods = [];
			
			if(!$.cookie("goods")){
				goods.push({
					"id":index,
					"num":1
				})
				
				var a = JSON.stringify(goods)

				$.cookie("goods",a)
			}else{
				goods = JSON.parse($.cookie("goods"));
				
				var onOff = true;
				
				for(var i=0;i<goods.length;i++){
					if(index == goods[i].id){
						goods[i].num++
						onOff = false;
					}
				}
				if(onOff){
					goods.push({
						"id":index,
						"num":1
					})
				}
				
				var b = JSON.stringify(goods);
				$.cookie("goods",b)
			}
})
})
//清洁个护
ajaxGet("http://localhost/JiangMinYu/data/bestbuy04.json").then(function (res) {
var str = "";
var res =JSON.parse(res);
for (var i = 0;i<res.length;i++) {
	str += `
	<dl data-id="${res[i].goodsId}">
		<dt><img src="${res[i].src}" /></dt>
		<dd>
			<span>${res[i].name}</span>
			<span>${res[i].price}</span>
		</dd>
	</dl>
`
}
var bestbuy = `<div>` + str + `</div>
	<p id="bestbuy_next`+4+`"><i class="iconfont">&#xe6a7;</i></p>
	<p id="bestbuy_prev`+4+`"><i class="iconfont">&#xe697;</i></p>
`
var obj = document.getElementById("cleaing_right");
obj.innerHTML = bestbuy;
fn1("cleaing_right");
fn2("#bestbuy_next4","#bestbuy_prev4")
$(".iconfont").click(function(){
	
	var index = $(this).parent().parent().parent().attr("data-id");
			
			var goods = [];
			
			if(!$.cookie("goods")){
				goods.push({
					"id":index,
					"num":1
				})
				
				var a = JSON.stringify(goods)

				$.cookie("goods",a)
			}else{
				goods = JSON.parse($.cookie("goods"));
				
				var onOff = true;
				
				for(var i=0;i<goods.length;i++){
					if(index == goods[i].id){
						goods[i].num++
						onOff = false;
					}
				}
				if(onOff){
					goods.push({
						"id":index,
						"num":1
					})
				}
				
				var b = JSON.stringify(goods);
				$.cookie("goods",b)
			}
})
})
//数码电器
ajaxGet("http://localhost/JiangMinYu/data/bestbuy05.json").then(function (res) {
var str = "";
var res =JSON.parse(res);
for (var i = 0;i<res.length;i++) {
	str += `
	<dl data-id="${res[i].goodsId}">
		<dt><img src="${res[i].src}" /></dt>
		<dd>
			<span>${res[i].name}</span>
			<span>${res[i].price}</span>
		</dd>
	</dl>
`
}
var bestbuy = `<div>` + str + `</div>
	<p id="bestbuy_next`+5+`"><i class="iconfont">&#xe6a7;</i></p>
	<p id="bestbuy_prev`+5+`"><i class="iconfont">&#xe697;</i></p>
`
var obj = document.getElementById("digital_right");
obj.innerHTML = bestbuy;
fn1("digital_right");
fn2("#bestbuy_next5","#bestbuy_prev5")
$(".iconfont").click(function(){
	
	var index = $(this).parent().parent().parent().attr("data-id");
			
			var goods = [];
			
			if(!$.cookie("goods")){
				goods.push({
					"id":index,
					"num":1
				})
				
				var a = JSON.stringify(goods)

				$.cookie("goods",a)
			}else{
				goods = JSON.parse($.cookie("goods"));
				
				var onOff = true;
				
				for(var i=0;i<goods.length;i++){
					if(index == goods[i].id){
						goods[i].num++
						onOff = false;
					}
				}
				if(onOff){
					goods.push({
						"id":index,
						"num":1
					})
				}
				
				var b = JSON.stringify(goods);
				$.cookie("goods",b)
			}
})
})
//会员热购分区单元排列效果！
function fn1(ele){
	var obj = document.getElementById(ele);
	var a =  obj.children[0].children.length;
	for (var i=0; i<a;i++) {
	obj.children[0].children[i].style.left = i * 240 + "px";
	}
}
//会员热购分区滑动效果！
function fn2(ele1,ele2){
	var iPrev = 4;
	var iNow = 1;
	$(ele1).click(		
		function(){	
			if (iNow <= 1 && iPrev <= 4) {
				iNow +=1;
				iPrev += 1;
				//console.log(iNow ,iPrev)
				$(this).siblings().children("dl").animate({ left:"-=240px"})
			} else{
				iNow = 2;
				iPrev = 5;
			}
		}
	)
	$(ele2).click(		
		function(){	
			if (iNow > 1 && iPrev >4) {
				iNow -=1;
				iPrev -= 1;
				//console.log(iNow ,iPrev)
				$(this).siblings().children("dl").animate({ left:"+=240px"})
			} else{
				iNow = 1;
				iPrev = 4;
			}
		}
	)
} 




//山姆厨房数据展示
var url="http://localhost/JiangMinYu/data/kitchen.json"
		ajaxGet(url).then(function(res){
			var str = "";
			res = JSON.parse(res)
		for (var i = 0;i<res.length;i++) {
			str += `
			<dl>
				<dt><img src="${res[i].src}" /></dt>
				<dd>
					<span>${res[i].name}</span>
					<h5>${res[i].distruction}</h5>
					<a href="#">学起来</a>
				</dd>
			</dl>
		`
		}		
		var obj = document.getElementById("samskitchen_box");
		obj.innerHTML = str;
		kitchenposition("samskitchen_right_bottom");
		})


//山姆厨房定位、滑动效果
function kitchenposition(ele){
	var obj = document.getElementById(ele);
	var a =  obj.children[0].children.length;
	for (var i=0; i<a;i++) {
	obj.children[0].children[i].style.left = i * 220 + "px";
	}
}
function kitchenmove(ele1,ele2){
	var iPrev = 3;
	var iNow = 1;
	$(ele1).click(		
		function(){	
			if (iNow <= 1 && iPrev <= 3) {
				iNow +=1;
				iPrev += 1;
				//console.log(iNow ,iPrev)
				$(this).siblings().children("dl").animate({ left:"-=220px"})
			} else{
				iNow = 2;
				iPrev = 4;
			}
		}
	)
	$(ele2).click(		
		function(){	
			if (iNow > 1 && iPrev >3) {
				iNow -=1;
				iPrev -= 1;
				//console.log(iNow ,iPrev)
				$(this).siblings().children("dl").animate({ left:"+=220px"})
			} else{
				iNow = 1;
				iPrev = 3;
			}
		}
	)
} 
kitchenmove("#bestbuy_next6","#bestbuy_prev6")

//评论区数据获取展示

ajaxGet("http://localhost/JiangMinYu/data/comment.json").then(function(res){
	var str = "";
	var res = JSON.parse(res);
		for (var i = 0;i<res.length;i++) {
			str += `
			<div>
				<div>
					<img src="${res[i].src}"  />
					<p>${res[i].name}</p>
					<a href="#">@山姆会员商店</a><br />
				</div>
				<span>${res[i].comments}</span>
			</div>
		`
		}		
		var obj = document.getElementById("different_right");
		obj.innerHTML = str;
})

