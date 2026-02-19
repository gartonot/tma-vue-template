import './assets/styles/index.css';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import WebApp from '@twa-dev/sdk';

const app = createApp(App)

app.use(router)

if (WebApp.platform === 'ios') {
  document.documentElement.style.setProperty('--tg-top-offset', '56px');
}

app.mount('#app')
