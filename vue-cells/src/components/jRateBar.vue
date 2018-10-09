/*
 * @Author: lujing 
 * @Date: 2018-09-26 12:01:28 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-10-08 17:36:27
 * @Desc:  进度条组件
 */
 <template>
    <div :style="container" >
        <div style="height:60%;display:flex;justify-content: space-between">
            <span :style="titlestyl">{{dataObj.titlename}}</span>
            <div :style='valueStyl'>
                <span>{{dataObj.titlevalue}}</span>
                <span>{{dataObj.titleunit}}</span>
            </div>
        </div>
        <section :id="chartId" :style="rateBarStyl"></section>
    </div>
</template>
 <script>
import eCharts from "echarts";
import guid from "../utils/guid";
export default {
  props: {
    width: { type: [Number, String], default: 500 },
    height: { type: [Number, String], default: 80 },
    titleColor:{type:[String],default:'white'},
    titleSize:{type:[String,Number],default:25},
    titleWeight:{type:String,default:'blod'},
    valueSize:{type:[String,Number],default:25},
    valueWeight:{type:[String],default:'blod'},
    colorOfBar:{type:[String],default:'#00E4FF'},
    dataObj: {
      type: Object,
      default: () => {
        return {
          titlename: "基金产品数量",
          titlevalue: 65,
          titleunit: "个",
          rate: 21
        };
      }
    }
  },
  data() {
    return {
      chartId: guid()
    };
  },
  computed: {
      valueStyl(){
          return{
              fontSize:`${this.valueSize}px`,
              fontWeight:this.valueWeight,
              color:this.colorOfBar
              
          }
      },
    titlestyl(){
       return {
           color:this.titleColor,
           fontSize:`${this.titleSize}px`,
           fontWeight:this.titleWeight
       }
    },
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    rateBarStyl(){
        return {
            // border:'1px solid red',
            width:`${this.width}px`,
            height:'40%'
        }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    initCharts() {
      let data = [this.dataObj.rate];
      let titlename = ["太原市民政局"];
      let valdata = [100];
      let option = {
          grid:{
              left:2,
              right:2

          },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: false,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            // axisLabel: {
            //   color: "#fff",
            //   formatter: function(value, index) {
            //     return [
            //       "{lg|" + (index + 1) + "}" + "{title|" + value + "} "
            //     ].join("\n");
            //   },
            //   rich: {
            //     lg: {
            //       backgroundColor: "#339911",
            //       color: "#fff",
            //       borderRadius: 15,
            //       // padding: 5,
            //       align: "center",
            //       width: 15,
            //       height: 15
            //     }
            //   }
            // }
          }
          ,
          {
            show: false,
            inverse: true,
            data: valdata,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: data,
            barWidth: 15,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: this.colorOfBar
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                fontSize: 20,
                formatter: "{c}%"
              }
            },
            z: 7
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100],
            barWidth: 25,
            itemStyle: {
              normal: {
                color: "#006CFF11",
                borderColor: "#006CFF",
                borderWidth: 3,
                barBorderRadius: 15
              }
            },
            z: 5
          }
        ]
      };
       //  挂载饼图
      if (document.getElementById(this.chartId)) {
        this.chart = eCharts.init(document.getElementById(this.chartId));
        this.chart.setOption(option, true);
      }
    }
  },
  watch:{
    dataObj(val,oldval){
         this.initCharts();
    }
  }
};
</script>
 <style>
</style>
 
 
