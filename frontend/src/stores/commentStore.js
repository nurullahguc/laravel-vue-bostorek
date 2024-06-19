import {defineStore} from "pinia";
import axios from "axios"

export const useCommentStore = defineStore('commentStore', {
    state: () => ({
        comments: [],
    }),
    actions: {
        async addNewComment(newComment) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/comments", newComment);
                this.comments.push(response.data.comment);
                return response.data;
            } catch (e) {
                console.error("Error at adding new comment. Err: ", e);
                if (e.response && e.response.data) {
                    throw e.response.data;
                } else {
                    throw { message: "An unexpected error occurred." };
                }
            }
        }
    }
})