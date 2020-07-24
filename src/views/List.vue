<template> 
  <div class='App'>
    <div   class="wrapper">
      <div class=".App__header"> 
        <h1 class="App__title">Chuck's joke</h1> 
        <router-link :to= '{ name : "Main"}'  >
          <font-awesome-icon class="nav__element nav__element--arrow" icon="angle-left" />
        </router-link>
        </div>
      <div v-if='list.length>0' >            
          <ul  v-for="(item, index) in  list" :key='index' class="list">           
                <li class="list__item" :key='item.id'>
                  <span classe="list__item-text">{{item.value}}</span>
                  <button
                    :data-id='item.id'
                    @click='handleRemoveJoke'
                    class="list__item-btn"
                  >
                    del
                  </button>
                </li>              
          </ul>
          <button class="button" @click='clearAllJokes'>clear all</button>
          </div>    
          <p v-else class="placeholder-text">
          You don’t have any favorite jokes yet, but you can add them
         </p>     
    </div>
    </div> 
</template>
<script>
//import Button from "../components/Button";
import Vuex from 'vuex';
import { mapState} from 'vuex';

export default {
  name: "List",
  components: {
    //Button
    
  },
  props: {},  
  data: function () {
    return {
      jokeId:null,
      updatedList:null,
    }
  },
  methods: {
    handleRemoveJoke(event){     
      this.jokeId = event.target.getAttribute("data-id");
      //console.log(this.jokeId)
      this.removeJoke(this.jokeId);
    },
    removeJoke(id){
     if (this.joke &&  this.joke.id === id) {
      this.joke.isFavorite = false;
     }    
      this.updatedList = this.list.filter(item => item.id !== id);
      //console.log(this.updatedList)
      this.$store.commit('SET_LIST',  this.updatedList)
      this.saveListInLS(this.updatedList);   
    }, 

    clearAllJokes(){
      if (this.joke &&  this.joke.isFavorite) {
        this.joke.isFavorite = false;
        this.list.splice(0,this.list.length);
      //console.log(this.list)
        this.$store.commit('SET_CHUCK_NORRIS',  this.list)       
      } 
      this.saveListInLS();  
    },  
   
  
    saveListInLS(){
      localStorage.removeItem("listJokes", JSON.stringify(this.list));
    }
  },
  computed:{
    ...mapState({  
    chucknorris: state => state.chucknorris,
    list: state => state.list,   
    
  }),
    joke(){      
      return this.$store.getters.getJoke
    },   
  },
  mounted:function() { 
    if (localStorage.getItem('listJokes')) {
      try {
        this.list = JSON.parse(localStorage.removeItem('listJokes'));
      } catch(e) {
        localStorage.removeItem('listJokes');
      }
    }
  },
  created: function() {    
    this.$store.dispatch('initChuckNorris')    
  },  
  };
</script>
<style lang="scss" scoped>
.App {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  padding: 10px 16px 32px;
  box-sizing: border-box;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  color: #333;
  @media (min-width: 768px) {
    width: 600px;
  }
  @media (min-width: 1024px) {
    width: 900px;
  } 
}
.App__header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.App__title {
  margin: 0;
  margin-right: auto;
  text-align: center;
  color: #3aabe2;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.list {
  display: flex;
  flex-direction: column;
  padding-left: 0;  
  list-style: none;
  @media (min-width: 768px) {
    margin-left: -10px;
    margin-right: -10px;
    flex-direction: row;
    flex-wrap: wrap
  } 
}
.list__item {  
  overflow: hidden;
  display: flex;  
  margin-bottom: 20px;
  min-height: 30px;  
  border: 2px solid #ff5a24;
  &:hover &-btn {
  transform: translate(0);
  }
  @media (min-width: 768px) {
    flex: 1 0 30%;
    margin: 10px;
  } 
}
.list__item-text {
  margin-right: auto;
  padding: 8px;
  text-align: left;
}
.list__item-btn {  
  display: block; /* смещает только блоки */ 
  margin-left: auto;
  right:20%;
  border: none;
  background-color: #3aabe2;
  color: #fff;
  cursor: pointer;
  @media (min-width: 768px) {
    transition: transform ease-out .2s;
    transform: translate(100%);
  } 
}
.placeholder-text {
  text-align: left;
}
.header { 
  box-sizing: border-box;
  &__options {
    display: flex;
    align-items: center;
  }
}


.nav {
  display: flex;
}

.nav__element {
  position: absolute;
  display: flex;
  color: #ff5a24;
  right:8%;
  top:4%;
 
  &--favorite {
    animation: heartbeat 1s;
  }

  &--arrow {
    animation: trambling-animation 1s;
  }
}

@keyframes heartbeat {
  0%
  {
    transform: scale(1);
  }
  20%
  {
    transform: scale(1.25);
  }
    40%
  {
    transform: scale(1.5);
  }
}

@keyframes trambling-animation {
  0%, 50%, 100% {
      transform: rotate(0deg);
  }
  10%, 30% {
      transform: rotate(-10deg);
  }
  20%, 40% {
      transform: rotate(10deg);
  }
}
.button {
  padding: 10px 20px;
  border: 2px solid #ff5a24;
  background-color: #ff5a24;
  color: #fff;
  
  font-size: 16px;
  line-height: 1;
  cursor: pointer;

  transition: color ease-in-out 0.3s, background-color ease-in-out 0.3s;

  &:disabled {
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    &:hover {
      color: #ff5a24;
      background-color: #fff;
      outline: none;
    }
  } 
}
</style>
