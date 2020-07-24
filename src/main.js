import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import Vuex from 'vuex';
import { store } from './store.js';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faHeart,


} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import './registerServiceWorker';
Vue.use(Vuex);

let app = '';
library.add({
  faAngleLeft,
  faHeart,
  

});
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;



  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app');
  }






