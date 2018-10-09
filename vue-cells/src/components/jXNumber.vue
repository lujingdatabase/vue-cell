/*
 * @Author: lujing 
 * @Date: 2018-09-26 14:11:47 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-28 16:24:01
 * @Desc:  序号组件
 */
 <template>
    <div style="margin:10px">
        <div :style="borderStyls" class="borderstyl">
            <span :style="textStyles" class="textstyl">{{indexNum}}</span>
        </div>
    </div>
</template>
 <script>
export default {
  props: {
    indexNum: { type: Number, default: 2 },
    // deepColor: { type: String, default: "#B04C38" },
    // easyColor: { type: String, default: "#FDC904" },
    // middleColor: { type: String, default: "#E88525" }
    deepColor: { type: String, default: "#00F4FF" },
    easyColor: { type: String, default: "#00B8FF" },
    middleColor: { type: String, default: "#00D9FF" }
  },
  computed: {
    borderStyls() {
      return {
        borderImage: `-webkit-linear-gradient( top, ${this.easyColor} 0%, ${this.deepColor} 90%)`,
        borderImageSlice: "10%",
        boxShadow: `0 0 15px ${this.middleColor}`,
        background: `-webkit-linear-gradient(top, ${this.easyColor}aa 0%, ${this.deepColor}00 90%)`,
      };
    },
    textStyles(){
        return{
        background: `-webkit-linear-gradient( top, ${this.easyColor} 0%, ${this.deepColor} 90%)`,
        webkitBackgroundClip:'text',
        webkitTextFillColor: 'transparent',
        }
    }
  }
};
</script>
<style>
.borderstyl {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid;
  /* border-image: -webkit-linear-gradient(top, #fdc904 0%, #b04c38 90%);
  border-image-slice: 10%;
  box-shadow: 0 0 15px #e88525; */
 
}

.textstyl {
    /* background: -webkit-linear-gradient(top, #fdc904 0%, #b04c38 90%); */
  margin-top: -2px;
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  font-weight: 1000;
  font-size: 15px;
}
</style>
