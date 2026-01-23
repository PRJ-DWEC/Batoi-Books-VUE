import { createApp } from 'vue'
import { createPinia } from 'pinia' //
import App from './App.vue'
import router from './router/index.js'
import './assets/style.css'

const app = createApp(App)

app.use(createPinia()) // Inicializamos Pinia
app.use(router)

app.mount('#app')