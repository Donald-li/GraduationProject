import Vue from 'vue'
import VueRouter from "vue-router";
import Nav from "../components/Nav";
import indexPage from "../components/index"
import UserInfo from "../components/UserInfo";
import Hot from "../components/Hot";
import Reply from "../components/Reply";
import Message from "../components/Message";
import Focus from "../components/UserInfoFocus";
import UserInfoDetail from "../components/UserInfoDetail";
import UserInfoArtciles from "../components/UserInfoArtciles";
import UserInfoStar from "../components/UserInfoStar";
import UserInfoFocus from "../components/UserInfoFocus"
import CreateUser from "../components/CreateUser";
import EditUser from "../components/EditUser";
import ShowArticle from "../components/ShowArticle";
import CreateArticle from "../components/CreateArticle";
import EditArticle from "../components/EditArticle";
import SearchList from "../components/SearchList";
import Active from "../components/Active";
import SectionPage from "../components/SectionPage";
import AdminMain from "../components/Admin/AdminMain";
import AdminUser from "../components/Admin/AdminUser";
import AdminRole from "../components/Admin/AdminRole";
import AdminArticle from "../components/Admin/AdminArticle";
import AdminComment from "../components/Admin/AdminComment";

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
            default:UserInfoFocus,
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
      path:'/message/:uid',
      props:true,
      name:'message',
      component:Message
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
    },
    {
      path:'/editarticle/:uid/:aid',
      props:true,
      name:'editarticle',
      component:EditArticle
    },
    {
      path:'/search/:array',
      props:true,
      name:'search',
      component:SearchList
    },
    {
      path:'/active/:id',
      props:true,
      name:'active',
      component:Active
    },
    {
      path:'/SectionPage/:sid/:sname',
      props:true,
      name:'sectionpage',
      component:SectionPage
    },
    {
      path:'/admin',
      name:'adminmain',
      components:{
        admin_view:AdminMain
      },
      children:[
        {
          path:'users',
          name:'users',
          components:{
            admin_detail:AdminUser
          }
        },
        {
          path:'roles',
          name:'roles',
          components: {
            admin_detail:AdminRole
          }
        },
        {
          path:'articles',
          name:'articles',
          components: {
            admin_detail:AdminArticle
          }
        },
        {
          path:'comments',
          name:'comments',
          components: {
            admin_detail:AdminComment
          }
        }
      ]
    }
  ]
})
