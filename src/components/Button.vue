<template>
  <button class='button'></button>
</template>

<script>


export default {
  name: "Button",
  props: {    
  },
  data: function () {
    return {    
     
    }
  },
  methods: {    
  },
  computed:{ 
   
  },

  
};
</script>

<style lang='scss' scoped>
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