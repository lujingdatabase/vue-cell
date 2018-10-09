/*
 * @Author: lujing 
 * @Date: 2018-09-30 11:29:41 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-30 14:25:33
 * @Desc:  水平堆叠图
 */
<template>
    <section :id="chartId" :style="container"></section>
</template>
<script>
import eCharts from "echarts";
import guid from "../utils/guid";
export default {
  props: {
    //图例换行点
    legendEnter:{type:[Number,String],default:3},
    width: {
      type: [Number, String],
      default: 450
    }, // 宽度
    height: {
      type: [Number, String],
      default: 220
    }, // 高度
    barRadius: {
      type: [Number],
      default: 0
    },
    barWidth: {
      type: [Number, String],
      default: 15
    }, // 柱状宽度
    barBack: {
      type: String,
      default: "rgba(0,0,0,0.2)"
    }, // 柱子背景色
    font: {
      // 字体
      type: String,
      default: "AgencyFBBold"
    },
    gridTop: {
      type: [Number, String],
      default: 40
    }, // 上边距
    gridBottom: {
      type: [Number, String],
      default: 0
    }, // 下边距
    gridLeft: {
      type: [Number, String],
      default: 0
    }, // 左边距
    gridRight: {
      type: [Number, String],
      default: 30
    }, // 右边距
    labelShow: {
      type: String | Boolean,
      default: false
    }, // 是否显示值标签
    labelPosit: {
      type: [Number, String],
      default: "top"
    }, // 值标签位置
    labelColor: {
      type: String,
      default: "#fff"
    }, // 值标签颜色
    labelSize: {
      type: [Number, String],
      default: 16
    }, // 值标签大小
    // 是否显示 x 轴、旋转角度、文字颜色、文字字号、文字粗细、刻度长度、坐标轴是否显示、坐标轴颜色
    xShow: {
      type: String | Boolean,
      default: true
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    xColor: {
      type: String,
      default: "#ACD5FF"
    },
    xFontWeight: {
      type: String,
      default: "normal"
    },
    xFontSize: {
      type: [Number, String],
      default: 12
    },
    xName: {
      type: String,
      default: ""
    },
    xMin: {
      type: [Number, String]
    },
    xMax: {
      type: [Number, String]
    },
    xSplitNumber: {
      type: [Number, String],
      default: 5
    },
    yShow: {
      type: String | Boolean,
      default: true
    },
    yColor: {
      type: String,
      default: "#ACD5FF"
    },
    yFontWeight: {
      type: String,
      default: "normal"
    },
    yFontSize: {
      type: [Number, String],
      default: 12
    },

    // 图例
    legendShow: {
      type: String | Boolean,
      default: true
    },
    legendColor: {
      type: String,
      default: "#fff"
    },
    legPosition: {
      type: String,
      default: "顶部居中"
    },
    orient: {
      type: String,
      default: "horizontal"
    },
    legendSize: {
      type: [Number, String],
      default: 12
    },
    legendGap: {
      type: [Number, String],
      default: 10
    },

    lineShow: {
      type: String | Boolean,
      default: true
    }, // 轴线是否显示
    tickShow: {
      type: String | Boolean,
      default: true
    }, // 刻度是否显示
    tickLength: {
      type: [Number, String],
      default: 5
    }, // 刻度的长度
    tickColor: {
      type: String,
      default: "#4FA1FF"
    }, // 刻度的颜色,坐标轴的颜色
    // 刻度是否朝内
    isInside: { type: Boolean, default: true },
    barSeries: {
      // 系列数据
      type: Array,
      default: () => {
        return [
          {
            name: "金融业",
            color: "#FFCC00"
          },
          {
            name: "现代物流业",
            color: "#FF8A00"
          },
          {
            name: "信息服务业",
            color: "#01E9FE"
          },
          {
            name: "科技服务业",
            color: "#0EE286"
          },
          {
            name: "其他服务业",
            color: "#0084FF"
          }
        ];
      }
    },
    dataType: {
      type: String,
      default: "Static"
    },
    apiUrl: {
      type: String
    },
    staticData: {
      type: Array,
      default: () => {
        return [
          {
            x: "未评级",
            y: "375",
            s: "1"
          },
          {
            x: "未评级",
            y: "180",
            s: "2"
          },
          {
            x: "未评级",
            y: "100",
            s: "3"
          },
          {
            x: "未评级",
            y: "100",
            s: "4"
          },
          {
            x: "未评级",
            y: "100",
            s: "5"
          },
          {
            x: "D级",
            y: "375",
            s: "1"
          },
          {
            x: "D级",
            y: "180",
            s: "2"
          },
          {
            x: "D级",
            y: "100",
            s: "3"
          },
          {
            x: "D级",
            y: "100",
            s: "4"
          },
          {
            x: "D级",
            y: "100",
            s: "5"
          },
          {
            x: "C级",
            y: "375",
            s: "1"
          },
          {
            x: "C级",
            y: "180",
            s: "2"
          },
          {
            x: "C级",
            y: "100",
            s: "3"
          },
          {
            x: "C级",
            y: "100",
            s: "4"
          },
          {
            x: "C级",
            y: "100",
            s: "5"
          },
          {
            x: "B级",
            y: "375",
            s: "1"
          },
          {
            x: "B级",
            y: "180",
            s: "2"
          },
          {
            x: "B级",
            y: "100",
            s: "3"
          },
          {
            x: "B级",
            y: "100",
            s: "4"
          },
          {
            x: "B级",
            y: "100",
            s: "5"
          },
          {
            x: "A级",
            y: "375",
            s: "1"
          },
          {
            x: "A级",
            y: "180",
            s: "2"
          },
          {
            x: "A级",
            y: "100",
            s: "3"
          },
          {
            x: "A级",
            y: "100",
            s: "4"
          },
          {
            x: "A级",
            y: "100",
            s: "5"
          }
        ];
      }
    },
    x: {
      type: String,
      default: "x"
    },
    y: {
      type: String,
      default: "y"
    },
    s: {
      type: String,
      default: "s"
    },
    activeAttr: {
      type: Object,
      default: () => {
        return {};
      }
    } //接收点击的数据
  },
  data() {
    return {
      chartId: guid(),
      comName: "水平堆叠柱图",
      colorNum: 1,
      dataArray: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.InitChart();
      });
    });
  },
  watch: {},
  computed: {
    container() {
      return {
        width: `${this.width.toString().replace("px", "")}px`,
        height: `${this.height.toString().replace("px", "")}px`
      };
    }
  },
  methods: {
    InitChart() {
      if (this.barSeries.length === 0) return;
      let dataJson = this.staticData;
      //   await getApiSource(
      //     this.dataType,
      //     this.apiUrl,
      //     this.staticData
      //   );
      // 获取组件的数据属性名
      let dataJsonKeys = Object.keys(dataJson[0]);
      //   if (this.$store.state.currentComponent[0]) {
      //     let current = this.$store.state.currentComponent[0];
      //     current.attributes.paramsKeys = dataJsonKeys;
      //     this.$store.commit("setCurrentCom", {
      //       currentComponent: [current]
      //     });
      //   }

      let seriesName = [];
      let xName = [];
      dataJson.forEach(i => {
        // 系列名称
        if (!seriesName.includes(i[this.s])) seriesName.push(i[this.s]);
        // y轴名称
        if (!xName.includes(i[this.x])) xName.push(i[this.x]);
      });
      let yList = [];
      let MaxArray = [];
      seriesName.forEach(i => {
        let yData = dataJson.filter(j => {
          return j[this.s] === i;
        });
        let ySeries = [];
        xName.forEach(x => {
          const index = yData.findIndex(y => y[this.x] === x);
          if (index < 0) {
            ySeries.push(0);
          } else {
            ySeries.push(
              typeof eval(yData[index][this.y]) === "number"
                ? yData[index][this.y]
                : 0
            );
          }
        });
        ySeries.forEach((i, index) => {
          if (MaxArray[index] === undefined) MaxArray[index] = 0;
          MaxArray[index] += eval(i);
        });
        yList.push(ySeries);
      });
      //   console.log('yList---',JSON.stringify(yList))
      let maxBar = 0;
      MaxArray.forEach(i => {
        if (i > maxBar) maxBar = i;
      });

      let maxBarArr = [...xName];
      maxBarArr.fill(maxBar);
      // 坐标轴刻度设置
      let axisTick = {
        show: this.tickShow,
        length: this.tickLength,
        lineStyle: {
          color: this.tickColor
        },
        inside: this.isInside
      };
      let axisLine = {
        show: this.lineShow,
        lineStyle: {
          color: this.tickColor
        }
      };
      let label = {
        show: this.labelShow,
        position: this.labelPosit,
        color: this.labelColor,
        fontFamily: this.font,
        fontSize: this.labelSize
      };
      let seriesData = [
        {
          type: "bar",
          itemStyle: {
            normal: {
              color: this.barBack
            }
          },
          barGap: "-100%",
          barWidth: this.barWidth,
          tooltip: {
            show: false
          },
          data: maxBarArr,
          animation: false
        }
      ];
      let legName = this.barSeries.map(item => item.name);
      //将图例切换为两个数组（legendEnter）
      let legName1 =[]
      let legName2 = []
      if(this.legendEnter>0&&this.legendEnter<legName.length){
         legName.forEach((item,index,arr)=>{
              if(index<this.legendEnter){
                  legName1.push(item)
              }else{
                  legName2.push(item)
              }
         })
      }
      yList.forEach((i, index) => {
        let series = {
          name: legName[index],
          type: "bar",
          stack: "总量",
          zlevel: legName.length - index - 1,
          barWidth: this.barWidth,
          label: label,
          data: i,
          itemStyle: {
            barBorderRadius: this.barRadius,
            
          }
        };
        seriesData.push(series);
      });
      let _len = seriesData.length;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: this.initColorList(),
        legend: [{
          show: this.legendShow,
          textStyle: {
            color: this.legendColor,
            fontSize: `${this.legendSize}px`
          },
          itemGap: this.legendGap,
          itemWidth: 15,
          itemHeight:8,
          orient: this.orient,
          data: legName1
        },{
          show: this.legendShow,
          textStyle: {
            color: this.legendColor,
            fontSize: `${this.legendSize}px`
          },
          itemGap: this.legendGap,
          itemWidth: 15,
          itemHeight:8,
          orient: this.orient,
          top:20,
          data: legName2
        }],
        grid: {
          left: this.gridLeft,
          right: this.gridRight,
          bottom: this.gridBottom,
          top: this.gridTop,
          containLabel: true
        },
        xAxis: {
          show: this.xShow,
          type: "value",
          name: this.xName,
          nameTextStyle: {
            color: this.xColor
          },
          splitNumber: this.xSplitNumber,
          min: this.xMin,
          max: this.xMax,
          splitLine: {
            show: false
          },
          axisLabel: {
            show: this.xShow,
            color: this.xColor,
            fontWeight: this.xFontWeight,
            fontSize: this.xFontSize
          },
          axisTick,
          axisLine
        },
        yAxis: {
          show: this.yShow,
          type: "category",
          data: xName,
          axisLabel: {
            show: this.yShow,
            color: this.yColor,
            fontWeight: this.yFontWeight,
            fontSize: this.yFontSize,
            rotate: this.rotate
          },
          axisTick,
          axisLine
        },
        series: seriesData
      };
      // 设置默认选中值
      this.dataArray = Object.assign(
        {
          x: xName[0],
          y: seriesData[0].data[0],
          s: seriesData[0].name
        },
        dataJson[0]
      );
      if (document.getElementById(this.chartId)) {
        let chart = eCharts.init(document.getElementById(this.chartId));
        chart.setOption(option);
      }
    },
    initColorList() {
      let colorList = [];
      this.barSeries.forEach(bar => {
        const i = bar.color;
        if (typeof i === "object") {
          const q = Math.floor(i[2] / 90);
          let val = ((i[2] % 90) / 90).toFixed(3);
          if (val === "0.000") val = 1;
          let xy = {};
          switch (q) {
            case 0:
              xy = {
                x: 0,
                y: 0,
                x2: val,
                y2: 0
              };
              break;
            case 1:
              xy = {
                x: 0,
                y: 0,
                x2: 0,
                y2: val
              };
              break;
            case 2:
              xy = {
                x: val,
                y: 0,
                x2: 0,
                y2: 0
              };
              break;
            case 3:
              xy = {
                x: 0,
                y: val,
                x2: 0,
                y2: 0
              };
              break;
          }
          colorList.push({
            type: "linear",
            ...xy,
            colorStops: [
              {
                offset: 0,
                color: i[0] // 0% 处的颜色
              },
              {
                offset: 1,
                color: i[1] // 100% 处的颜色
              }
            ],
            globalCoord: false
          });
        } else {
          colorList.push(i);
        }
      });
      return colorList;
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>