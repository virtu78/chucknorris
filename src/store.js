import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    chucknorris:{},
    isSending:false,
    list:[],
   // updatedList:null,
  },
  plugins: [createPersistedState()],
  getters: {     
    getJoke: state => {      
      return  state.chucknorris
    },
    getList: state => {      
      return  state.list
    },
    },  
  mutations: {
    SET_CHUCK_NORRIS: (state, chucknorris) => {
      state.chucknorris = chucknorris;
    },
    SET_IS_SENDING: (state, isSending) => {
      state.isSending = isSending;
    },
    SET_LIST: (state, list) => {
      state.list = list;
    },
    //SET_UPDATED_LIST: (state, updatedList) => {
    //  state.updatedList = updatedList;
  //}, 
}, 
  actions: {  
    initChuckNorris : function ({commit}){     
      axios.get('https://api.chucknorris.io/jokes/random')
      .then((response) => {
       //console.log(response, this)        
        commit('SET_CHUCK_NORRIS', response.data)        
      }).catch(error => {
        console.log(error);
      })
    },

    




  },




    
  

  
   

})






