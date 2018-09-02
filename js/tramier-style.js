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

//放大镜效果！
	var imgarr = ["http://localhost/JiangMinYu/img/bigimg1.jpg",
	"http://localhost/JiangMinYu/img/bigimg2.jpg",
	"http://localhost/JiangMinYu/img/bigimg3.jpg",
	"http://localhost/JiangMinYu/img/bigimg4.jpg",
	"http://localhost/JiangMinYu/img/bigimg5.jpg",
	"http://localhost/JiangMinYu/img/bigimg6.jpg"]
	var body_mid_cenert = document.getElementById("body_mid_cenert")
	var pBox = body_mid_cenert.children[1];
	var bigimg = document.getElementById("bigimg");
	var bImg =  bigimg.children[0];
	$("#body_mid_left").children("ul").children("li").click(
		function () {
			$(this).siblings().css({"border":"none"})
			$(this).css({"border":"3px solid #006fc3"})
			var imgindex = $(this).index();			
			body_mid_cenert.children[0].src = imgarr[imgindex];
			bigimg.children[0].src = imgarr[imgindex];			
		}		
	)
	body_mid_cenert.onmouseover = function(){
			pBox.style.display = "block";
			bigimg.style.display = "block";
			var size = {
				sBoxW:body_mid_cenert.offsetWidth,
				sBoxH:body_mid_cenert.offsetHeight,
				pBoxW:pBox.offsetWidth,
				pBoxH:pBox.offsetHeight,
				bImgW:bImg.offsetWidth,
				bImgH:bImg.offsetHeight,
				bBoxW:bigimg.offsetWidth,
				bBoxH:bigimg.offsetHeight
			}
			body_mid_cenert.onmousemove = function(eve){
				var e = eve || window.event;
				var l = e.offsetX - size.pBoxW/2;
				var t = e.offsetY - size.pBoxH/2;
				if(l<0){
					l = 0
				}
				if(t<0){
					t = 0
				}
				if(l>size.sBoxW - size.pBoxW){
					l = size.sBoxW - size.pBoxW
				}
				if(t>size.sBoxH - size.pBoxH){
					t = size.sBoxH - size.pBoxH
				}
				pBox.style.left = l + "px";
				pBox.style.top = t + "px";
				//左边框：计算比例:当前值/总值 = 比例
				var biliW = pBox.offsetLeft/(size.sBoxW - size.pBoxW);
				var biliH = pBox.offsetTop/(size.sBoxH - size.pBoxH);
				//右边框使用比例：比例*总值 = 当前值
				bImg.style.left = -biliW * (size.bImgW - size.bBoxW) + "px";
				bImg.style.top = -biliH * (size.bImgH - size.bBoxH) + "px";
			}
		}
		
		body_mid_cenert.onmouseout = function(){
			pBox.style.display = "none";
			bigimg.style.display = "none";
		}
	

//body下拉大菜单效果
var body_bot_info = document.getElementById("body_bot_info");
var arr_info = ["http://localhost/JiangMinYu/tramier_info.html #info1",
				"http://localhost/JiangMinYu/tramier_info.html #info2",
				"http://localhost/JiangMinYu/tramier_info.html #info3",
				"http://localhost/JiangMinYu/tramier_info.html #info5"]
$("#body_bot_info").load(arr_info[0]);
$("#body_bot").children("ul").children("li").click(
	function () {
		$(this).css({"color":"#006ab0","border-bottom":"3px solid #006ab0"}).siblings("li").css({"color":"","border-bottom":""});
		var a = $(this).index();
		body_bot_info.innerHTML = "";
		$("#body_bot_info").load(arr_info[a]);	
	}	
)


//买了还买模块
function buymoreposition(ele){
	var obj = document.getElementById(ele);
	var a =  obj.children[0].children.length;
	for (var i=0; i<a;i++) {
	obj.children[0].children[i].style.left = i * 240 + "px";
	}
}
buymoreposition("buymore_box");
function buymoremove(ele1,ele2){
	var iPrev = 5;
	var iNow = 1;
	$(ele1).click(		
		function(){	
			if (iNow <= 1 && iPrev <= 5) {
				iNow +=1;
				iPrev += 1;
				console.log(iNow ,iPrev)
				$(this).siblings().children("dl").animate({ left:"-=240px"})
			} else{
				iNow = 2;
				iPrev = 6;
			}
		}
	)
	$(ele2).click(		
		function(){	
			if (iNow > 1 && iPrev >5) {
				iNow -=1;
				iPrev -= 1;
				console.log(iNow ,iPrev)
				$(this).siblings().children("dl").animate({ left:"+=240px"})
			} else{
				iNow = 1;
				iPrev = 5;
			}
		}
	)
} 
buymoremove("#buymore_next","#buymore_prev")


