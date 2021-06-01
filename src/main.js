import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./vuex";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


const app=createApp(App)




app.config.globalProperties.$app=app


app.use(router).use(store).use(ElementPlus).mount('#app')
