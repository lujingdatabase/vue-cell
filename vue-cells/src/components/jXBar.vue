/*
 * @Author: lujing 
 * @Date: 2018-09-25 16:30:10 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-26 10:06:55
 * @Desc:  条形图组件
 */
 <template>
    <section :id="chartId" :style="container"></section>
</template>
 <script>
import eCharts from "echarts";
import guid from "../utils/guid";
export default {
  props: {
    width: { type: Number, default: 400 },
    height: { type: Number, default: 400 },
    barWidth:{type:Number,default:12},//条形图的宽度
    dataList:{type:Object,default:()=>{
        return {'2011':300, 2012:430, 2013:560, 2014:700, 2015:890, 2016:1200}
    }},//条形图数据集合
  },
  data() {
    return {
        chartId:guid(),
        yDataList:[],//图表数据
        xDataList:[],//横坐标数据
    };
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    // 初始化图表
    initChart() {
        this.xDataList = Object.keys(this.dataList)
        this.yDataList = Object.values(this.dataList)
        console.log('this.xDataList--',this.xDataList)
        console.log('this.yDataList--',this.yDataList )
    //   let xData = (function() {
    //     let data = [];
    //     for (let i = 2011; i < 2017; i++) {
    //       data.push(i);
    //     }
    //     return data;
    //   })();

    //   let data = [13.7, 13.4, 13.5, 16.1, 17.4, 15.2];

      let option = {
        // backgroundColor: "#141f56",

        tooltip: {
          show: "true",
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.7)", // 背景
          padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);", //添加阴影
          formatter: function(params) {
            if (params.seriesName != "") {
              return params.name + " ：  " + params.value;
            }
          }
        },
        grid: {
          // borderWidth: 10,
          top: 110,
          bottom: 95,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: true,
              inside:true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#4FA1FF"
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#17C9FC",
                fontWeight: "normal",
                fontSize: "12"
              },
              formatter: function(val) {
                return val + "年";
              }
            },
            data: this.xDataList
          }
        ],
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#4FA1FF"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#4FA1FF"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#17C9FC",
              fontWeight: "normal",
              fontSize: "12"
            }
          }
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                show: true,
                color: new eCharts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#1CFAFE"
                  },
                  {
                    offset: 1,
                    color: "#1072F8"
                  }
                ]),
                barBorderRadius: 60,
                borderWidth: 0
              },
              emphasis: {
                shadowBlur: 15,
                shadowColor: "rgba(105,123, 214, 0.7)"
              }
            },
            zlevel: 2,
            // barWidth: "10%",
            barWidth: this.barWidth,
            data: this.yDataList
          }
        ]
      };
       //  挂载饼图
      if (document.getElementById(this.chartId)) {
        this.chart = eCharts.init(document.getElementById(this.chartId));
        this.chart.setOption(option, true);
      }
    }
  }
};
</script>
 <style>
</style>
 
