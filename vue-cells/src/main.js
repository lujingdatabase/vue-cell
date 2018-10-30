import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css'; // 使用 CSS
Vue.use(iView);
new Vue({
    el: '#app',
    render: h => h(App)
})