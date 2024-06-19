import {defineStore} from "pinia";
import axios from "axios"

export const useCommentStore = defineStore('commentStore', {
    state: () => ({
        comments: [],
        commentsForBook: [],
        commentsByUser: [],
    }),
    actions: {
        async fetchComments() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/comments");
                console.log(response.data.comments);
                this.comments = response.data.comments;
            } catch (e) {
                console.error("Error at fetching comments. Err: ", e)
            }
        },
        async addNewComment(newComment) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/comments", newComment);
                this.fetchComments();
                return response.data;
            } catch (e) {
                console.error("Error at adding new comment. Err: ", e);
                if (e.response && e.response.data) {
                    throw e.response.data;
                } else {
                    throw {message: "An unexpected error occurred."};
                }
            }
        },
        async fetchCommentsForBook(bookId) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/comments-for-book/${bookId}`);
                this.commentsForBook = response.data.comments;
            } catch (e) {
                console.log("error at fetching comments for book", e);
            }
        },
        async fetchCommentsByUser() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/comments-for-user/`);
                this.commentsByUser = response.data.comments;
            } catch (e) {
                console.log("error at fetching comments for book", e);
            }
        },
    }
})