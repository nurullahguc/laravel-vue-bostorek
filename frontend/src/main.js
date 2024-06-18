import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles.css'

import {createApp} from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import {createPinia} from "pinia";
import {useBookStore} from "@/stores/bookStore.js";
import {useAuthStore} from "@/stores/authStore.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"
import axios from "axios";


// Import the CSS or use your own!
// Font Awsome
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";

library.add(faArrowLeft, faThumbsUp)


const pinia = createPinia();

const storedUser = localStorage.getItem("user")
const token = localStorage.getItem("token")

if (storedUser) {
    const userData = JSON.parse(storedUser);
    const authStore = useAuthStore(pinia);
    authStore.user = userData;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const bookStore = useBookStore(pinia);

bookStore.fetchBooks().then(() => {

    const app = createApp(App);
    app.use(pinia)
        .use(router)
        .component('font-awesome-icon', FontAwesomeIcon)
        .use(Toast)
        .mount('#app');

})
