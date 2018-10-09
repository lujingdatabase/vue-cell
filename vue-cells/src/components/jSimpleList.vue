/*
 * @Author: lujing 
 * @Date: 2018-09-30 09:18:44 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-30 10:51:16
 * @Desc:  简单列表组件
 */
<template>
    <div :style="container">
        <div class="itemstyl"  v-for='(item,index) in dataList'>
            <span v-show='isShowCircle' :style="CircleStyl(index)"></span>
            <span :style="namest" class="namestyl">{{item.name}}</span>
            <div class="unitstyl">
                <span :style="valuest(index)" >{{item.value}}</span>
                <span :style="unitst(index)" >{{item.unit}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default{
   props:{
       width:{type:[String,Number],default:200},
       height:{type:[String,Number],default:200},
       //颜色列表
       colorList:{type:Array,default:()=>{
           return['#0EE286','#01DFF4']
       }},
       //列表数据
       dataList:{type:Array,default:()=>{
           return[{
               name:'总部企业',
               value:40,
               unit:'家'
           },{
               name:'500强设立企业',
               value:332,
               unit:'亿美元'
           },{
               name:'上市公司设立企业',
               value:150,
               unit:'家'
           },{
               name:'外资设立企业',
               value:500,
               unit:'家'
           },{
               name:'持牌金融机构',
               value:320,
               unit:'家'
           },{
               name:'港企',
               value:8212,
               unit:'家'
           }]
       }},
       //是否显示圆点标记
       isShowCircle:{type:Boolean,default:true},
       //圆点半径
       radiusCircle:{type:[String,Number],default:3} ,
        //标题样式
        nameSize:{type:[String,Number],default:16},
        nameColor:{type:String,default:'#fff'},
        nameWeight:{type:String,default:'normal'},
        // 值样式
        valueSize:{type:[String,Number],default:16},
        valueWeight:{type:String,default:'normal'}, 
        // 单位样式
        unitSize:{type:[String,Number],default:14},
        unitWeight:{type:String,default:'normal'}, 

   },
   data(){
       return{
           
       }
   },
   computed:{
       //标题样式    
       namest(){
           return{
               fontSize:`${this.nameSize}px`,
               color:this.nameColor,
               fontWeight:this.nameWeight
           }
       },
     
       container(){
           return {
               width:`${this.width}px`,
               height:`${this.height}px`,
               display:'flex',
               flexDirection: 'column',
               justifyContent: 'space-around'

           }
       },
   },
   methods:{
        //值样式
       valuest(index){
            let tempcolor 
            if(index%2==0){
                tempcolor = this.colorList[0]
            }else{
                tempcolor = this.colorList[1]
            }
            return{
                color:tempcolor,
                fontSize:`${this.valueSize}px`,
                fontWeight:this.valueWeight
            }

       },
      //单位样式
       unitst(index){
            let tempcolor 
            if(index%2==0){
                tempcolor = this.colorList[0]
            }else{
                tempcolor = this.colorList[1]
            }
            return{
                color:tempcolor,
                fontSize:`${this.unitSize}px`,
                fontWeight:this.unitWeight
            }

       },
       //圆点样式    
       CircleStyl(index){
            let tempcolor 
            let tempRadius = this.radiusCircle*2
            if(index%2==0){
                tempcolor = this.colorList[0]
            }else{
                tempcolor = this.colorList[1]
            }
            return{
                background:tempcolor,
                borderRadius:'50%',
                width:`${tempRadius}px`,
                height:`${tempRadius}px`,
                display:'inline-block '

            }
       }
   }
}
</script>
<style>
.itemstyl{
  text-align:left;
  width:100%;
  position:relative;
  display: flex;
  align-items: center;
}
.namestyl{
    color:white;
    margin-left:5px;
}
.valuestyl ,.unitstyl{
   position:absolute;
}
.valuestyl{
  right:18px;
}
.unitstyl{
  right:0;
}
</style>
