import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BooksView from "@/views/BooksView.vue";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import LoginVeeView from "@/views/LoginVeeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BookDetailView from "@/views/BookDetailView.vue";


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
            path: '/books/:id',
            name: 'book-detail',
            component: BookDetailView
        },
        {
            path: '/dashboard',
            component: DashboardView,
            name: 'dashboard',
            meta: {requiresAuth: true}
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
        {
            path: '/login-vee',
            component: LoginVeeView,
            name: 'login-vee'
        },
    ],
    linkActiveClass: 'active-link'
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
    const isLoggedIn = localStorage.getItem("user");

    if (requiresAuth && !isLoggedIn) {
        next({name: 'login'});
    } else {
        next();
    }
});

export default router;