<template>
  
  <button :class="buttonClass">{{ text }}</button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    text: String, 
    type: {
      type: String,
      default: '0'
    }
  },
  computed: {
    buttonClass() {
     
      return this.type == 0 ? 'blue-button' : 'red-button';
    }
  }
};
</script>

<style scoped>
button {
  border-radius: 20px; 
}

.blue-button {
  border: none;
  background-color: rgb(18, 149, 253); 
  color: white; 
}

.blue-button:hover {
  background-color: rgb(14, 120, 207); 
}

.red-button {
  border: none;
  background-color: rgb(249, 115, 95); 
  color: white; 
}

.red-button:hover {
  background-color: rgb(190, 88, 73); 
}
</style>
