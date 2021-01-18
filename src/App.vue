<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>

import { onMounted, reactive } from 'vue'
//import { ElMessage } from "element-plus"
import HelloWorld from './components/HelloWorld.vue'
const obj = reactive({
  name:""
})
onMounted(() => {

  // ElMessage({
  //   type:"success",
  //   message:"哈哈哈哈！"
  // })
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>