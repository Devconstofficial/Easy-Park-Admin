import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal';
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'vue-final-modal/style.css';

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

app.use(router)
app.use(createVfm());
app.mount('#app')
