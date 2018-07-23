﻿$(function() {
	var app = angular.module('myApp', [ 'toaster', 'ngAnimate' ]);
	app.controller(
					'myCtrl',
					function($scope, $rootScope, $http, toaster) {
						$scope.roles = [ {
							roleid : 1,
							rolename : "高管"
						}, {
							roleid : 2,
							rolename : "部门经理"
						}, {
							roleid : 3,
							rolename : "项目经理"
						}, {
							roleid : 4,
							rolename : "员工"
						} ];
						$scope.juese = $scope.roles[3].roleid;
						// 默认打开部门和项目，因为是员工
						$scope.isShowbumen = true;
						$scope.isShowxiangmu = true;
						// 打开注册页面
						$scope.openRegisterModal = function() {
							$http(
									{
										method : 'get',
										url : basePath
												+ '/user/getRegisterInfo.do',
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded'
										},
										params : {}, // 传递数据作为字符串，从前台传到后台
									}).success(function(data) {// 这里的data，就是后台传递过来的数据
								$scope.deptInfo = data.dept;
								$scope.projectInfo = data.project;
								showRegisterForm();
								setTimeout(function() {
									$('#loginModal').modal('show');
								}, 230);
							})

						}
						var location = (window.location + '').split('/');
						var basePath = location[0] + '//' + location[2] + '/'
								+ location[3];

						// 注册请求
						$scope.registerClick = function() {
							if ($scope.juese == 2
									&& ($scope.bumen == undefined || $scope.bumen == null)) {
								toaster.pop({
									type : 'error',
									title : '提示',
									body : "部门经理必须选择一个部门",
									timeout : 2000
								});
							} else if ($scope.juese == 3
									&& ($scope.xiangmu == undefined || $scope.xiangmu == null)) {
								toaster.pop({
									type : 'error',
									title : '提示',
									body : "项目经理必须选择一个项目",
									timeout : 2000
								});
							} else if ($scope.juese == 4
									&& ($scope.xiangmu == undefined || $scope.xiangmu == null)
									&& ($scope.bumen == undefined || $scope.bumen == null)) {
								toaster.pop({
									type : 'error',
									title : '提示',
									body : "员工必须选择部门或者项目",
									timeout : 2000
								});
							} else if ($("#loginnameRe").val().trim() == null
									|| $("#loginnameRe").val().trim() == "") {
								toaster.pop({
									type : 'error',
									title : '提示',
									body : "请输入用户名",
									timeout : 2000
								});
							} else if ($("#passwordRe").val().trim() == null
									|| $("#passwordRe").val().trim() == "") {
								toaster.pop({
									type : 'error',
									title : '提示',
									body : "请输入密码",
									timeout : 2000
								});
							} else if ($("#usernameRe").val().trim() == null
									|| $("#usernameRe").val().trim() == "") {
								toaster.pop({
									type : 'error',
									title : '提示',
									body : "请输入姓名",
									timeout : 2000
								});
							} else if (!($("#password_confirmationRe").val()
									.trim() == $("#passwordRe").val().trim())) {
								toaster.pop({
									type : 'error',
									title : '提示',
									body : "两次密码输入不一致",
									timeout : 2000
								});
							} else {
								$http(
										{
											method : 'post',
											url : basePath
													+ '/user/registerUser.do',
											headers : {
												'Content-Type' : 'application/x-www-form-urlencoded'
											},
											params : {
												juese : $scope.juese,
												xiangmu : $scope.xiangmu,
												bumen : $scope.bumen,
												login : encodeURI($(
														"#loginnameRe").val()
														.trim()),
												pass : encodeURI($(
														"#passwordRe").val()
														.trim()),
												name : encodeURI($(
														"#usernameRe").val()
														.trim())
											}, // 传递数据作为字符串，从前台传到后台
										}).success(
										function(data) {// 这里的data，就是后台传递过来的数据
											if (data.msg == "error") {
												toaster.pop({
													type : 'error',
													title : '提示',
													body : "注册用户失败",
													timeout : 2000
												});
											} else {
												window.location = basePath
														+ "/user/userMain.do";
											}
										})
										.error(
												function(data, status, headers,
														config) {
													toaster.pop({
														type : 'error',
														title : '提示',
														body : "注册用户失败",
														timeout : 2000
													});
												});
							}
						};
						
						$(document).keypress(function(e) {  
						   // 回车键事件  
					       if(e.which == 13) {
					    	   $scope.clickk();
					       }
						});
						
						// 登录请求
						$scope.clickk = function() {
							var getTimestamp = new Date().getTime();
							$http(
									{
										method : 'post',
										url : 'login.htm',
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded',
											'timestamp' : getTimestamp
										},
										params : {
                                            userName : encodeURI($("#username")
													.val()),
                                            password : encodeURI($("#password")
													.val()),
											time : getTimestamp
										}, // 传递数据作为字符串，从前台传到后台
									}).success(
									function(data) {// 这里的data，就是后台传递过来的数据
										if (data.msg == "error") {
										 alert("账号密码错误");
										} else {
											window.location =
													"main.htm?time="
													+ getTimestamp;
										}
									}).error(
									function(data, status, headers, config) {
										alert("异常");
									});
						}
					});

	var errorValue = $.trim($("#errorTip").val());
	if (errorValue != "" && errorValue != null) {
		$(".login-error").text(errorValue).show();
	}
	// 页面加载的时候自动隐藏元素，并渐显
	count = 0;
	$("#h4").hide();
	$("#title").hide();
	$("#time").hide();
	$("#username").hide();
	$("#password").hide();
	$("#bottom").hide();
	$("#login_btn").hide();
	$("#time").fadeIn(2000);
	$("#title").fadeIn(2000);
	$("#username").fadeIn(2000);
	$("#password").fadeIn(2000);
	$("#login_btn").fadeIn(2000);
	$("#bottom").fadeIn(2000);
	// 加载cookie,自动获取上次登录的用户密码
	usernameCookie = getCookie("username");
	passwordCookie = getCookie("password");
	/*
	 * username = document.getElementById("username"); password =
	 * document.getElementById("password");
	 */
	if (usernameCookie != null && usernameCookie != "") {
		// username.value = usernameCookie;
		// $("#username").attr("value", usernameCookie);
		$("#username").val(usernameCookie);
	}
	if (passwordCookie != null && passwordCookie != "") {
		// password.value = passwordCookie;
		$("#password").val(passwordCookie);
	}
	// 加载当前时间
	getDate();
	// 显示作者信息
	$("#title").click(function() {
		// $("#h4").toggle(1000, null);
		$(".auth").slideToggle(500);
	});
	// 底部渐隐效果
	$("#bottom").click(function() {
		$("#bottom").fadeOut(1000).fadeIn(1000);
	});
	// 日期颜色切换及滑动等效果
	$("#time").click(function() {
		x = document.getElementById("time");
		if (count == 0) {
			x.style.color = "blue";
			count++;
		} else {
			x.style.color = "black";
			x.style.fontSize = "medium";
			count = 0;
		}
	});
	$("#form").submit(function() {
		return checkLogin();
	});
	$("#time").mouseover(function() {
		$("#time").text("質保部测试系统");
	});
	$("#time").mouseout(function() {
		$("#time").text("谢谢使用");
	});
	// 登陆按钮效果
	$("#login_btn").mouseup(function() {
		$("#login_btn").css("background-color", "transparent");
	});
	$("#login_btn").mousedown(function() {
		$("#login_btn").css("background-color", "green");
	});
	// 登陆名密码点击后文字变空效果 获取焦点时的操作
	$("#username").focus(function() {
		if ($(this).val() == '请输入用户名') {
			$(this).val("")
		}
	});
	$("#password").focus(function() {
		if ($(this).val() == '请输入密码') {
			$(this).val("")
		}
	});
	// 登录名密码失去焦点后操作
	$("#username").blur(function() {
		if ($(this).val() == '') {
			$(this).val("请输入用户名")
		}
	});
	$("#password").blur(function() {
		if ($(this).val() == '') {
			$(this).val("请输入密码")
		}
	});
	// 用户名密码文字变更后信息验证
	$("#username").change(function() {
		validate_username();
	});
	$("#password").change(function() {
		validate_password();
	});
	if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1) {
		var selectors = document.getElementsByTagName("input");
		for (var i = 0; i < selectors.length; i++) {
			if ((selectors[i].type !== "button")
					&& (selectors[i].type !== "password")) {
				selectors[i].value = " ";
			}
		}
		setTimeout(function() {
			for (var i = 0; i < selectors.length; i++) {
				if (selectors[i].type !== "button") {
					selectors[i].value = "";
				}
			}
		}, 100)
	}
});
function getDate() {
	// 获取系统时间。
	$("#bottom").css("width", $(window).width());
	var dateTime = new Date();
	var yy = dateTime.getFullYear();
	var dd = dateTime.getDate();
	var mo = dateTime.getMonth() + 1;
	var hh = dateTime.getHours();
	var mm = dateTime.getMinutes();
	var ss = dateTime.getSeconds();
	var week = dateTime.getDay();
	switch (week) {
	case 1:
		week = "星期一";
		break;
	case 2:
		week = "星期二";
		break;
	case 3:
		week = "星期三";
		break;
	case 4:
		week = "星期四";
		break;
	case 5:
		week = "星期五";
		break;
	case 6:
		week = "星期六";
		break;
	case 7:
		week = "星期日";
		break;
	}
	// 分秒时间是一位数字，在数字前补0。
	yy = extra(yy);
	dd = extra(dd);
	mo = extra(mo);
	mm = extra(mm);
	ss = extra(ss);
	// 将时间显示到ID为time的位置，时间格式形如：19:18:02
	$("#time").text(
			yy + "年" + mo + "月" + dd + "日" + "  " + hh + ":" + mm + ":" + ss
					+ "  " + week);
	// 每隔1000ms执行方法systemTime()。
	setTimeout("getDate()", 1000);
}
// 补位函数。
function extra(x) {
	// 如果传入数字小于10，数字前补一位0。
	if (x < 10) {
		return "0" + x;
	} else {
		return x;
	}
}
// 获取cookie信息
function getCookie(name) {
	cookie = $.cookie(name);
	if (cookie != null) {
		return cookie;
	} else {
		return "";
	}
}
// 登陆前再次检查信息是否有误
function checkLogin() {
	if (validate_username() == false) {
		$("#username").focus();
		return false;
	}
	if (validate_password() == false) {
		$("#password").focus();
		return false;
	}
	// setCookie("username", $("#username").val(), 365);
	// setCookie("password", $("#password").val(), 365);
	$("#time").fadeOut(1000);
	$("#title").fadeOut(1000);
	$("#h4").fadeOut(1000);
	$("#username").fadeOut(1000);
	$("#password").fadeOut(1000);
	$("#login_btn").fadeOut(1000);
	$("#bottom").fadeOut(1000);

}
function validate_username() {
	if (!validate_required($("#username"))) {
		$(".login-error").text("用户名输入有误，请重新输入").show();
		return false;
	}
}
function validate_password() {
	if (!validate_required($("#password"))) {
		$(".login-error").text("密码输入有误，请重新输入").show();
		return false;
	}
}
// 用户密码输入格式验证 a-z 0-9
function validate_required(field) {
	var b = new RegExp("^[0-9a-zA-Z]*$");
	value = field.val();
	if (value == null || value == "" || value == "请输入用户名" || value == "请输入密码") {
		return false
	} else if (!b.test(value)) {
		return false;
	} else {
		return true

	}
}
// 格式无误后保存cookie信息
function setCookie(name, value, days) {
	$.cookie(name, value, {
		expires : days
	});
}