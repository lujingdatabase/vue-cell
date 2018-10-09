/*
 * @Author: lujing 
 * @Date: 2018-09-26 15:52:52 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-10-09 08:43:47
 * @Desc:  带时间轴饼图
 */

<template>
  <div :style="container">
    <section :style="styles" style="display:flex;align-items: center">
      <div :id="chartId" :style="pieStyl"></div>
      <!-- 第一种样式 -->
      <ul style="display:flex;flex-direction: column;justify-content: space-around;" ref="text" v-if="showLegend&&typeNum==1" :style="ulStyles">
        <li style="display:flex;align-items: flex-start;" v-for="(item,index) in itemData[checkNum]">
          <div :style='circleStyl(index)'></div>
          <div style="width:120px;text-align:left;position:relative;margin:-5px 0 0 10px;">
            <div style="color:white;font-size:16px;">{{item.name}}</div>
            <div style='margin-top:5px; position:relative'>
              <span :style='valueStyl(index)'>{{item.value}}</span>
              <span class='propssty'>{{item.props}}</span>
            </div>
          </div>
          <!-- <div style="flex:3;color:white;margin-left:10px;text-align:left">{{item.name}}</div>
          <div style='flex:2;color:#31D6FF'>{{item.value+'%'}}</div> -->
        </li>
      </ul>
      <!-- 第二种图例样式 -->
      <ul style="display:flex;flex-direction: column;justify-content: space-around;" ref="text" v-else-if="showLegend" :style="ulStyles">
        <li style="display:flex;align-items: center;" v-for="(item,index) in itemData[checkNum]">
          <div :style='circleStyl(index)'></div>
          <div style="flex:3;color:white;margin-left:10px;text-align:left">{{item.name}}</div>
          <div style='flex:2;color:#31D6FF'>{{item.value+'%'}}</div>
        </li>
      </ul>
    </section>
    <div v-if='timeLineDataList.length>0' :style="timelineStyl" style="display:flex;justify-content: center;padding-top:10px;">
      <img @click='changeclick("up")' class="leftIcon" src="./img/leftArr.png">
      <div style="text-align:center" v-for='(item,index) in timeLineDataList'>
        <div :style="xlineStyl" style='position:relative;top:11px;z-index:1'></div>
        <img class='pointstyl' @click='clickpoint(index)' :src="currentImg(index)">
        <div @click='clickpoint(index)' :style="labelColorStyl(index)">{{item}}</div>
      </div>
      <img @click='changeclick("next")' class="rightIcon" src="./img/rightArr.png">
    </div>
  </div>

</template>
<script>
import eCharts from "echarts";
import { oneOf } from "../utils/assist";
import guid from "../utils/guid";

const prefixCls = "geo-pie";

export default {
  name: "pieChart",
  props: {
    // 图例的样式
    typeNum: { type: Number, default: 2 },
    timeLineHeight: { type: Number, default: 60 },
    // 时间轴需要数据
    timeLineDataList: {
      type: Array,
      default: () => {
        // return[]
        return ["2011", "2012", "2013", "2014", "2015 "];
      }
    },
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
      default: 400
    },
    // 外盒高度
    height: {
      type: [Number, String],
      default: 260
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
    // 内外环的直径
    radius: {
      type: Array,
      default: () => ["85%", "100%"]
    },
    // 单位
    unit: {
      type: String,
      default: ""
    },
    itemData: {
      type: Array,
      default: () => [
        [
          { value: 40, name: "金融业", props: "12%" },
          { value: 20, name: "现代物流业", props: "12%" },
          { value: 15, name: "现代信息业", props: "12%" },
          { value: 18, name: "科技服务业", props: "12%" },
          { value: 7, name: "其他服务业", props: "12%" }
        ],
        [
          { value: 40, name: "金融业", props: "12%" },
          { value: 20, name: "现代物流业", props: "12%" },
          { value: 5, name: "现代信息业", props: "12%" },
          { value: 18, name: "科技服务业", props: "12%" },
          { value: 7, name: "其他服务业", props: "12%" }
        ],
        [
          { value: 4, name: "金融业", props: "12%" },
          { value: 20, name: "现代物流业", props: "12%" },
          { value: 15, name: "现代信息业", props: "12%" },
          { value: 18, name: "科技服务业", props: "12%" },
          { value: 7, name: "其他服务业", props: "12%" }
        ],
        [
          { value: 40, name: "金融业", props: "12%" },
          { value: 20, name: "现代物流业", props: "12%" },
          { value: 15, name: "现代信息业", props: "12%" },
          { value: 8, name: "科技服务业", props: "12%" },
          { value: 7, name: "其他服务业", props: "12%" }
        ],
        [
          { value: 40, name: "金融业", props: "12%" },
          { value: 2, name: "现代物流业", props: "12%" },
          { value: 1, name: "现代信息业", props: "12%" },
          { value: 18, name: "科技服务业", props: "12%" },
          { value: 7, name: "其他服务业", props: "12%" }
        ]
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
      chartId: guid(),
      checkNum: 0,
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
    xlineStyl() {
      return {
        borderBottom: "2px #0084FF dashed",
        width: `${(this.width - 60) / this.timeLineDataList.length}px`,
        height: "1px"
      };
    },
    timelineStyl() {
      return {
        width: "100%",
        height: `${this.timeLineHeight}px`
      };
    },
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
    pieStyl() {
      return {
        width: `${this.width/2}px`,
        height: `${this.height - this.timeLineHeight}px`
        // width: '50%',
        // height: '100%'
      };
    },
    ulStyles() {
      return {
        width: "50%",
        height: `100%`
      };
    },
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    styles() {
      if (this.timeLineDataList.length > 0) {
        return {
          width: `${this.width}px`,
          height: `${this.height - this.timeLineHeight}px`
        };
      } else {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`
        };
      }
    }
  },
  mounted() {
      setTimeout(() => {
        this.drawChart();
      }, 20);
  },
 
  watch: {
    checkNum(val , oldval){
       this.drawChart();
    },
    itemData(val , oldval){
       this.drawChart();
    }
  },
  methods: {
    valueStyl(index) {
      let tempColor = "";
      switch (index) {
        case 0:
          tempColor = "#0EE286";
          break;
        case 1:
          tempColor = "#31D6FF";
          break;
        case 2:
          tempColor = "#FF8A00";
          break;
        case 3:
          tempColor = "#FF3232";
          break;
        case 4:
          tempColor = "#006CFF";
          break;

        default:
          break;
      }
      return {
        color: tempColor,
        fontSize: "25px"
      };
    },
    // 切换点击事件
    changeclick(params) {
      let Num = this.checkNum;
      if (params == "up") {
        let tempNum = Num - 1;
        if (tempNum < 0) {
          this.checkNum = this.timeLineDataList.length - 1;
        } else {
          this.checkNum = tempNum;
        }
      } else {
        let tempNum = Num + 1;
        if (tempNum > this.timeLineDataList.length - 1) {
          this.checkNum = 0;
        } else {
          this.checkNum = tempNum;
        }
      }
    },
    // 当前的图标
    currentImg(index) {
      let tempPic = "";
      if (this.checkNum == index) {
        tempPic = require("./img/checkpoint.png");
      } else {
        tempPic = require("./img/uncheckpoint.png");
      }
      return tempPic;
    },
    // 选择某一个节点
    clickpoint(index) {
      this.checkNum = index;
    },
    labelColorStyl(index) {
      let tempcolor = "";
      if (this.checkNum == index) {
        tempcolor = "white";
      } else {
        tempcolor = "#00EAFF";
      }
      return {
        color: tempcolor,
        fontSize: "14px",
        cursor: "pointer"
      };
    },
    circleStyl(index) {
      return {
        width: "13px",
        height: "13px",
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
      // this.sum = 0;
      // this.itemData[this.checkNum].forEach((item, index) => {
      //   if (isNaN(item.value)) {
      //     item.value = "--";
      //   } else {
      //     this.sum += parseInt(item.value);
      //   }
      // });
      // this.ratio = [];
      // this.itemData[this.checkNum].forEach((item, index) => {
      //   this.ratio.push(
      //     item.value == 0
      //       ? "0"
      //       : isNaN(item.value)
      //         ? "--%"
      //         : (parseInt(item.value) / this.sum * 100).toFixed(2) + "%"
      //   );
      // });
      if (this.kind === "normalPie") {
        this.sum += this.unit;
        eCharts.util.each(this.itemData[this.checkNum], (item, index) => {
          item.itemStyle = {
            normal: {
              color: this.colorList[index]
            }
          };
        });
      }
      const option = {
        // title: [
        //   {
        //     text: this.text.replace("\\n", "\n"), //通过传入\n可使标题换行
        //     left: "center",
        //     top: this.txtPos,
        //     textBaseline: "middle",
        //     textStyle: this.textStyle
        //   },
        //   {
        //     text: this.secText ? this.secText : this.sum,
        //     show: this.qty || this.secText ? true : false,
        //     left: "center",
        //     top: this.secTxtPos,
        //     textBaseline: "middle",
        //     textStyle: this.secTextStyle
        //   }
        // ],
        // tooltip: {
        //   formatter: this.unit
        //     ? "{b0} <br/> {c0}" + this.unit + "（{d0}%）"
        //     : "{b0} <br/> {c0}%"
        // },
        grid:{
          top:0,
          bottom:0,
          left:0,
          right:0,
          backgroundColor:'#f00',
          borderColor:'#00f'
        },
        series: [
          {
            hoverAnimation: false, //设置饼图默认的展开样式
            radius:['85%','100%'],
            center:['50%','50%'],
            type: "pie",
            selectedMode: "single",
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
            data: this.itemData[this.checkNum]
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
.pointstyl {
  cursor: pointer;
  position: relative;
  z-index: 5;
  width: 18px;
  height: 18px;
  top: 1px;
}
.leftIcon,
.rightIcon {
  width: 25px;
  height: 25px;
  position: relative;
  cursor: pointer;
}
.leftIcon {
  left: 5px;
}
.rightIcon {
  right: 5px;
}
.propssty {
  border: 1px solid #0084ff;
  color: #01e7fd;
  border-radius: 20px;
  padding: 0 10px;
  background: #0084ff55;
  position: absolute;
  right: 0;
  height: 18px;
  line-height: 20px;
}
</style>
