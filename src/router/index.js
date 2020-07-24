import Vue from "vue";
import Vuex from 'vuex'
import Router from 'vue-router'
import Main from "../views/Main";
import List from "../views/List";

Vue.use(Vuex)
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
  {
    path: "/",
    name: "Main",
    component: Main,
    props: true,   
  },  
  {
    path: "/list",
    name: "List",
    component: List,
    props: true,   
  },  
  {
    path: '*',
    redirect:"/"
  }
]
})



