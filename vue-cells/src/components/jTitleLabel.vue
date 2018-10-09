/*
 * @Author: lujing 
 * @Date: 2018-09-25 15:32:44 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-09-25 16:28:09
 * @Desc:  标题组件
 */
 <template>
    <div :style='container'>
        <div style="text-align:left;padding-bottom:5px">
            <span :style='titleStyCN'>{{titleNameCN}}</span>
            <span :style='titleStyEN'>{{titleNameEN}}</span>
        </div>
        <div :style='underLineSty'>
            <div :style="startLine"></div>
            <div :style='longLine'></div>
            <div :style='endLine'></div>
        </div>

    </div>
</template>
 <script>
export default {
  props: {
    widthOfStartLine:{type:[String,Number],default:70},
    startLineColor:{type:String,default:'#FF8A00'},
    width: { type: [String, Number], default: 300 },
    height: { type: [String, Number], default: 300 },
    // 中文标题样式
    titleNameCN: { type:  String , default: "前海简介" },
    titleColorCN:{type:String,default:'#fff'},
    titleSizeCN:{type:Number,default:20},
    // 英文标题样式
    titleNameEN: { type:  String , default: "Introduction" },
    titleColorEN:{type:String,default:'#CFCFCF'},
    titleSizeEN:{type:Number,default:12},
  },
  data() {
    return {};
  },
  computed: {
    container() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    underLineSty() {
      return {
        display:'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        position:'relative'
      };
    },
    longLine(){
       return {
            width: `${this.width}px`,
            borderTop: "1px solid #005CD9"
       }
    },
    // 粗线条样式
    startLine(){
       return {
            width:`${this.widthOfStartLine}px`,
            borderTop:`4px solid ${this.startLineColor}`,
            // position:'relative',
            // top:'-2.5px'
       }
    },
    // 点的样式
    endLine(){
      return {
            width:`5px`,
            height:'5px',
            borderRadius:'4px',
            // position:'absolute',
            background:`${this.startLineColor}`,
            // right:'0px',
            // top:'-3px'
      }
    },
    // 中文标题样式
    titleStyCN(){
        return {
            fontSize:`${this.titleSizeCN}px`,
            color:`${this.titleColorCN}`,
            fontWeight:'bold',
            textShadow: '0 0 20px #0068E7'
        }
    },
    //英文标题样式
     titleStyEN(){
         return{
             fontSize:`${this.titleSizeEN}px`,
             color:`${this.titleColorEN}`
         }

     }

  }
};
</script>
<style>
</style>
