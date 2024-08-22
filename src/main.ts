import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.css'
import i18n from './i18n'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')