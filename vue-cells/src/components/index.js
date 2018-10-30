/*
 * @Author: lujing 
 * @Date: 2018-09-17 17:57:47 
 * @Last Modified by: lujing
 * @Last Modified time: 2018-10-30 17:48:29
 * @Desc:所有的组件都以j开头，区分其他的组件  
 */

import jTest from './jTest.vue'
import jTest2 from './jTest2.vue'
import jMultSlider from './jMultSlider.vue'
import jColorBlock from './jColorBlock.vue'

import jBarHoriStack from './jBarHoriStack'
import jBasePie from './jBasePie'
import jMultPie from './jMultPie'
import jRateBar from './jRateBar'
import jSimpleList from './jSimpleList'
import jTitleLabel from './jTitleLabel'
import jVhTitle from './jVhTitle'
import jXBar from './jXBar'
import jXLine from './jXLine'
import jXlineBar from './jXlineBar'
import jXList from './jXList'
import jXNumber from './jXNumber'
import jXPie from './jXPie'
import jXPileBar from './jXPileBar'
import jTab from './jTab'




// 所有的组件
const vueCellSViews = {
        jTest,
        jTest2,
        jMultSlider,
        jColorBlock,
        jBarHoriStack,
        jBasePie,
        jMultPie,
        jRateBar,
        jSimpleList,
        jTitleLabel,
        jVhTitle,
        jXBar,
        jXLine,
        jXlineBar,
        jXList,
        jXNumber,
        jXPie,
        jXPileBar,
        jTab
    }
    // 遍历挂载组件
function install(Vue, _) {
    Object.keys(vueCellSViews).forEach(key => {
        Vue.component(key, vueCellSViews[key]);
    });
}

// 
const API = {
    // version: process.env.VERSION,
    install
    // ...vueCellSViews
}


// 导出模块
export default API
// module.exports.default = module.exports = API;