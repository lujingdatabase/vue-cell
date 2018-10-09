/*
 * @Author: lujing 
 * @Date: 2018-09-25 13:56:52 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-26 09:35:44
 * @Desc:  饼图定制
 */
 <template>
    <div :style="container">
        <section :id="chartId" :style="piestyl"></section>
        <p :style='titlestyl'>
            {{titleName}}
        </p>
        <p>
            <span :style="titleValueStyl">{{titleValue}}</span>
            <span :style="titleUnitStyl">{{titleUnit}}</span>
        </p>
    </div>
</template>
 <script>
import eCharts from "echarts";
import guid from "../utils/guid";
export default {
  props: {
    width: { type: [String, Number], default: 100 },
    height: { type: [String, Number], default: 200 },
    titleSize: { type: [String, Number], default: 15 },
    titleName: { type: [String, Number], default: "港企增加值" },
    titleValue: { type: [String, Number], default: 112.7 },
    titlevalueSize: { type: [String, Number], default: 20 },
    titleColor: { type: [String, Number], default: "#fff" },
    titleUnit: { type: [String, Number], default: "亿元" },
    titleUnitSize: { type: [String, Number], default: 12 },
    colorOfMain: { type: [String, Number], default: "#0EE286" }, //饼图的颜色
    colorOfBack: { type: [String, Number], default: "#0EE28644" }, //饼图中的细条的颜色
    shadowColor: { type: [String, Number], default: "#ffffff55" }, //发光颜色
    dataOfCurr:{type:[String,Number],default:23},//当前所占的比重
  },
  data() {
    return {
      chartId: guid()
    };
  },
  computed: {
    piestyl() {
      return {
        width: `${this.width}px`,
        height: `${this.width}px`
      };
    },
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        border: "1px solid red"
      };
    },
    titlestyl() {
      return {
        fontSize: `${this.titleSize}px`,
        color: `${this.titleColor}`
      };
    },
    titleValueStyl() {
      return {
        color: `${this.colorOfMain}`,
        fontSize: `${this.titlevalueSize}px`,
        fontWeight: "bold"
      };
    },
    titleUnitStyl() {
      return {
        color: `${this.colorOfMain}`,
        fontSize: `${this.titleUnitSize}px`
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.InitChart();
    });
  },
  methods: {
    InitChart() {
      // 颜色配置
      /*---------------------蓝色----------------------------*/
      //   let outerColor = "#31D6FF"; //外边粗线
      //   let middleColor = "#31D6FF"; //中间的粗线
      //   let middleColor1 = "#31D6FF44"; //中间的细线
      //   let shadowColor = "rgba(255,255,255,0.4)"; //发光颜色
      //   let percentColor = "#31D6FF"; //百分比颜色

      /*---------------------绿色----------------------------*/
      //  let middleColor1 = '#0EE286';//外边粗心啊
      //  let outColor ="#0EE286";//中间粗线
      //  let outColor1 = '#0EE28655'//中间细线
      //  let shadowColor = 'rgba(0,255,180,0.53)';//发光颜色
      //  let percentColor = '#0EE286';//百分比颜色

      /*---------------------黄色----------------------------*/
      //  let middleColor1 = '#FF8A00';//外边粗线
      //  let outColor ="#FF8A00";//中间粗线
      //  let outColor1 = '#FF8A0055'//中间细线
      //  let shadowColor = 'rgba(235,185,42,0.53)';//发光颜色
      //  let percentColor = '#FF8A00';//百分比颜色

      /*---------------------缩放---------------------*/
      let innerItemStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          shadowBlur: 10
        }
      };

      let option = {
        tooltip: {
          show: false,
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          //外环
          {
            name: "Line 1",
            type: "pie",
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["50%", "50%"],
            radius: [this.width / 2 - 3, this.width / 2 - 3],
            itemStyle: innerItemStyle,
            data: [
              {
                value: 3,
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    borderColor: this.colorOfMain,
                    shadowColor: this.shadowColor,
                    shadowBlur: 15
                  }
                }
              },
              {
                value: 1,
                itemStyle: {
                  normal: {
                    borderWidth: 0,
                    // borderColor: middleColor,
                    shadowColor: this.shadowColor,
                    shadowBlur: 15
                  }
                }
              }
            ]
          },
          //中间圆环
          {
            name: "Line 2",
            type: "pie",
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["50%", "50%"],
            radius: [this.width / 2 - 7, this.width / 2 - 7],
            itemStyle: innerItemStyle,
            data: [
              {
                value: this.dataOfCurr,
                itemStyle: {
                  normal: {
                    borderWidth: 10,
                    borderColor: this.colorOfMain,
                    shadowColor: this.shadowColor,
                    shadowBlur: 10
                  }
                },
                label: {
                  normal: {
                    formatter: "{d} %",
                    position: "center",
                    padding: [0, 0, 10, 0],
                    align: "left",
                    show: true,
                    textStyle: {
                      fontSize: 15,
                      fontWeight: "bold",
                      color: this.colorOfMain
                    }
                  }
                }
              },
              {
                value: 100-this.dataOfCurr,
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: this.colorOfBack,
                    shadowColor: this.shadowColor,
                    shadowBlur: 10
                  }
                }
              }
            ]
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
 
