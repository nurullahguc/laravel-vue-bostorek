import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles.css'

import {createApp} from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import {createPinia} from "pinia";
import {useBookStore} from "@/stores/bookStore.js";

// Font Awsome
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";

library.add(faArrowLeft, faThumbsUp)


const pinia = createPinia();
const bookStore = useBookStore(pinia);

bookStore.fetchBooks().then(() => {

    const app = createApp(App);
    app.use(pinia)
        .use(router)
        .component('font-awesome-icon', FontAwesomeIcon)
        .mount('#app');

})
