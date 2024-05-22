import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BooksView from "@/views/BooksView.vue";
import ContactView from "@/views/ContactView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import loginView from "@/views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomeView,
            name: 'home'
        },
        {
            path: '/books',
            component: BooksView,
            name: 'books'
        },
        {
            path: '/contact',
            component: ContactView,
            name: 'contact'
        },
        {
            path: '/register',
            component: RegisterView,
            name: 'register'
        },
        {
            path: '/login',
            component: LoginView,
            name: 'login'
        },
    ],
    linkActiveClass: 'active-link'
})

export default router;