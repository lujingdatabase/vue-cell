/*
 * @Author: lujing 
 * @Date: 2018-09-26 09:57:25 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-26 11:24:03
 * @Desc:  堆叠图
 */
<template>
    <div :style='container'>
        <div style="margin-left:10px;height:70%">
            <div style="float:left;" :style="itemstyl(index)"  v-for='(item,index) in dataList'>
                <!-- 圆圈 -->
                <div style="float:left;margin-top:5px"  v-if='index!=0' :style='circleStyl(index)'></div>
                <!-- 数据 -->
                <div style="float:left;margin-left:2px">
                    <div :style='namestyl' style='color:white'>{{item.name}}</div>
                    <div :style='valuestyl(index)' style='text-align:left'><span>{{item.value}}</span><span>{{item.unit}}</span></div>
                </div>
            </div>
        </div>
        <section :id="chartId" :style="pilebarStyl"></section>
    </div>
</template>
<script>
import eCharts from "echarts";
import guid from "../utils/guid";
export default {
  props: {
    width: { type: [String, Number], default: 550 },
    height: { type: [String, Number], default: 100 },
    valueSize:{type:[String,Number],default:25},
    valueWeight:{type:[String],default:'bold'},
    nameSize:{type:[String,Number],default:18},
    // 数据
    dataList: {
      type: Array,
      default: () => {
        return [
          { name: "总机构数", value: 66, unit: "个" },
          { name: "制度创新基地", value: 25, unit: "个" },
          { name: "制度创新中心", value: 32, unit: "个" },
          { name: "制度创新实验室", value: 9, unit: "个" }
        ];
      }
    },
    // 颜色集合
    colorList: {
      type: Array,
      default: () => {
        return ["#f58f23", "#0EE286", "#12fffe"];
      }
    }
  },
  data() {
    return {
      chartId: guid()
    };
  },
  computed: {
      namestyl(){
          return{
              fontSize:`${this.nameSize}px`
          }
      },
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    pilebarStyl() {
      return {
        width: `${this.width}px`,
        height: "50%"
      };
    },
   
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
      //标题条目的样式   
      itemstyl(index){
        let marginLeftValue =0
        if(index==1){
         marginLeftValue=15
        }else{
            marginLeftValue=5

        }
        return {
            marginLeft:`${marginLeftValue}px`
        }
      },
      //标题中值的样式
      valuestyl(index){
          let color = ''
          if(index==0){
             color='white'
          }else{
             color=this.colorList[index-1]
          }
          return{
              color:color,
              fontSize:this.valueSize+"px",
              fontWeight:this.valueWeight
          }
      },
    //   圆圈的样式
    circleStyl(index){
        return{
            width:'7px',
            height:'7px',
            borderRadius:'50%',
            border:`4px solid ${this.colorList[index-1]}`
        }
    },
    // 初始化图表
    initCharts() {
      let listOfBar = [];
      //根据数据集合，拼接条形图数据
      this.dataList.forEach((item, index, arr) => {
        if (index != 0) {
          listOfBar.push({
            name: item.name,
            type: "bar",
            barWidth: 15,
            stack: "总量",
            data: [item.value]
          });
        }
      });
      let option = {
        // backgroundColor: "rgba(0,0,0,0.4)",
        color: this.colorList,

        grid: {
          left: "3%",
          right: "5%",
          bottom: "5%",
          top: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            show: false,
            max: this.dataList[0].value
          }
        ],
        yAxis: [
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: listOfBar
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
