<template>
	<div class="newguding">
		<div class="demo-input-suffix">
		  <span>品名：</span>
		  <el-input
		    placeholder="请填写品名" v-model="proname" clearable>
		  </el-input>
  		</div>
		<div class="demo-input-suffix">
			 <span>条码：</span>
			  <el-input
			    placeholder="请填写条码" v-model="proid" clearable>
			  </el-input>
	  	</div>
		<div class="demo-input-suffix">
			 <span>售价：</span>
			  <el-input
			    placeholder="请填写售价" v-model="proprice" clearable>
			  </el-input>
	  	</div>
	  	<div class="demo-input-suffix">
			 <span>分类：</span>
			  <el-select v-model="type" placeholder="请选择分类">
			    <el-option
			      v-for="item in typegroup"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
	  	</div>
	  	<div class="demo-input-suffix">
			<span>操作：</span>
			  <el-select v-model="state" placeholder="请选择">
			    <el-option
			      v-for="item in option"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
	  	</div>
	  	<div class="demo-input-suffix">
			<span>备注：</span>
			  <el-input style="width:500px;"
				  type="textarea"
				  :rows="4"
				  placeholder="请填写备注"
				  v-model="node">
				</el-input>	
	  	</div>
	  	<el-button style="margin:20px 0 40px 45px;" type="primary">新增</el-button>
	</div>
</template>
<script>
	export default {
		data (){
			return {
				proname:'',
				proid:'',
				proprice:'',
				type:'',
				typegroup:[
					{
						value:1,
						label:'办公设备'
					},
					{
						value:2,
						label:'公车'
					},
					{
						value:3,
						label:'LED屏'
					},{
						value:4,
						label:'装饰品'
					},{
						value:5,
						label:'大型机器'
					},{
						value:6,
						label:'暖通设备'
					},{
						value:7,
						label:'电气设备'
					},{
						value:8,
						label:'电梯'
					},{
						value:9,
						label:'机房设备'
					},{
						value:10,
						label:'家居'
					},
					{
						value:11,
						label:'其他'
					}
				],
				state:'',
				option:[
					{
						value:1,
						label:'验收'
					},{
						value:2,
						label:'出库'
					},{
						value:3,
						label:'入库'
					},{
						value:4,
						label:'领用'
					},{
						value:5,
						label:'借用'
					},{
						value:6,
						label:'转移'
					},{
						value:7,
						label:'调拨'
					},{
						value:8,
						label:'变动'
					},{
						value:9,
						label:'维修'
					},{
						value:10,
						label:'报废'
					},
				],
				node:''
			}
		},
		created(){
			_g.closeGlobalLoading()
		}
	}
</script>
<style lang="scss">
	.newguding {
		background: #fff;
		font-size: 14px;
		padding:30px 0 0 50px;
		.el-input {
			width:200px;
		}
		.demo-input-suffix{
			margin-bottom: 15px;
		}
		.demo-input-suffix textarea {
			font-family: 微软雅黑
		}
	}
	
</style>