import Vue from 'vue'
import VueRouter from "vue-router";
import Nav from "../components/Nav";
import indexPage from "../components/index"
import UserInfo from "../components/UserInfo";
import MessagePage from "../components/MessagePage";
import Hot from "../components/Hot";
import Reply from "../components/Reply";
import Collect from "../components/Collect";
import Focus from "../components/Focus";

//安装路由
Vue.use(VueRouter);

//配置导出路由
export default new VueRouter({
  routes:[
    {
      //默认首页设置
      path:'*',
      redirect:'/index'
    },
    {
      path:'/Nav',
      name:'Nav',
      component:Nav
    },
    {
      path:'/index',
      name:'index',
      component:indexPage
    },
    {
      path:'/userInfo',
      name:'userinfo',
      component:UserInfo
    },
    {
      path:'/messagePage',
      name:'messagepage',
      component:MessagePage
    },
    {
      path:'/hot',
      name:'hot',
      component:Hot
    },
    {
      path:'/reply',
      name:'reply',
      component:Reply
    },
    {
      path:'/collect',
      name:'collect',
      component:Collect
    },
    {
      path:'/focus',
      name:'focus',
      component:Focus
    }
  ]
})
