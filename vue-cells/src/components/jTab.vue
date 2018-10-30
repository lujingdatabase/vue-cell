<template>
	<div class="entry-wrapper" :style="objStyle">
		<div class="heade">
			<span  v-for="(item,index) of headData" :key="index">{{item}}</span>
		</div>
		<ul>
			<li v-for="(item,index) of bodyData" :key='index'>
				<span v-for="(items,index) of item" :key='index'>{{items}} </span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:{
			width:{type:Number|String,default:390},
			height:{type:Number|String,default:300},
			headData:{
				type:[Array,Object],
				default:()=>{
					return ['项目名称','类别','主题项','巡检日期']
				}
			},
			bodyData:{
				type:[Array,Object],
				default:()=>{
					return [
						['燃气热电联产','易燃易爆','现场执行','2018-11-23'],
						['高端药物产业','易污染','现场执行','2018-11-03'],
						['污水处理工程','质量控制','现场执行','2018-12-01'],
						['快线PPP工程','地理环境恶劣','现场执行','2018-12-21'],
						['光伏发电项目','技术壁垒','现场执行','2018-11-08'],
						['自来水厂工程','质量控制','现场执行','2018-12-12'],
						['润科华府','地理环境恶劣','现场执行','2018-12-10'],
						['涉铁工程项目','地理环境恶劣','现场执行','2018-11-19'],
					]
				}
			}
		},
		methods:{
			objStyle(){
				return {
					width:`${this.width}px`,
					height:`${this.height}px`,
				}
			}
		}
	}
</script>
<style scoped lang="less">
	.entry-wrapper{
		width:100%;
		box-sizing:border-box;
		.heade{
			color:#fff;
			font-size:14px;
			display:flex;
			height:30px;
			line-height:30px;
			border-bottom:1px solid #0054a3;
			span{
				flex:1;
                text-align:center;
			}
		}
		ul{
			li{
				color:#fff;
				font-size:14px;
                display:flex;
                width:100%;
				height:25px;
				line-height:25px;
				cursor:pointer;
				span{
					flex:1;
                    text-align:center;
				}
			}
			li:nth-child(2n){
				background:rgba(0, 92, 217,.3);
			}
			li:hover{
				background:rgba(0, 92, 217,.3);
			}
		}
	}
</style>