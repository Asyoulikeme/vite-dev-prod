import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')

const p1 = new Promise(resolve => {
    resolve("111")
  })
  const p2 = new Promise(resolve => {
    resolve("222")
  })
  Promise.allSettled([p1,p2]).then( res => {
    console.log(res)
  })

  const obj = {
    name:"zhangsan"
  }

  const params = {
    ...obj,
    age:"22"
  }
  window.fsss = params