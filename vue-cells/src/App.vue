<template>
  <div id="app" >
     <Collapse v-model="value" >
        <Panel name="1">
            多图轮播：
            <p slot="content">
                    <j-mult-slider    :staticData ='datass' nameCor='#000' unitCor='#000' exCor='#000' valCor='#000' ></j-mult-slider>

            </p>
        </Panel>
        <Panel name="2">
           色块图：
            <p slot="content">
                 <j-color-block totalNum=250 titleColor='#000' width=500 height=200 :staticData='dataofcolorblock'></j-color-block>
            </p>
        </Panel>
        <Panel name="3">
            水平堆叠图：
            <p slot="content" style="background:#aaa">
              <j-bar-hori-stack></j-bar-hori-stack>
            </p>
        </Panel>
        <Panel name="4">
            基本饼图
            <p slot="content" style="background:#aaa">
              <j-base-pie :itemData = 'itemDataList'></j-base-pie>
            </p>
        </Panel>
        <Panel name="5">
            进度条
            <p slot="content" style="background:#aaa">
              <j-rate-bar></j-rate-bar>
            </p>
        </Panel>
         <Panel name="6">
            echarts实现的带时间轴饼图
            <p slot="content" style="background:#aaa">
              <j-mult-pie></j-mult-pie>
            </p>
        </Panel>
         <Panel name="7">
            简单列表
            <p slot="content" style="background:#aaa">
              <j-simple-list></j-simple-list>
            </p>
        </Panel>
         <Panel name="8">
            标题
            <p slot="content" style="background:#aaa">
              <j-title-label></j-title-label>
            </p>
        </Panel>
         <Panel name="9">
            标题2
            <p slot="content" style="background:#aaa">
              <j-vh-title></j-vh-title>
            </p>
        </Panel>
         <Panel name="10">
            条形图
            <p slot="content" style="background:#aaa">
              <j-x-bar></j-x-bar>
            </p>
        </Panel>
         <Panel name="11">
            折线图
            <p slot="content" style="background:#aaa">
              <j-x-line></j-x-line>
            </p>
        </Panel>
         <Panel name="12">
            折线图条形图
            <p slot="content" style="background:#aaa">
              <j-xline-bar></j-xline-bar>
            </p>
        </Panel>
         <Panel name="13">
            列表2
            <p slot="content" style="background:#aaa">
              <j-x-list></j-x-list>
            </p>
        </Panel>
         <Panel name="14">
            序号
            <p slot="content" >
              <j-x-number></j-x-number>
            </p>
        </Panel>
         <Panel name="15">
            特殊饼图
            <p slot="content" >
              <j-x-pie></j-x-pie>
            </p>
        </Panel>
         <Panel name="16" >
            堆叠图
            <p slot="content" style="background:#ccc">
              <j-x-pile-bar></j-x-pile-bar>
            </p>
        </Panel>
         <Panel name="17" >
            表格
            <p slot="content" style="background:#001637">
              <j-tab></j-tab>
            </p>
        </Panel>
    </Collapse>
  </div>
</template>

<script>
import jBarHoriStack from './components/jBarHoriStack'
import jBasePie from './components/jBasePie'
import JColorBlock from './components/JColorBlock'
import jMultPie from './components/jMultPie'
import jMultSlider from './components/jMultSlider'
import jRateBar from './components/jRateBar'
import jSimpleList from './components/jSimpleList'
import jTab from './components/jTab'
import jTest from './components/jTest'
import jTest2 from './components/jTest2'
import jTitleLabel from './components/jTitleLabel'
import jVhTitle from './components/jVhTitle'
import jXBar from './components/jXBar'
import jXLine from './components/jXLine'
import jXlineBar from './components/jXlineBar'
import jxList from './components/jXList'
import jXNumber from './components/jXNumber'
import jXPie from './components/jXPie'
import jXPileBar from './components/jXPileBar'
export default {
  name: 'app',
  data () {
    return {
      itemDataList:[
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
      ],
      value:'1',
      msg: 'Welcome to Your Vue.js App',
      dataofcolorblock:[{
                totavaluelNum: 8, //总值
                valueNum: 4, //当前值
                titlename: '测试标题',
            }],
      datass:[{
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
                }]  
    }
  },
  components:{
    jBarHoriStack,
    jBasePie,
    JColorBlock,
    jMultPie,
    jMultSlider,
    jRateBar,
    jSimpleList,
    jTab,
    jTest,
    jTest2,
    jTitleLabel,
    jVhTitle,
    jXBar,
    jXLine,
    jXlineBar,
    jxList,
    jXNumber,
    jXPie,
    jXPileBar,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color:#001637 ;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #42b983;
}
</style>
