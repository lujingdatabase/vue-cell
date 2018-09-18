<template>
    <div class="icon-box" :style='container' @mouseover="mouseOver" @mouseout="mouseOut">
        <ul class="icon-box-ul" :style="ulStyle">
            <li @click="outerEvent(item)" v-for="(item,index) in swiperData" :style="liStyle" :key="index">
                <div class="icon" :style="{width:imgWidth+'px',height:imgHeight+'px',position:'absolute',top:'50%',transform:'translateY(-50%)'}"><img :src="item.img!=='' ? item.img : '../../../../static/carbon.png'" height="100%" width="100%" /></div>
                <div class="text" :style="txtStyle">
                    <div class="val" :style="{height:valHeight+'px',lineHeight:valHeight+'px'}">
                        <div :style="exStyle">{{item.ex}}</div>
                        <div :style="valStyle">{{item.x}}</div>
                        <div :style="unitStyle">{{item.unit}}</div>
                    </div>
                    <div class="name" :style="nameStyle">{{item.y}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name:'jMultSlider',
  props: {
    // 轮播间距
    timeGap: { type: [Number], default: 3 },
    // 轮播速度
    speedNum:{type:[Number],default:5},
    dataType: { type: String, default: "Static" },
    apiUrl: {
      type: String,
      default: ""
    },
    staticData: {
      type: Array,
      default: () => {
        return [{
                    img: "https://www.baidu.com/img/bd_logo1.png",
                    ex: "第",
                    x: 1,
                    unit: "家",
                    y: "超市"
                },
                {
                    img: "https://www.baidu.com/img/bd_logo1.png",
                    ex: "第",
                    x: 2,
                    unit: "家",
                    y: "超市"
                },
                {
                    img: "https://www.baidu.com/img/bd_logo1.png",
                    ex: "第",
                    x: 3,
                    unit: "家",
                    y: "超市"
                }];
      }
    },
    width: { type: [Number, String], default: 300 },
    height: { type: [Number, String], default: 50 },
    // 每次显示的条数
    showNum: { type: [Number, String], default: 2 },
    // 图片的宽度
    imgWidth: { type: [Number, String], default: 50 },
    // 图片的高度
    imgHeight: { type: [Number, String], default: 50 },
    // 文字距离左边图片的距离
    tmLeft: { type: [Number, String], default: 20 },
    // 前缀的颜色
    exCor: { type: [Number, String], default: "#000" },
    // 前缀的字体大小
    exFont: { type: [Number, String], default: "14" },
    // 前缀的字体粗细
    exWeight: { type: [Number, String], default: "normal" },
    // 前缀的字体
    exFamily: { type: [Number, String], default: "microsoft yahei" },
    // 数值的颜色
    valCor: { type: [Number, String], default: "#000" },
    // 数值的字体大小
    valFont: { type: [Number, String], default: "24" },
    // 数值的字体粗细
    valWeight: { type: [Number, String], default: "normal" },
    // 数值的字体
    valFamily: { type: [Number, String], default: "microsoft yahei" },
    // 数值的高度
    valHeight: { type: [Number, String], default: "30" },
    // 单位的颜色
    unitCor: { type: [Number, String], default: "#000" },
    // 单位的字体大小
    unitFont: { type: [Number, String], default: "14" },
    // 单位的字体粗细
    unitWeight: { type: [Number, String], default: "normal" },
    // 单位的字体
    unitFamily: { type: [Number, String], default: "microsoft yahei" },
    // 名称的颜色
    nameCor: { type: [Number, String], default: "#000" },
    // 名称的字体大小
    nameFont: { type: [Number, String], default: "14" },
    // 名称的字体粗细
    nameWeight: { type: [Number, String], default: "normal" },
    // 名称的字体
    nameFamily: { type: [Number, String], default: "microsoft yahei" },
    // 名称的高度
    nameHeight: { type: [Number, String], default: "20" },
    // 是否开启动画
    animate: { type: Boolean, default: true },
    // 动画时长
    speed: { type: Number, default: 30 },
    activeAttr: {
      type: Object,
      default: () => {
        return {};
      }
    } //接收点击的数据
  },
  data() {
    return {
      myshowNum:this.showNum,//显示的数目
      startVal: 0,
      endVal: 0,
      // 每条数据的宽度
      inWidth: "",
      // 获取ul
      _ul: null,
      _ulHtml: null,
      _ulWidth: null,
      // 动画间距时间
      timer: null,
      _index: 0,
      showIndex: 0,
      trX: 0,
      // 轮播数据
      swiperData: [],
      // 轮播是否到尾部
      isEnd: false,
      // 做动画的时间
      animateTimer: null,
      animateCount: 1,
      dataArray: {},
      comName: "标签列表"
    };
  },
  watch: {
   
    // 监听轮播速度参数是否改变
    timeGap:{
      immediate: true,
      handler: function(val){
         this.animationConfig()
      }
    },
    animate:{
         immediate: true,
         handler: function(val){
             if(val){
                //  开启动画
                 this.animationConfig()
             }else{
                //  关闭动画
                let timer1 = localStorage.getItem("gapTimer")
                let timer2 = localStorage.getItem("actionTimer")
                clearInterval(timer1)
                clearInterval(timer2)
               
             }
            
         }

    }
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        overflow: "hidden",
        position: "relative"
      };
    },
    // ul样式
    ulStyle() {
      return {
        transform: `translateX(-${this.trX}px)`
      };
    },
    // 每条数据的样式
    liStyle() {
      this.inWidth = this.width / this.myshowNum;
      return {
        width: `${this.inWidth}px`,
        height: `${this.height}px`,
        position: "relative",
        margin:0
      };
    },
    // 包裹右侧DIV文字的样式
    txtStyle() {
      return {
        // height: `${this.height}px`,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: `${this.imgWidth + this.tmLeft}px`,
        width: this.inWidth - this.imgWidth - this.tmLeft + "px"
        // marginLeft: `${this.tmLeft}px`
      };
    },
    // 前缀的样式
    exStyle() {
      return {
        color: this.exCor,
        fontSize: `${this.exFont}px`,
        fontFamily: this.exFamily,
        fontWeight: this.exWeight,
        display: "inline-block"
        // height: `${this.unitHeight}px`,
        // lineHeight: `${this.valHeight}px`
      };
    },
    // 数值的样式
    valStyle() {
      return {
        color: this.valCor,
        fontSize: `${this.valFont}px`,
        fontFamily: this.valFamily,
        fontWeight: this.valWeight,
        display: "inline-block"
        // height: `${this.valHeight}px`,
        // lineHeight: `${this.valHeight}px`
      };
    },
    // 单位的样式
    unitStyle() {
      return {
        color: this.unitCor,
        fontSize: `${this.unitFont}px`,
        fontFamily: this.unitFamily,
        fontWeight: this.unitWeight,
        display: "inline-block"
        // height: `${this.unitHeight}px`,
        // lineHeight: `${this.valHeight}px`
      };
    },
    // 名称的样式
    nameStyle() {
      return {
        color: this.nameCor,
        fontSize: `${this.nameFont}px`,
        fontFamily: this.nameFamily,
        fontWeight: this.nameWeight,
        height: `${this.nameHeight}px`,
        lineHeight: `${this.nameHeight}px`,
        float: "left"
      };
    }
  },
  mounted() {
    this.$nextTick(()=>{
        this.animationConfig()
    })
  },
  methods: {
    // 动画的配置方法
    animationConfig() {
   
      let that  = this
      let pushList = [];
      let length = that.staticData.length;
      for (let i = 0; i < that.myshowNum; i++) {
        pushList.push(that.staticData[i]);
      }
      that.swiperData = that.staticData.concat(pushList);
      // 获取组件的数据属性名
      let dataJsonKeys = Object.keys(that.swiperData[0]);
       //关闭动画   
       if(!this.animate){
            that.myshowNum = that.staticData.length
            return
       //开启动画 
       }else{
            that.myshowNum = that.showNum
       }
      
      that.dataArray = that.swiperData[0]; // 设置交互事件默认值
       // 如果有定时器，则删除定时器
      if (that.timer) {
        clearInterval(that.timer);
      }
      //清空间隔计时器
      let gapTimer = localStorage.getItem('gapTimer')   
      if(gapTimer&&gapTimer>0){
          clearInterval(gapTimer)
      }
      that.timer = setInterval(that.imgAnimated, that.timeGap * 1000);
      localStorage.setItem('gapTimer', that.timer)
    },
    imgAnimated() {
        // todo:①先清空计时器，②创建新的计时器执行任务
      // 轮播动画效果，此处1表示完成一次轮播动画需要1秒，若后期需求改为动画时间由用户决定，可将此处的1替换为从用户接收的变量
      this.animateCount = 1;
      // console.log('这里呢？？？')
      let that = this
      //获得动作计时器,先清空计时器，
      let mytimer = localStorage.getItem('actionTimer')
      if(mytimer&&mytimer>0){
          clearInterval(mytimer);
      }   
      that.animateTimer = setInterval(() => {
        // 某一次轮播由100次的移动完成
        let tempspeednum = that.speedNum==10?9:that.speedNum
        if (that.animateCount >= (tempspeednum*10)) {
          that.animateCount = 1;
          that.showIndex++;
          that.trX = that.showIndex * that.inWidth;
          that.isGoHead();
          // 清空所有的计时器
          let tempid = that.animateTimer;
          let tempoutID = that.timer;
          while (tempid > 0) {
            if (tempid > tempoutID) {
              clearInterval(tempid);
            }
            tempid--;
          }
        } else {
          that.animateCount++;
          that.trX += that.inWidth / (tempspeednum*10);
        }
      }, 10);
      //保存当前计时器   
      localStorage.setItem('actionTimer',that.animateTimer)
    },
    // 是否从头轮播
    isGoHead() {
      if (this.showIndex >= this.swiperData.length - this.myshowNum) {
        this.showIndex = 0;
        this.trX = 0;
      }
    },
    mouseOver() {
      return;
      clearInterval(this.timer);
      clearInterval(this.animateTimer);
    },
    mouseOut() {
      return;
      this.animateTimer = setInterval(() => {
        if (this.animateCount >= 2 * 1000 / 10) {
          this.animateCount = 1;
          this.showIndex++;
          this.trX = this.showIndex * this.inWidth;
          console.log(this.trX / this.inWidth);
          clearInterval(this.animateTimer);
        } else {
          this.animateCount++;
          this.trX += this.inWidth / (2 * 1000 / 10);
        }
      }, 10);
      this.timer = setInterval(this.imgAnimated, 3000);
      setTimeout(() => {
        if (this.showIndex >= this.swiperData.length - this.myshowNum) {
          this.showIndex = 0;
          this.isEnd = true;
          this.trX = 0;
          setTimeout(() => {
            this.isEnd = false;
          }, 2 * 1000 + 100);
        }
      }, 2 * 1000 + 100);
    },
    outerEvent(data) {
      this.dataArray = data;
    },
    // activeEvent() {
    //   let json = {};
    //   Object.keys(this.activeAttr).forEach(i => {
    //     if (this.dataArray[i]) {
    //       json[this.activeAttr[i]] = this.dataArray[i];
    //     }
    //   });
    //   if (Object.keys(json).length > 0) {
    //     this.$store.dispatch("setKeys", JSON.parse(JSON.stringify(json)));
    //   }
    // }
    // getNum() {
    //     //获取text的数字部分
    //     for (var i = 0; i < this.text.length; i++) {
    //         //去除前缀
    //         if (this.text.charAt(i) <= "9" && this.text.charAt(i) >= "0") {
    //             this.endVal = this.text.substr(i);
    //             break;
    //         }
    //     }
    //     for (var i = this.endVal.length - 1; i >= 0; i--) {
    //         //去除后缀，从字符串尾部遍历，碰到第一个数字时记录i的位置
    //         if (
    //             this.endVal.charAt(i) <= "9" &&
    //             this.endVal.charAt(i) >= "0"
    //         ) {
    //             this.endVal = parseFloat(this.endVal.substr(0, i + 1));
    //             break;
    //         }
    //     }
    // },
    // getDecimals() {
    //     //获得小数部分长度
    //     let str = this.endVal + "";
    //     let i = str.indexOf(".") + 1; //获取小数点的位置
    //     if (i > 0) {
    //         return str.length - i; //获取小数点后的个数
    //     } else {
    //         return 0;
    //     }
    // },
    // getSuffix() {
    //     //截取后缀
    //     for (var i = this.text.length; i >= 0; i--) {
    //         if (this.text.charAt(i) <= "9" && this.text.charAt(i) >= "0") {
    //             return this.text.substr(i + 1);
    //             break;
    //         }
    //     }
    // }
  }
};
</script>
<style type="text/less" lang="less">
.icon-box-ul {
  &:hover {
    animation-play-state: paused;
  }
  white-space: nowrap;
  li {
    display: inline-block;
  }
}
</style>
