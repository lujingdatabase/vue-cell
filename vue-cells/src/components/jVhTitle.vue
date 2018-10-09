/*
 * @Author: lujing 
 * @Date: 2018-09-28 10:48:56 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-28 11:27:35
 * @Desc:  水平或垂直样式标题
 */
 <template>
     <div :style="container">
        <div :style="itemstyl" v-for='(item,index) in dataList'>
            <div :style="titleStyl">{{item.title}}</div>
            <span :style="valuestyle(index)">{{item.value}}</span><span :style='unitstyle(index)'>{{item.unit}}</span>
        </div>
     </div>
 </template>
 <script>
 export default{
     props:{
         dataList:{type:Array,default:()=>{
             return[{
                 title:'今日办件量',
                 value:125,
                 unit:'件'
             },{
                 title:'本月办件量',
                 value:3746,
                 unit:'件'
             },{
                 title:'今年办件量',
                 value:47868,
                 unit:'件'
             }]
         }},
        //  纵向(vert)或横向(hori)显示
         showType:{type:String,default:'hori'},
         width:{type:Number},
         height:{type:Number},
         horiGap:{type:Number,default:10},
         vertGap:{type:Number,default:10},
        //标题样式
        titleSize:{type:Number,default:18},
        titleColor:{type:String,default:'#fff'},
        titleWeight:{type:String,default:'normal'},
        titlefamily:{type:String},
        // 数值样式
        valueSize:{type:Number,default:18},
        valueWeight:{type:String,default:'normal'},
        valuefamily:{type:String},
        // 单位样式
        unitSize:{type:Number,default:14},
        unitWeight:{type:String,default:'normal'},
        unitfamily:{type:String},
        // 颜色集
        colorList:{type:Array,default:()=>{
            return[
                '#31D5FE','#0EE286','#FF8A00'
            ]
        }}

     },
     data(){
         return{
 
         }
     },
     computed:{
        //  标题样式
         titleStyl(){
             return{
                 fontSize:`${this.titleSize}px`,
                 color:this.titleColor,
                 fontWeight:this.titleWeight,
                 fontFamily:this.titlefamily
             }
         },
        //  条目样式
         itemstyl(){
              return{
                  textAlign:'left',
                  margin:`${this.horiGap}px ${this.vertGap}px`
              }
         },
           
         container(){
             let dire=''
             let tempWidth=0
             let tempHeight=0
            // 垂直
             if(this.showType=='vert'){
                dire = 'column'
                if(typeof this.width =='undefined'){
                    tempWidth = 100
                }else{
                    tempWidth = this.width
                }
                
            // 水平
             }else{
                dire = 'row'
                if(typeof this.width =='undefined'){
                    tempWidth = 300
                }else{
                    tempWidth = this.width

                }
             }
             return{
                 display:'flex',
                 flexDirection:dire,
                 width:`${tempWidth}px`,
                 border:'1px solid red'
                //  height:`${this.height}px`
             }
         }
     },
     methods:{
         // 值样式
         valuestyle(index){
              return{
                fontSize:`${this.valueSize}px`,
                fontWeight:this.valueWeight,
                fontFamily:this.valuefamily,
                color:this.colorList[index]
            }    
        },
        //  单位样式
        unitstyle(index){
            
            return{
                fontSize:`${this.unitSize}px`,
                fontWeight:this.unitWeight,
                fontFamily:this.unitfamily,
                color:this.colorList[index]
            }     
        }
     }
 }
     
 </script>
<style>

</style>
