import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles.css'

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import { useBookStore } from "@/stores/bookStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css"
import axios from "axios";

// Import the CSS or use your own!
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash)

const app = createApp(App);
const pinia = createPinia();
const toast = useToast();

app.use(pinia);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(Toast);

const authStore = useAuthStore(pinia);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("error.response", error.response);
        if (error.response && error.response.status === 401) {
            toast.error("Your token has expired, forwarding to login page!", {
                position: "bottom-left",
                timeout: 2000,
                closeButton: 'button',
                icon: true,
            });
            setTimeout(() => {
                authStore.logout();
                router.push("/login")
            }, 2000);
        }
        return Promise.reject(error);
    }
);

const storedUser = localStorage.getItem("user");
const token = localStorage.getItem("token");

if (storedUser) {
    const userData = JSON.parse(storedUser);
    authStore.user = userData;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const bookStore = useBookStore(pinia);

bookStore.fetchBooks().then(() => {
    app.mount('#app');
});
