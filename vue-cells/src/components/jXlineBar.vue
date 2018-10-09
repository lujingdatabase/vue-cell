/*
 * @Author: lujing 
 * @Date: 2018-09-30 15:01:35 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-30 16:04:49
 * @Desc: 折线条形图组件
 */
 <template>
    <section :id="chartId" :style='container'></section>
</template>
 <script>
import eCharts from "echarts";
import guid from "../utils/guid";
export default {
  props: {
    width: { type: [String, Number], default: 500 },
    height: { type: [String, Number], default: 300 },
    // 标题名称
    titleName: { type: [String, Number], default: "测试标题" },
    titleColor: { type: [String], default: "#fff" },
    titleSize: { type: [Number, String], default: 18 },
    titleWeight: { type: [String], default: "normal" },
    // 柱图图例
    legendBar: {
      type: Array,
      default: () => {
        return ["测试1", "测试2", "测试3"];
      }
    },
    // 折线图图例
    legendLine: {
      type: Array,
      default: () => {
        return ["折线1", "折线2"];
      }
    },
    // x轴坐标的数据
    xAxisList:{type:Array,default:()=>{
        return['2014年','2015年','2016年','2017年','2018年']
    }},
    // 柱图的数据
    yAxisdataList:{
        type:Array,
        default:()=>{
            return[[12,23,32,14,23],[34,23,12,45,56],[34,45,22,33,55]]
        }
    },
    ylinesdataList:{
        type:Array,
        default:()=>{
            return[[23,34,45,56,67],[67,78,89,78,56]]
        }
    },
    barColor:{type:Array,default:()=>{
        return  ["#FFCC00", "#0DD982", "#FF6574"]
    }}, //柱子颜色 必填参数
    lineColor: {type:Array,default:()=>{
        return ["#00EAFF", "#8DFF5B"]
    }}, // 折线颜色
    // 坐标轴颜色
    axisColor:{type:String,default:'#4691E7'},
    // 坐标标签的颜色
    axisLabelColor:{type:String,default:'#9DC3EB'},
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  data() {
    return {
      chartId: guid()
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    //初始化组件
    initCharts() {
      let seriesArr = []
      this.yAxisdataList &&
          this.yAxisdataList.forEach((item, index) => {
            
            seriesArr.push({
              name: this.legendBar && this.legendBar.length > 0 && this.legendBar[index],
              type: "bar",
              barGap: "0.5px",
              data: item,
              barWidth:  12,
              itemStyle: {
                //图形样式
                normal: {
                  barBorderRadius: 4,
                  color: this.barColor[index]
                }
              }
            });
          });

        this.ylinesdataList &&
          this.ylinesdataList.forEach((item, index) => {
            seriesArr.push({
              name: this.legendLine && this.legendLine.length > 0 && this.legendLine[index],
              type: "line",
              data: item,
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: this.lineColor[index],
                  lineStyle: {
                    width: 1,
                    type: "solid"
                  }
                }
              },
              label: {
                normal: {
                  show: false, //折线上方label控制显示隐藏
                  position: "top"
                }
              },
              symbol: "circle",
              symbolSize: 8
            });
          });

      let option = {
        title: {
          show: true,
          text: this.titleName,
          textStyle: {
            color: this.titleColor,
            fontSize: this.titleSize,
            fontWeight: this.titleWeight
          }
        },
        legend: [{
            left: 90,
            top: 5,
            itemGap: 16,
            itemWidth: 15,
            itemHeight: 8,
            data: this.legendBar,
            textStyle: {
              color: "#fff",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12
            }
          },
          {
            left: 90,
            top: 32,
            itemGap: 16,
            itemWidth: 15,
            itemHeight: 8,
            data: this.legendLine,
            textStyle: {
              color: "#fff",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12
            }
          }
        ],
        grid: {
          x: 30,
          y: 60,
          x2: 30,
          y2: 40
        },
        xAxis: {
          type: "category",
          data: this.xAxisList,
          axisTick: {
            show: false
          },

          axisLine: {
            show: true,
            lineStyle:{
                color:this.axisColor
            }
          },
          axisLabel: {
            show: true,
            interval: "0",
            textStyle: {
              lineHeight: 16,
              padding: [2, 2, 0, 2],
              height: 50,
              fontSize: 12,
              color:this.axisLabelColor
            }
          }
        },
        yAxis: [
          {
            axisLine: {
              show: true,
              lineStyle:{
                color:this.axisColor
            }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              show: true,
              textStyle:{
                  color:this.axisLabelColor
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#F1F3F5",
                type: "solid"
              },
              interval: 2
            },
            splitNumber: 4
          },
          {
            axisLine: {
              show: true,
              lineStyle:{
                color:this.axisColor
            }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              show: true,
              textStyle:{
                  color:this.axisLabelColor
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#F1F3F5",
                type: "solid"
              },
              interval: 2
            },
            splitNumber: 4
          }
        ],
        series: seriesArr
      };
      if (document.getElementById(this.chartId)) {
        let chart = eCharts.init(document.getElementById(this.chartId));
        chart.setOption(option);
      }
    }
  }
};
</script>
<style>
</style>
