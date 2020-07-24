<template> 
  <div class="App">
    <div class="main">
      <div class="App__header">
        <h1 class="App__title">Chuck's joke</h1>
        <router-link :to= '{ name : "List"}'  >
          <font-awesome-icon class="nav__element nav__element--favorite" icon="heart" />
        </router-link>
      </div>
      <JokeBlock :joke='joke' :isSending='isSending' />
      <Button class="button main__button"  @click="getJoke" >
        get joke
      </Button>
      <Button class="button  main__button" @click='handleContinuousGeneration'>
      {{this.generationTimerId ? "stop" : "jokes without stopping"}}
      </Button>
      <Button
        class="button  main__button"
        :disabled="!joke"        
        @click='handleDeleteOrAdd'
      >
      {{isFavoritJoke(this.joke, this.list) ? "delete from Favorite" : "add to Favorite"}}
      </Button>
    </div>
    </div> 
</template>
<script>
import JokeBlock from "../components/JokeBlock";
//import Button from "../components/Button";
import Vuex from 'vuex';
import { mapState} from 'vuex';

export default {
  name: "Main",
  components: {
    //Button,
    JokeBlock,  
  },
    props: {} ,  
  data: function () {
    return {
    
   // isSending: true,
    generationTimerId: null,
    received:true,
    upList:null,
    }
  },
  methods: {
    setIsSendingFalse(){
    this.received=false 
      this.$store.commit('SET_IS_SENDING', this.received)
   },
     setIsSendingTrue(){
    this.received=true 
      this.$store.commit('SET_IS_SENDING', this.received)
   },
   getResponse(){
     this.$store.dispatch('initChuckNorris')
     console.log(this.joke.value)
   },
    getJoke(){
      setTimeout(this.setIsSendingFalse, 100);    
      setTimeout(this.getResponse, 1500);      
      setTimeout(this.setIsSendingTrue, 2000);

    },
    handleDeleteOrAdd(){
      this.isFavoritJoke() ? this.removeJoke() : this.addJoke()
      
  },
    handleContinuousGeneration(){
      this.generationTimerId ? this.stopGenerationJokes() : this.continuousGenerationJokes()
   
  },
    isFavoritJoke(){
      if ( this.joke) {
        const currentJoke = this.list.find(item => item.id ===  this.joke.id);
        return !!currentJoke;
      }
      return false;
    },
    addJoke(){
      if ( this.joke && ! this.joke.isFavorite) {
         this.joke.isFavorite = true;
        if (this.list.length >= 10) {
          this.list.splice(0, 1);
        }
        this.list.push( this.joke); 
        this.$store.commit('SET_LIST',  this.list)        
        this.saveListInLS();  
         
      }
    },   
 removeJoke(id){
     if (this.joke &&  this.joke.id === id) {
      this.joke.isFavorite = false;
     }    
      this.upList = this.list.filter(item => item.id !== id);
      this.$store.commit('SET_IS_SENDING', this.received)
      this.$store.commit('SET_LIST',  this.upList) 
      //this.$store.commit('SET_UPDATED_LIST',  this.upList)
      this.saveListInLS(this.upList);   
    }, 
    
     saveListInLS(){
      localStorage.setItem("listJokes", JSON.stringify(this.list));
    },
    continuousGenerationJokes(){
    
    
    this.generationTimerId=setInterval(this.getJoke, 3000);
    
    },
    stopGenerationJokes(){
      clearInterval(this.generationTimerId);
      this.generationTimerId=null;    
    },
  },
  computed:{
 ...mapState({  
    list: state => state.list,
    
    isSending: state => state.isSending,
  }),
    joke(){      
      return this.$store.getters.getJoke
    },
    list(){      
      return this.$store.getters.getList
    },
  },
     mounted: function(){
        if (localStorage.getItem('listJokes')) {
      try {
        this.list = JSON.parse(localStorage.getItem('listJokes'));
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
.App__title{
   margin: 0;
  margin-right: auto;
  text-align: center;
  color: #3aabe2;
}
.main {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
}

.main__button:not(:last-child) {
   
  margin-bottom: 10px;
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


.App__header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}




.nav {
  display: flex;
}

.nav__element {
  position: absolute;
  display: flex;
  color: #ff5a24;
  right:100px;
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
</style>
