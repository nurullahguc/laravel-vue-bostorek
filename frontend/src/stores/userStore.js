import {defineStore} from "pinia";
import axios from "axios"

export const useUserStore = defineStore('userStore', {
    actions: {
        async updateUserDetails(updatedUserData) {
            try {
                const response = await axios.put("http://127.0.0.1:8000/api/user/update-user", updatedUserData);
                return response.data;
            } catch (e) {
                console.error("Error at updating user details. Err: ", e)
                throw e.response.data;
            }
        }
    }
})