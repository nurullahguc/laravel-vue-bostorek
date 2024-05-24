import {defineStore} from "pinia";
import axios from "axios";
import {useToast} from "vue-toastification";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null
    }),
    getters: {
        isLoggedIn: (state) => {
            return !!state.user;
        },
    },
    actions: {
        async register(newUserData) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/register", newUserData);
                return response.data;
            } catch (error) {
                throw error.response.data;
            }
        },
        async login(userData) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/login", userData);
                this.user = response.data.user
                localStorage.setItem("user", JSON.stringify(this.user))
            } catch (error) {
                console.error("Error at register", error)
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem("user");
            const toast = useToast();
            toast.success("Logout successfully!", {
                position: "bottom-left",
                timeout: 2000,
                closeButton: 'button',
                icon: true,
            })
        }

    }
});