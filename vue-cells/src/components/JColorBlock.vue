/*
 * @Author: lujing 
 * @Date: 2018-07-04 09:07:29 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-19 13:48:52
 * @Desc:  色块图
 */
 <template>
    <section class='wrappers' :style="container">
        <div :style='itemBlock' v-for='(item,index) in blockNum'></div>
        <div class='datashow'>
            <span :style='titlesty' class='titlename'>{{titlename}}</span>
            <span :style='mycolor' class='titleval'>{{valueNum}}</span>
        </div>
    </section>
</template>
 <script>
// import { getApiSource } from "../../../../utils/getApiData";
export default {
  props: {
    //标题样式
    titleColor: { type: String, default: "#fff" },
    titleSize: { type: [Number, String], default: 20 },
    titleFamily: { type: [String, Number], default: "" },
    titleWeight: { type: [String], default: "normal" },
    //字体样式
    txtColor: { type: String, default: "#0ff" },
    txtSize: { type: [Number, String], default: 30 },
    txtFamily: { type: [String, Number], default: "AgencyFBBold" },
    txtWeight: { type: [String], default: "normal" },

    width: { type: [String, Number] },
    height: { type: [String, Number] },
    totalNum: { type: [String, Number] }, //总色块数据
    currcolor: { type: [String], default: "#0ff" },
    shadowSize:{type:[Number],default:6},
    dataType: { type: String, default: "Static" },
    apiUrl: { type: String },
    staticData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      totavaluelNum: 0, //总值
      valueNum: 0, //当前值
      titlename: "暂无"
    };
  },
  computed: {
    titlesty() {
      return {
        color: `${this.titleColor}`,
        fontSize: `${this.titleSize}px`,
        fontWeight: `${this.titleWeight}`,
        fontFamily: `${this.titleFamily}`
      };
    },
    mycolor() {
      return {
        color: `${this.txtColor}`,
        fontSize: `${this.txtSize}px`,
        fontWeight: `${this.txtWeight}`,
        fontFamily: `${this.txtFamily}`
      };
    },
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    blockNum() {
      //因为总色块个数是250，表示的值为8
      let totalnum = Math.ceil(
        this.valueNum * (this.totalNum / this.totavaluelNum)
      );

      let arrNum = [];
      for (let i = 0; i < totalnum; i++) {
        arrNum.push(i);
      }
      return arrNum;
    },
    //某一个色块的演示
    itemBlock() {
      return {
        width: `${this.width / 25}px`,
        height: `${this.width / 25}px`,
        float: "left",
        // background:this.currcolor,
        border: "1px solid #0b0d35",
        boxShadow: `inset 0px 0px ${this.shadowSize}px ${this.currcolor}`
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
     getData() {
    //   let dataJson = await getApiSource(
    //     this.dataType,
    //     this.apiUrl,
    //     this.staticData
    //   );
      //   console.log("dataJson----", dataJson);
      this.totavaluelNum =  this.staticData[0].totavaluelNum;
      this.valueNum = this.staticData[0].valueNum;
      this.titlename = this.staticData[0].titlename;
    }
  }
};
</script>
<style scoped lang="less">
.wrappers {
  position: relative;

  .datashow {
    position: absolute;
    bottom: -15px;
    right: 0;

    .titlename {
      //   color: #ffffff;
      //   font-size: 18px;
    }

    .titleval {
      font-size: 32px;
      margin-left: 20px;
      font-family: AgencyFBBold;
    }
  }
}
</style>