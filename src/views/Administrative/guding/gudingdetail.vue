<template>
	<div class="gudingdetail">
		<div class="guding-search">
			<div class="input-group">
				<span>品名</span>
				<el-input v-model="proname" placeholder="请输入品名"></el-input>
			</div>
			<div class="input-group">
				<span>条码</span>
				<el-input v-model="proid" placeholder="请输入条码"></el-input>
			</div>
			<div class="input-group">
				<span>分类</span>
				<el-select v-model="type" placeholder="请选择分类">
			    <el-option
			      v-for="item in typegroup"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
			<div class="input-group">
				<span>周期</span>
				<el-select v-model="state" placeholder="请选择">
			    <el-option
			      v-for="item in option"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
			<div class="input-group">
				<el-button style="height:30px;" type="primary">搜索</el-button>
			</div>
		</div>
		<div class="guding-list">
			<el-table border
		      :data="prolist"
		      style="width: 100%">
		      <el-table-column
		        type="selection"
		        width="35">
		      </el-table-column>
		      <el-table-column
		        prop="proname"
		        label="品名"
		        width="120">
		      </el-table-column>
		      <el-table-column
		        prop="proid"
		        label="条码">
		      </el-table-column>
		      <el-table-column
		        prop="proprice"
		        label="价格">
		      </el-table-column>
		      <el-table-column
		        prop="type"
		        label="分类">
		      </el-table-column>
		      <el-table-column
		        prop="state"
		        label="周期">
		      </el-table-column>
		      <el-table-column
		        prop="node"
		        label="备注">
		      </el-table-column>
		      <el-table-column
		        label="操作" width="100">
		        <template slot-scope="scope">
		        <i class="el-icon-edit" style="padding-right:5px;cursor:pointer"></i>
		        <i class="el-icon-delete" style="padding-left:5px;cursor:pointer"></i>
		      </template>
		      </el-table-column>
		    </el-table>
		    <el-pagination
		     
		      :current-page="currentPage4"
		      :page-sizes="[100, 200, 300, 400]"
		      :page-size="100"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="400">
		    </el-pagination>
		</div>
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
				prolist:[
				{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				},{
					proname:'sf',
					proid:121313,
					proprice:121.00,
					type:'办公',
					state:'调拨',
					node:'sssss'
				}
				]
			}
		},
		created(){
			_g.closeGlobalLoading()
		}
	}
</script>
<style lang="scss">
	.gudingdetail {
		background: #fff;
		font-size: 14px;
		padding:20px 20px 50px 20px;
		.el-input {
			width:160px;
			input{
				height:30px;
			}
			
		}
		.demo-input-suffix{
			margin-bottom: 15px;
		}
		.demo-input-suffix textarea {
			font-family: 微软雅黑
		}
	}
	.guding-search{
		display:flex;
		justify-content:space-between;
		font-size:12px;
		.input-group {
			
		}
	}
	.guding-list{
		margin-top:20px;
	}
	.el-table {
		font-size:12px;
		text-align:center;
		
	}
	.el-table th{
		background:#f1f1f1;
	
		text-align:center;
		
	}
	.el-table td, .el-table th {
		padding:5px 0 3px;
	}
	.el-pagination{
		float: right;
	    height: 30px;
	    margin-top: 10px;
	}
</style>