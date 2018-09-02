$("#btn2").click(function(){
			$.ajax({			
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					status:"login",
					userID:$("#user").val(),
					password:$("#pass").val(),				
				},
				success:function(res){
					switch (res){
						case "0":alert("用户名不存在");						
							break;
						case "2":alert("密码错误");					
							break;
						default:
							var username = JSON.parse(res).userID;
							alert("登陆成功,欢迎用户  "+username+"  点击跳转至首页");							
							$.cookie("user",username)
							setInterval(function(){
								location.href = "homepage.html"								
							},1000)							
					}
				}				
			})
		})