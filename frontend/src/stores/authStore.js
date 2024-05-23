import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null
    }),
    getters: {},
    actions: {
        async get_csrf() {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            const response = await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
            console.log(response)
        },
        async register(newUserData) {

            await this.get_csrf()

            try {
                console.log("user data from store", newUserData)
                axios.defaults.withCredentials = true;
                axios.defaults.withXSRFToken = true;
                const response = await axios.post("http://127.0.0.1:8000/register", newUserData);
                console.log(response)
            } catch (error) {
                console.error("Error at getting user", error)
            }
        }
    }
});