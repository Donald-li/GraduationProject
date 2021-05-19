import Vue from 'vue'
import VueRouter from "vue-router";
import Nav from "../components/Nav";
import indexPage from "../components/index"
import UserInfo from "../components/UserInfo";
import MessagePage from "../components/MessagePage";
import Hot from "../components/Hot";
import Reply from "../components/Reply";
import Collect from "../components/Collect";
import Focus from "../components/UserInfoFocus";
import UserInfoDetail from "../components/UserInfoDetail";
import UserInfoArtciles from "../components/UserInfoArtciles";
import UserInfoStar from "../components/UserInfoStar";
import UserInfoFocus from "../components/UserInfoFocus"
import CreateUser from "../components/CreateUser";
import EditUser from "../components/EditUser";
import ShowArticle from "../components/ShowArticle";
import CreateArticle from "../components/CreateArticle";

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
      path:'/userInfo/:id',
      name:'userinfo',
      props:true,
      component:UserInfo,
      children:[
        {
          path: 'detail/:userid',
          props: {UserInfoDetail:true},
          name: "userinfodetail",
          components: {
            UserInfoDetail: UserInfoDetail
          }
        },
        {
          path: 'articles/:userid',
          props: {UserInfoDetail:true},
          name: "userinfoarticles",
          components: {
            UserInfoDetail: UserInfoArtciles
          }
        },
        {
          path: 'focus/:userid',
          props: {UserInfoDetail:true},
          name: "userinfostars",
          components: {
            UserInfoDetail: UserInfoFocus
          }
        },
        {
          path: 'stars/:userid',
          props: {UserInfoDetail:true},
          name: "userinfostars",
          components: {
            UserInfoDetail: UserInfoStar
          }
        }
      ]
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
    },
    {
      path:'/createuser',
      name:'createuseer',
      component:CreateUser
    },
    {
      path:'/edituser/:userid',
      props:true,
      name:'edituser',
      component:EditUser
    },
    {
      path:'/showartilce/:aid',
      props:true,
      name:'showarticle',
      component:ShowArticle
    },
    {
      path:'/createarticle/:id',
      props:true,
      name:'createarticle',
      component:CreateArticle
    }
  ]
})
