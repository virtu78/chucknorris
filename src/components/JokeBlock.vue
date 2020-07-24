<template>
  <div class="joke-block">  
      <div v-if='isSending==false'>      
        <img class="joke-block__loader" src="../assets/images/chuck.gif" alt="loader" />
      </div>
       <div v-else>
          <p v-if='joke' class="joke-block__text">{{this.joke.value}}</p>       
          <p v-else class="joke-block__pre-text">Сlick on one of the buttons</p>     
      </div>
      
    </div>
</template>

<script>

export default {
  name: "JokeBlock",
  props: ['joke', 'isSending'],
   
    
  data: function () {
    return {
      
    }
  },
  computed:{
     
   
     
  },
 
  }

</script>

<style lang="scss" scoped>
.joke-block {
  //display: flex;
  display: block;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
  margin-bottom: auto;
  padding: 24px 12px;
  height: 160px;
  width: 100%;
  
  border: 2px solid #3aabe2;
  box-sizing: border-box;

  @media (min-width: 768px) {
    margin-bottom: 28px;
  } 
}

.joke-block__text {
  text-align: center;
  color: rgb(5, 2, 39);
}

.joke-block__pre-text {
  align-self: center;
  margin: 0 auto;
}

img.joke-block__loader {
  width: 50px;
  height: 50px;
   display: block;
    margin-left: auto;
    margin-right: auto 
 
 
}
</style>