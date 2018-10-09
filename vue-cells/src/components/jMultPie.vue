/*
 * @Author: lujing 
 * @Date: 2018-09-26 15:52:52 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-10-09 08:41:52
 * @Desc:  使用echart实现的带时间轴饼图
 */

<template>
    <section :style="styles" style="position:relative;display:flex;align-items: center">
        <div ref="pieChart" :style="pieStyl"></div>
        <ul style="position:absolute;left:25%;top:-15px;display:flex;flex-direction: column;justify-content: space-around;" ref="text" v-if="showLegend" :style="ulStyles">
            <li style="display:flex;align-items: center;" v-for="(item,index) in itemData">
                <div :style='circleStyl(index)'></div>
                <div style="flex:3;color:white;margin-left:10px;text-align:left">{{item.name}}</div>
                <div style='flex:2;color:#31D6FF'>{{item.value+'%'}}</div>
            </li>
        </ul>
    </section>
</template>
<script>
import eCharts from "echarts";
import { oneOf } from "../utils/assist";

const prefixCls = "geo-pie";

export default {
  name: "pieChart",
  props: {
    // 是否显示时间轴
    timelineshow: { type: Boolean, default: false },
    // 颜色列表
    colorList: {
      type: Array,
      default: () => {
        return ["#0EE286", "#31D6FF", "#FF8A00", "#FF3232", "#006CFF"];
      }
    },
    // 外盒宽度
    width: {
      type: [Number, String],
      default: 1000
    },
    // 外盒高度
    height: {
      type: [Number, String],
      default: 160
    },
    // 图例文字颜色
    tColor: {
      type: String,
      default: "#000"
    },
    // 饼形图横向或者纵向
    type: {
      type: String,
      default: "v",
      validator(value) {
        return oneOf(value, ["v", "h"]);
      }
    },
    // 是否默认被选中状态
    selected: {
      type: Boolean,
      default: true
    },
    // 饼形图的宽度
    chartWidth: {
      type: String,
      default: "45"
    },
    // 饼形图的高度
    chartHeight: {
      type: String,
      default: "45"
    },
    // 内外环的直径
    radius: {
      type: Array,
      default: () => [50, 55]
      //   default: () => [65, 75]
    },
    // 单位
    unit: {
      type: String,
      default: ""
    },
    itemData: {
      type: Array,
      default: () => [
        { value: 40, name: "金融业" },
        { value: 20, name: "现代物流业" },
        { value: 15, name: "现代信息业" },
        { value: 18, name: "科技服务业" },
        { value: 7, name: "其他服务业" }
      ]
    },
    itemData2: {
      type: Array,
      default: () => [
        { value: 40, name: "金融业" },
        { value: 2, name: "现代物流业" },
        { value: 15, name: "现代信息业" },
        { value: 1, name: "科技服务业" },
        { value: 7, name: "其他服务业" }
      ]
    },
    itemData3: {
      type: Array,
      default: () => [
        { value: 40, name: "金融业" },
        { value: 20, name: "现代物流业" },
        { value: 5, name: "现代信息业" },
        { value: 8, name: "科技服务业" },
        { value: 7, name: "其他服务业" }
      ]
    },
    // 饼图中间文字
    text: {
      type: String,
      default: "企业总数"
    },
    // 是否显示数据总和
    qty: {
      type: Boolean,
      default: false
    },
    // 自定义中间数字显示内容
    secText: {
      type: String,
      default: "147660家"
    },
    // 饼形图展现形式
    kind: {
      type: String,
      default: "normalPie",
      validator(value) {
        return oneOf(value, ["normalPie", "overlayPie"]);
      }
    },
    // 开始旋转的角度
    startAngle: {
      type: Array,
      default: () => {
        return [40, 30, 60];
      }
    },
    // 是否需要另外一半数据是透明
    percent: {
      type: Boolean,
      default: false
    },
    // 是否显示overlayPie的提示框
    tShow: {
      type: Boolean,
      default: true
    },
    // 图例上面是否显示百分比
    hasRatio: {
      type: Boolean,
      default: false
    },
    // 图例颜色图标的形状
    shape: {
      type: String,
      default: "square",
      validator(value) {
        return oneOf(value, ["round", "square"]);
      }
    },
    // 是否显示右边图例
    showLegend: {
      type: Boolean,
      default: true
    },
    // 主标题的样式
    textStyle: {
      type: Object,
      default: function() {
        return {
          color: "#fff",
          fontWeight: "bold",
          fontSize: 18,
          fontFamily: "Mircosoft Yahei"
        };
      }
    },
    // 副标题或者总和的样式
    secTextStyle: {
      type: Object,
      default: function() {
        return {
          color: "#31D6FF",
          fontWeight: "bold",
          fontSize: 20,
          fontFamily: "Mircosoft Yahei"
        };
      }
    },
    // 主标题距离顶部的位置
    txtPos: {
      type: String | Number,
      default: "35%"
    },
    // 副标题距离顶部的位置
    secTxtPos: {
      type: String | Number,
      default: "55%"
    },
    // 鼠标悬浮图块偏移距离
    hoverOffset: {
      type: Number,
      default: 5
    },
    // 鼠标点击图块偏移距离
    selOffset: {
      type: Number,
      default: 5
    },
    // 点击事件
    pieEvent: {
      type: Object,
      default() {
        return {
          eventType: "",
          callBack: null
        };
      }
    },
    // 图例的点击事件
    legendEvent: {
      type: Object,
      default() {
        return {
          callBack: null
        };
      }
    }
  },
  data() {
    return {
      chart: null,
      prefixCls: prefixCls,
      liStyle: {
        height: "",
        lineHeight: ""
      },
      marginTop: "",
      ratio: [],
      sum: 0
    };
  },
  computed: {
    classes() {
      return [
        {
          [`${prefixCls}-v`]: this.type === "v",
          [`${prefixCls}-h`]: this.type === "h"
        }
      ];
    },
    iconClasses() {
      return [
        [`${prefixCls}-legend-icon`],
        {
          [`${prefixCls}-roundIcon`]: this.shape === "round"
        }
      ];
    },
    pieClasses() {
      return `${prefixCls}`;
    },
    pieStyl() {
      return {
        width: `${this.width/2}px`,
        height: `${this.height}px`
      };
    },
    ulStyles() {
      return {
        width: "20%",
        height: `70%`,
        // border: "1px solid red"
      };
    },
    styles() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      const height = this.showLegend ? this.$refs.text.clientHeight - 20 : 0;
      const liHeight = height / this.itemData.length;
      this.liStyle.height = `${liHeight}px`;
      this.liStyle.lineHeight = `${liHeight}px`;
      if (this.legendEvent.callBack) {
        this.liStyle.cursor = "pointer";
      }
      this.marginTop = `${(liHeight - 14) / 2}px`;
      setTimeout(() => {
        this.drawChart();
      }, 200);
    });
  },
  updated() {
    this.$nextTick(() => {
      const height = this.showLegend ? this.$refs.text.clientHeight - 20 : 0;
    });
  },
  watch: {
    itemData(curVal, oldVal) {
      this.drawChart();
    }
  },
  methods: {
    circleStyl(index) {
      return {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        border: `4px solid ${this.colorList[index]}`
      };
    },
    clickLegendItem(param) {
      if (this.legendEvent.callBack) {
        this.legendEvent.callBack(param);
      }
    },
    drawChart() {
      this.sum = 0;
      this.itemData.forEach((item, index) => {
        if (isNaN(item.value)) {
          item.value = "--";
        } else {
          this.sum += parseInt(item.value);
        }
      });
      this.ratio = [];
      this.itemData.forEach((item, index) => {
        this.ratio.push(
          item.value == 0
            ? "0"
            : isNaN(item.value)
              ? "--%"
              : (parseInt(item.value) / this.sum * 100).toFixed(2) + "%"
        );
      });
      if (this.kind === "normalPie") {
        this.sum += this.unit;
        eCharts.util.each(this.itemData, (item, index) => {
          item.itemStyle = {
            normal: {
              color: this.colorList[index]
            }
          };
          // if (index == 0 && this.selected) {
          //     item.selected = true;
          // }
        });
      }
      const option = {
        baseOption: {
         
          title: [
            {
              text: this.text.replace("\\n", "\n"), //通过传入\n可使标题换行
              left: "20%",
              top:'20%',
              textBaseline: "middle",
              textStyle: this.textStyle
            },
            {
              text: this.secText ? this.secText : this.sum,
              show: this.qty || this.secText ? true : false,
              left: "20%",
              top:'35%',
              textBaseline: "middle",
              textStyle: this.secTextStyle
            }
          ],
          tooltip: {
            formatter: this.unit
              ? "{b0} <br/> {c0}" + this.unit + "（{d0}%）"
              : "{b0} <br/> {c0}%"
          },
          timeline: {
            show:true,
            axisType: "category",
            playInterval: 1000,
            symbol:'image://data:image/png;base64,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',
            symbolSize:20,
            padding:5,
            // symbolOffset:['50%',0],
            lineStyle:{
                type:'dashed',
                color:'#0084FF'
            },
            checkpointStyle:{
                  symbol:'image://data:image/png;base64,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',
                  color:'#fff',
                  symbolSize:20,
            },
            controlStyle: {
                color:'#0084FF',
                showPlayBtn:false,
                itemSize:18,
                nextIcon:'path://M755.974268 512 268.025732 146.975708l0 730.048584L755.974268 512',
                prevIcon:'path://M268.025732 511.997952l487.950584 365.02634L755.976316 146.975708 268.025732 511.997952'
            },
            data: ["2014",'2015','2016'],
            label: {
              formatter: function(s) {
                return new Date(s).getFullYear();
              },
               show:true,
               color:'#A4CDF6'
            },
            itemStyle:{
                color:'#fff'
            },
            emphasis:{
                label:{
                    color:'#ffffff'
                },
                // itemStyle:{
                //     color:'#fff'
                // },
                controlStyle:{
                    color:'#fff',
                    borderColor:'#fff'
                },
                checkpointStyle:{
                     symbol:'circle',
                     color:'#f00'
                }
            }
          },
          series: [
            {
              hoverAnimation: false, //设置饼图默认的展开样式
              center: ['30%', '35%'],
              radius: this.radius,
              type: "pie",
              // selectedMode: "single",
              selectedOffset: this.selOffset,
              hoverOffset: this.hoverOffset,
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.itemData
            }
          ]
        },
        options:[
            {series:[{
                data:this.itemData
            }]},
             {series:[{
                data:this.itemData2
            }]},
             {series:[{
                data:this.itemData3
            }]}
        ]
      };
      if (this.kind == "overlayPie") {
        let series = [];
        eCharts.util.each(this.itemData, (item, index) => {
          series.push({
            type: "pie",
            name: item.name,
            clockWise: false,
            startAngle: this.startAngle[index],
            radius: this.radius[index],
            itemStyle: {
              normal: {
                color: this.colorList[index],
                label: { show: false },
                labelLine: { show: false },
                shadowBlur: 0,
                shadowColor: "rgba(0, 0, 0, 0)"
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: item.value,
                name: "visible"
              },
              {
                value: this.percent
                  ? this.sum - parseInt(item.value)
                  : this.itemData[0].value - item.value,
                name: "invisible",
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    label: { show: false },
                    labelLine: { show: false }
                  },
                  emphasis: {
                    color: "rgba(0,0,0,0)"
                  }
                }
              }
            ]
          });
        });
        option.series = series;
        option.tooltip = {
          show: this.tShow,
          formatter: this.unit
            ? "{a} <br/> {c}" + this.unit + "（{d0}%）"
            : "{a} <br/> {c} ({d}%)"
        };
      }
      this.chart = eCharts.init(this.$refs.pieChart);
      this.chart.on(this.pieEvent.eventType, this.pieEvent.callBack);
      this.chart.setOption(option);
      this.chart.on('timelinechanged', function(paramA,paramB){
          console.log(paramA)
          console.log(paramB)
      })
    }
  }
};
</script>
