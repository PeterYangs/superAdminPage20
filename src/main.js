import {createApp} from 'vue'
import HighchartsVue from 'highcharts-vue'
import App from './App.vue'
import router from './router'
import store from "./vuex";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import common from "./common";

const app = createApp(App)


app.config.globalProperties.$app = app


common(app, store)


app.use(router).use(store).use(HighchartsVue).use(ElementPlus).mount('#app')
