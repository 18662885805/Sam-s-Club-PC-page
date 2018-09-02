;(function ($) {
	"use strict"
	
	$.fn.banner = function(options){
		var that = this;
		options.delayTime = options.delayTime || 2000;
		options.timer = options.timer || 200;
		this.MYLOCAL = {
			index:options.items.length-1,	
			iNow:0
		}
		
		if (typeof(options.list)=="object" && options.list.length != 0) {
			options.list.on('click',function () {
				if (that.MYLOCAL.iNow == $(this).index()) {
					return null;
					
				} 
				if (that.MYLOCAL.iNow < $(this).index()) {
					console.log("左")
					options.items.eq(that.MYLOCAL.iNow).css({
						left:0
					}).stop().animate({
						left:-options.items.eq(0).width()
					}).end().eq($(this).index()).css({
						left:options.items.eq(0).width()
					}).stop().animate({
						left:0
					})
				}
				if (that.MYLOCAL.iNow > $(this).index()) {
					console.log("右")					
					options.items.eq(that.MYLOCAL.iNow).css({
						left:0
					}).stop().animate({
						left:options.items.eq(0).width()
					}).end().eq($(this).index()).css({
						left:-options.items.eq(0).width()
					}).stop().animate({
						left:0
					})
				}
				options.list.removeClass("active").eq($(this).index()).addClass("active");
				that.MYLOCAL.iNow= $(this).index();	
			})
		} 
	
	
	
		if (typeof(options.left)=="object" && options.left.length != 0 &&
		typeof(options.right)=="object" && options.right.length != 0){
			options.right.on("click",function () {
				if (that.MYLOCAL.iNow == options.items.length-1) {
					that.MYLOCAL.iNow = 0;
					that.MYLOCAL.index = options.items.length-1;
				} else{
					that.MYLOCAL.iNow++;
					that.MYLOCAL.index = that.MYLOCAL.iNow-1;
				}
				//console.log(that.MYLOCAL.index,that.MYLOCAL.iNow)
			options.items.eq(that.MYLOCAL.index).css({
						left:0
					}).stop().animate({
						left:-options.items.eq(0).width()
					}).end().eq(that.MYLOCAL.iNow).css({
						left:options.items.eq(0).width()
					}).stop().animate({
						left:0
					})
			options.list.removeClass("active").eq(that.MYLOCAL.iNow).addClass("active");
			})
			
			
			options.left.on("click",function () {
				if (that.MYLOCAL.iNow == 0 ) {
					that.MYLOCAL.iNow = options.items.length-1;
					that.MYLOCAL.index = 0;
				} else{
					that.MYLOCAL.iNow--;
					that.MYLOCAL.index = that.MYLOCAL.iNow+1;
				}
				//console.log(that.MYLOCAL.index,that.MYLOCAL.iNow)
			options.items.eq(that.MYLOCAL.index).css({
						left:0
					}).stop().animate({
						left:options.items.eq(0).width()
					}).end().eq(that.MYLOCAL.iNow).css({
						left:-options.items.eq(0).width()
					}).stop().animate({
						left:0
					})
			options.list.removeClass("active").eq(that.MYLOCAL.iNow).addClass("active");
			})
					
		}
	
	
		if(options.autoPlay == true || options.autoPlay == undefined){
			if (typeof(options.left)=="object" && options.left.length != 0 && typeof(options.right)=="object" && options.right.length != 0) {
				this.MYLOCAL.timer = setInterval(()=>{
					options.right.trigger("click")
					},1000)
				this.hover(function(){
					clearInterval ( that.MYLOCAL.timer);
					},function () {
						clearInterval ( that.MYLOCAL.timer);
						that.MYLOCAL.timer = setInterval(()=>{
						options.right.trigger("click")},1000)
					}
				)
			} else{
				
			}
			
		}
	
	}
})(jQuery);
