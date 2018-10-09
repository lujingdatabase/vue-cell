/*
 * @Author: lujing 
 * @Date: 2018-09-26 13:51:51 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-10-08 11:43:41
 * @Desc:  列表组件
 */
 <template>
    <div :style="container">
        <div :style="itemstyl" style='display:flex' v-for='(item,index) in dataList'>
            <x-number :deepColor='deepColor(index)' :easyColor='easyColor(index)' :middleColor='middleColor(index)' :indexNum='index+1'></x-number>
            <div style='width:95%;margin-left:10px'>
                <div class='titleStyl'>
                    {{item.titlename}}
                </div>
                <div style='display:flex;align-items: center;position:relative'>
                    <div class="comfromstyl">{{item.comefrom}}</div>
                    <span style='font-size:13px;margin-left:20px;color:#A4CCF6'>{{item.dataTime}}</span>
                    <span style="font-size:13px;position:absolute;right:0;color:#0CD081" v-if='item.sameArticleNum&&item.sameArticleNum!=0'>相似文章{{item.sameArticleNum}}条</span>
                </div>
            </div>
        </div>
    </div>
</template>
 <script>
import xNumber from "./jXNumber";
export default {
  props: {
    width: { type: Number, default: 450 },
    height: { type: Number, default: 300 },
    dataList: {
      type: Array,
      default: () => {
        return [
          {
            titlename: "陕西自贸区总体方案即将皮肤自贸区有啥新看点",
            dataTime: "09-15 20:10",
            comefrom: "西部之声",
            sameArticleNum: "2"
          },
          {
            titlename:
              "特写：学习“时代楷模” 海口母舰精神 加快南海建设的进度速度快撒两地分居带了饭加快南海建设的进度速度快撒两地分居带了饭",
            dataTime: "09-15 20:10",
            comefrom: "今日头条",
            sameArticleNum: "0"
          },
          {
            titlename: "海南加快整合港口资源建设自贸区（港）对外优惠政策",
            dataTime: "09-15 20:10",
            comefrom: "寒风网",
            sameArticleNum: "0"
          },
          {
            titlename: "特写：学习“时代楷模” 海口母舰精神 加快南海建设的进度",
            dataTime: "09-15 20:10",
            comefrom: "寒风网",
            sameArticleNum: "2"
          },
          {
            titlename: "特写：学习“时代楷模” 海口母舰精神 加快南海建设的进度",
            dataTime: "09-15 20:10",
            comefrom: "今日头条",
            sameArticleNum: "0"
          }
        ];
      }
    }
  },
  components: {
    xNumber
  },
  data() {
    return {};
  },
  computed: {
    itemstyl() {
      return {
        width: `${this.width}px`,
        height: `${this.height / this.dataList.length}px`
      };
    },
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  mounted() {},
  methods: {
    deepColor(index) {
      let tempColor = "";
      switch (index) {
        case 0:
          tempColor = "#B04C38";
          break;
        case 1:
          tempColor = "#0EE085";
          break;
        case 2:
          tempColor = "#00F4FF";
          break;

        default:
          tempColor = "#0DC8FC";
          break;
      }
      return tempColor;
    },
    easyColor(index) {
      let tempColor = "";
      switch (index) {
        case 0:
          tempColor = "#FDC904";
          break;
        case 1:
          tempColor = "#03B065";
          break;
        case 2:
          tempColor = "#00B8FF";
          break;

        default:
          tempColor = "#014BC8";
          break;
      }
      return tempColor;
    },
    middleColor(index) {
      let tempColor = "";
      switch (index) {
        case 0:
          tempColor = "#E88525";
          break;
        case 1:
          tempColor = "#07C472";
          break;
        case 2:
          tempColor = "#00D9FF";
          break;

        default:
          tempColor = "#0788E0";
          break;
      }
      return tempColor;
    }
  }
};
</script>
<style>
.comfromstyl {
  border: 1px solid #0059d3;
  background: #0059d344;
  /* padding: 5px 10px; */
  width: 75px;
  color: white;
  font-size: 13px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
.titleStyl {
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  margin-bottom: 6px;
  font-size: 16px;
}
</style>
