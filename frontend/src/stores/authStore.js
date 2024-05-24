import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null
    }),
    getters: {},
    actions: {
        async register(newUserData) {
            try {
                console.log("user data from store", newUserData)
                const response = await axios.post("http://127.0.0.1:8000/api/register", newUserData);
                console.log(response)
            } catch (error) {
                console.error("Error at register", error)
            }
        }
    }
});