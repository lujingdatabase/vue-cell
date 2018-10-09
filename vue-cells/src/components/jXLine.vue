/*
 * @Author: lujing 
 * @Date: 2018-09-27 15:59:25 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-28 14:51:15
 * @Desc:  特色条形图（这里最多支持三个系列，而且可以单轴和双轴切换；默认z系列数据对应第二个纵轴）
 */
 <template>
    <section :id="chartId" :style='container'></section>
</template>
 <script>
import eCharts from "echarts";
import guid from "../utils/guid";
export default {
  props: {
    width: { type: Number, default: 500 },
    height: { type: Number, default: 300 },
    // 单轴三系列数据
    staticData: {
      type: Array,
      default: () => {
        return [
          {
            x: "2014年",
            y: 100,
            z: 22,
            a: 44
          },
          {
            x: "2015年",
            y: 200,
            z: 59,
            a: 45
          },
          {
            x: "2016年",
            y: 25,
            z: 51,
            a: 56
          },
          {
            x: "2017年",
            y: 0,
            z: 18,
            a: 19
          },
          {
            x: "2018年",
            y: 70,
            z: 100,
            a: 90
          }
        ];
      }
    },
    // 双系列双轴数据
    // staticData: {
    //   type: Array,
    //   default: () => {
    //     return [
    //       {
    //         x: "2014年",
    //         y: 100,
    //         z: 22,
    //       },
    //       {
    //         x: "2015年",
    //         y: 200,
    //         z: 59,
    //       },
    //       {
    //         x: "2016年",
    //         y: 25,
    //         z: 51,
    //       },
    //       {
    //         x: "2017年",
    //         y: 0,
    //         z: 18,
    //       },
    //       {
    //         x: "2018年",
    //         y: 70,
    //         z: 100,
    //       }
    //     ];
    //   }
    // },

    isshowsplitline: { type: [Boolean], default: true },
    splitlinecolor: { type: String, default: "#11386D" },
    font: { type: String, default: "AgencyFBBold" }, // 字体
    gridTop: { type: [Number, String], default: 30 }, // 上边距
    gridBottom: { type: [Number, String], default: 45 }, // 下边距
    gridLeft: { type: [Number, String], default: 40 }, // 左边距
    gridRight: { type: [Number, String], default: 40 }, // 右边距

    // 图例
    legendColor: { type: String, default: "#fff" },
    legendSize: { type: [Number, String], default: 12 },

    legendShow: { type: String | Boolean, default: true },
    legPosition: { type: String, default: "顶部居中" },
    orient: { type: String, default: "horizontal" },
    legendGap: { type: [Number, String], default: 10 },

    // 是否显示 x 轴、旋转角度、文字颜色、文字字号、文字粗细、刻度长度、坐标轴是否显示、坐标轴颜色
    xShow: { type: String | Boolean, default: true },
    rotate: { type: [Number, String], default: 0 },
    // x轴的标签颜色
    xColor: { type: String, default: "#9DC4ED" },
    xFontWeight: { type: String, default: "normal" },
    xmargin: { type: Number, default: 8 },
    xFontSize: { type: [Number, String], default: 12 },
    xfontFamily: { type: [String] },
    xSplitNumber: { type: Number, default: 5 },

    boundaryGap: { type: String | Boolean, default: false }, // 留白
    xName: { type: String, default: "" }, // 单位

    yShow: { type: String | Boolean, default: true },
    yColor: { type: String, default: "#9DC4ED" },
    yFontWeight: { type: String, default: "normal" },
    yFontSize: { type: [Number, String], default: 12 },
    yfontFamily: { type: [String] },
    ymargin: { type: [Number], default: 8 },

    yName: { type: String, default: "" },
    yMin: { type: [Number, String] },
    yMax: { type: [Number, String] },
    ySplitNumber: { type: [Number, String], default: 5 },

    zShow: { type: String | Boolean, default: true },

    zColor: { type: String, default: "#9DC4ED" },
    zFontWeight: { type: String, default: "normal" },
    zFontSize: { type: [Number, String], default: 12 },
    zfontFamily: { type: String },
    zmargin: { type: [Number, String], default: 8 },

    zName: { type: String, default: "" },
    zMin: { type: [Number, String] },
    zMax: { type: [Number, String] },
    zSplitNumber: { type: [Number, String], default: 5 },

    lineShow: { type: String | Boolean, default: true }, // 轴线是否显示
    tickShow: { type: String | Boolean, default: true }, // 刻度是否显示
    tickShowy: { type: String | Boolean, default: false }, // 刻度是否显示
    tickLength: { type: [Number, String], default: 5 }, // 刻度的长度
    // 刻度和坐标轴颜色
    tickColor: { type: String, default: "#4FA1FF" },

    //系列Y
    YLineName: { type: String, default: "全国复制推广" }, // 折线名称
    YLineColor: { type: String, default: "#00FFF0" }, // 折线标签颜色
    YSmooth: { type: String | Boolean, default: false },
    YLineType: { type: String, default: "solid" }, // 折线样式
    YLineWidth: { type: [Number, String], default: 1 }, // 折线粗细
    YLineLabelShow: { type: String | Boolean, default: false }, // 是否显示值标签
    YLineLabelPosit: { type: [Number, String], default: "top" }, // 值标签位置
    YLineLabelColor: { type: String, default: "#fff" }, // 值标签颜色
    YLineLabelSize: { type: [Number, String], default: 16 }, // 值标签大小
    YShowSymbol: { type: String | Boolean, default: true },
    YSymbolSize: { type: [Number, String], default: 4 },
    ylabelSize: { type: [Number, String], default: 12 }, //坐标轴名称字号
    YAreaShow: { type: String | Boolean, default: true }, // 显示区域
    YAreaColor: {
      type: Object,
      default: () => {
        return {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#00FFF055" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#00FFF000" // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        };
      }
    }, // 区域颜色
    //系列Z
    ZLineName: { type: String, default: "全省复制推广" }, // 折线名称
    ZLineColor: { type: String, default: "#FF8A00" }, // 折线标签颜色
    ZSmooth: { type: String | Boolean, default: false },
    ZLineType: { type: String, default: "solid" }, // 折线样式
    ZLineWidth: { type: [Number, String], default: 1 }, // 折线粗细
    ZLineLabelShow: { type: String | Boolean, default: false }, // 是否显示值标签
    ZLineLabelPosit: { type: [Number, String], default: "top" }, // 值标签位置
    ZLineLabelColor: { type: String, default: "#fff" }, // 值标签颜色
    ZLineLabelSize: { type: [Number, String], default: 16 }, // 值标签大小
    ZShowSymbol: { type: String | Boolean, default: true },
    ZSymbolSize: { type: [Number, String], default: 4 },
    ZAreaShow: { type: String | Boolean, default: true }, // 显示区域
    ZAreaColor: {
      type: Object,
      default: () => {
        return {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#FF8A0055" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#FF8A0000" // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        };
      }
    }, // 区域颜色
    zlabelFointSize: { type: Number, default: 12 }, //z轴名称字号
    // A系列
    ALineName: { type: String, default: "全市复制推广" }, // 折线名称
    ALineColor: { type: String, default: "#0EE286" }, // 折线标签颜色
    ASmooth: { type: String | Boolean, default: false },
    ALineType: { type: String, default: "solid" }, // 折线样式
    ALineWidth: { type: [Number, String], default: 1 }, // 折线粗细
    ALineLabelShow: { type: String | Boolean, default: false }, // 是否显示值标签
    ALineLabelPosit: { type: [Number, String], default: "top" }, // 值标签位置
    ALineLabelColor: { type: String, default: "#fff" }, // 值标签颜色
    ALineLabelSize: { type: [Number, String], default: 16 }, // 值标签大小
    AShowSymbol: { type: String | Boolean, default: true },
    ASymbolSize: { type: [Number, String], default: 4 },
    AlabelSize: { type: [Number, String], default: 12 }, //坐标轴名称字号
    AAreaShow: { type: String | Boolean, default: true }, // 显示区域
    AAreaColor: {
      type: Object,
      default: () => {
        return {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#0EE28655" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0EE28600" // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        };
      }
    }, // 区域颜色

    // legenddataList:[],

    dataType: { type: String, default: "Static" },
    apiUrl: { type: String },
    x: { type: String, default: "x" },
    y: { type: String, default: "y" },
    z: { type: String, default: "z" },
    a: { type: String, default: "a" },
    // 是否双轴显示
    isMultAxie: { type: Boolean, default: true },
    // 第三系列数据参照哪一个坐标轴
    isOneAxis:{type:Boolean,default:true}
  },
  data() {
    return {
      chartId: guid(),
      isHasASeries: true //是否有a系列数据
    };
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        border: "1px solid red"
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    // 初始化echart表格
    initCharts() {
      // 获取组件的数据属性名
      let dataJsonKeys;
      if (typeof this.staticData[0] != "undefined") {
        dataJsonKeys = Object.keys(this.staticData[0]);
      }

      let xData = [];
      let yData = [];
      let zData = [];
      let aData = [];
      this.staticData.forEach(i => {
        xData.push(i[this.x]);
        if (typeof eval(i[this.y]) != "number") {
          i[this.y] = 0;
        }
        yData.push(i[this.y]);
        if (typeof eval(i[this.z]) != "number") {
          i[this.z] = 0;
        }
        zData.push(i[this.z]);
        // 如果没有定义，则去掉a系列数据
        if (typeof eval(i[this.a]) == "undefined") {
          this.isHasASeries = false;
        }
        if (typeof eval(i[this.a]) != "number") {
          i[this.a] = 0;
        }
        aData.push(i[this.a]);

        console.log("this.isHasASeries--", this.isHasASeries);
      });
      console.log("xData--", xData);
      console.log("yData--", yData);
      console.log("zData--", zData);
      // 坐标轴刻度设置
      let axisTick = {
        show: this.tickShow,
        length: this.tickLength,
        lineStyle: {
          color: this.tickColor
        }
      };
      let axisTicky = {
        show: this.tickShowy,
        length: this.tickLength,
        lineStyle: {
          color: this.tickColor
        }
      };
      let axisLine = {
        show: this.lineShow,
        lineStyle: {
          color: this.tickColor
        }
      };
      let zAxis = this.isMultAxie
        ? {
            show: this.zShow,
            type: "value",
            position: "right",
            name: this.zName,
            nameTextStyle: {
              color: this.zColor,
              fontSize: this.zlabelFointSize
            },
            splitNumber: this.zSplitNumber,
            min: this.zMin,
            max: this.zMax,
            // gridIndex:1,
            splitLine: {
              show: false,
              lineStyle: {
                color: this.splitlinecolor
              }
            },
            axisLabel: {
              show: this.zShow,
              color: this.zColor,
              fontWeight: this.zFontWeight,
              fontSize: this.zFontSize,
              fontFamily: this.zfontFamily,
              margin: this.zmargin
            },
            axisTicky,
            axisLine
          }
        : null;
      let option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            // fontFamily: this.font
          }
        },
        grid: {
          left: this.gridLeft,
          right: this.gridRight,
          bottom: this.gridBottom,
          top: this.gridTop,
          containLabel: true
        },
        legend: {
          show: this.legendShow,
          textStyle: {
            color: this.legendColor,
            fontSize: this.legendSize
          },
          itemGap: this.legendGap,
          itemWidth: 25,
          itemHeight: 8,
          orient: this.orient,
          data: [
            this.YLineName,
            this.ZLineName,
            this.isHasASeries ? this.ALineName : ""
          ]
        },
        color: [
          this.YLineColor,
          this.ZLineColor,
          this.isHasASeries ? this.ALineColor : ""
        ],
        xAxis: {
          show: this.xShow,
          type: "category",
          data: xData,
          boundaryGap: false,
          splitNumber: this.xSplitNumber,
          axisLabel: {
            show: this.xShow,
            color: this.xColor,
            fontWeight: this.xFontWeight,
            fontSize: this.xFontSize,
            // fontFamily: this.xfontFamily,
            margin: this.xmargin
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: this.splitlinecolor
            }
          },
          axisTick,
          axisLine
        },
        yAxis: [
          {
            show: this.yShow,
            type: "value",
            name: this.yName,
            nameTextStyle: {
              color: this.yColor,
              fontSize: this.ylabelSize
            },
            splitNumber: this.ySplitNumber,
            // min: this.yMin,
            // max: this.yMax,
            splitLine: {
              show: this.isshowsplitline,
              lineStyle: {
                color: this.splitlinecolor
              }
            },
            axisLabel: {
              show: this.yShow,
              color: this.yColor,
              fontWeight: this.yFontWeight,
              fontSize: this.yFontSize,
              fontFamily: this.yfontFamily,
              margin: this.ymargin
            },
            axisTicky,
            axisLine
          },
          zAxis
        ],
        series: [
          {
            type: "line",
            name: this.YLineName,
            label: {
              show: this.YLineLabelShow,
              position: this.YLineLabelPosit,
              color: this.YLineLabelColor,
              fontFamily: this.font,
              fontSize: this.YLineLabelSize
            },
            lineStyle: {
              width: this.YLineWidth,
              type: this.YLineType
            },
            symbol: "circle",
            showSymbol: this.YShowSymbol,
            symbolSize: this.YSymbolSize,
            smooth: this.YSmooth,
            areaStyle: {
              color:this.YAreaColor,
              opacity: this.YAreaShow ? 1 : 0
            },
            data: yData
          },
          {
            type: "line",
            name: this.ZLineName,
            label: {
              show: this.ZLineLabelShow,
              position: this.ZLineLabelPosit,
              color: this.ZLineLabelColor,
              fontFamily: this.font,
              fontSize: this.ZLineLabelSize
            },
            lineStyle: {
              width: this.ZLineWidth,
              type: this.ZLineType
            },
            areaStyle: {
              color: this.ZAreaColor,
              opacity: this.ZAreaShow ? 1 : 0
            },
            symbol: "circle",
            showSymbol: this.ZShowSymbol,
            symbolSize: this.ZSymbolSize,
            smooth: this.ZSmooth,
            yAxisIndex: this.isMultAxie ? 1 : 0,
            data: zData
          },
          {
            type: "line",
            name: this.ALineName,
            label: {
              show: this.ALineLabelShow,
              position: this.ALineLabelPosit,
              color: this.ALineLabelColor,
              //   fontFamily: this.font,
              fontSize: this.ALineLabelSize
            },
            lineStyle: {
              width: this.ALineWidth,
              type: this.ALineType
            },
            symbol: "circle",
            showSymbol: this.AShowSymbol,
            symbolSize: this.ASymbolSize,
            smooth: this.ASmooth,
            areaStyle: {
              color:this.AAreaColor,
              // color: this.YAreaColor.indexOf('top') > 0?this.transfter(this.YAreaColor):this.YAreaColor,
              opacity: this.AAreaShow ? 1 : 0
            },
            yAxisIndex:this.isOneAxis?0:1,
            data: this.isHasASeries ? aData : null
          }
        ]
      };
    //   console.log(JSON.stringify(option));
      // 设置默认选中值
      this.dataArray = this.staticData[0];
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
