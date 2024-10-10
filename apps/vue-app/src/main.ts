import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createApp } from 'vue';
import App from './app/App.vue';
import router from './app/router/router';

const app = createApp(App).use(router);

app.mount('#root');
