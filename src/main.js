import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "./router";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)

Vue.use(ElementUI);
Vue.use(router);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
