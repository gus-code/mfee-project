import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createApp } from 'vue';
import App from './app/App.vue';
import router from './app/router/router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App).use(router).use(VueSweetalert2);

app.mount('#root');
