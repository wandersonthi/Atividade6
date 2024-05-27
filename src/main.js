
import { createApp } from 'vue';


import App from './App.vue';


import router from './router';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperclip, faTrash } from '@fortawesome/free-solid-svg-icons';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


library.add(faPaperclip, faTrash);


createApp(App)
  .use(router)
  .use(VueSweetalert2)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
