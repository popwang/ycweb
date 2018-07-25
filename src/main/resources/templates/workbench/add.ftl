<!DOCTYPE html>
<html>
<head>
    <base href=" ${basepath!}">
    <meta name="viewport" content="width=device-width" />
    <title>设备添加工作台</title>
<#include "/public_css.ftl" >
    <link rel="stylesheet" href="css/model/rygj.css">
</head>
<body style="background-color:#fafafa">
<div class="col-md-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4>设备添加</h4>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label>设备编号</label>
							<div class="input-group" style="width:300px">
		                        <input name="ename" id="ename" class="form-control">
		                    </div>
						</div>
						<div class="form-group">
							<label for="project">项目名称</label>
							<input name="project" id="project" class="form-control" style="width:300px;">
						</div>
						<div class="form-group">
							<label for="company">施工单位</label>
							<input name="company" id="company" class="form-control" style="width:300px;">
						</div>
						
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="tel">联系电话</label>
							<input name="tel" id="tel" class="form-control" style="width:300px;">
						</div>
						<div class="form-group">
							<label for="longi">百度地图经度</label>
							<input name="longi" id="longi" class="form-control" style="width:300px;">
						</div>
						<div class="form-group">
							<label for="lati">百度地图纬度</label>
							<input name="lati" id="lati" class="form-control" style="width:300px;">
						</div>
						<div class="form-group">
							<button type="button" onclick="javascript:submitForm();" class="btn btn-sm btn-warning">添加设备</button>
						</div>
						<span id="msg">${msg! }</span>
					</div>
				</div>
			</div>
		</div>
</div>
</body>
<#include "/public_js.ftl" >
<script src="js/plugins/echarts/echarts.min.js"></script>
<script type="text/javascript">
function submitForm(){
	var error = $("#msg");
	var ename = $("#ename").val();
	var project = $("#project").val();
	var company = $("#company").val();
	var tel = $("#tel").val();
	var longi = $("#longi").val();
	var lati = $("#lati").val();
	
	if(ename.length==0){
		error.html("设备名称不能为空！");
		return false;
	}
	if(project.length==0){
		error.html("项目名称不能为空！");
		return false;
	}
	if(company.length==0){
		error.html("施工单位不能为空！");
		return false;
	}
	if(tel.length==0){
		error.html("联系电话不能为空！");
		return false;
	}
	if(longi.length==0){
		error.html("经度不能为空！");
		return false;
	}
	if(lati.length==0){
		error.html("纬度不能为空！");
		return false;
	}
	
	$.ajax({
		url:"Equipment_info2/addEquipmentinfo2.htm",
		cache:false,
        async:true,
        dataType:'json',
        type:'post',
		data:{
			ename:ename,
			project:project,
			company:company,
			tel:tel,
			longi:longi,
			lati:lati
		},
		success:function(result){
			if(result.flag=="false"){
				error.html(result.msg);
			}else{
				error.html(result.msg);
				$("#ename").val("");
				$("#project").val("");
				$("#company").val("");
				$("#tel").val("");
				$("#longi").val("");
				$("#lati").val("");
			}
		},
		error:function(){
			error.html("添加失败，请检查输入是否正确！");
		}
	});
}

</script>
</html>