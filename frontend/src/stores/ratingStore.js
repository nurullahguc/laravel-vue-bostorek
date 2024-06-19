import {defineStore} from "pinia";
import axios from "axios"

export const useRatingStore = defineStore('ratingStore', {
    state: () => ({
        ratings: [],
        ratingsForBook: [],
    }),
    actions: {
        async addNewRate(newRate) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/ratings", newRate);
                this.ratings.push(response.data.rating);
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
        async fetchRatingForBook(bookId) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ratings-for-book/${bookId}`);
                this.ratingsForBook = response.data.ratings;
            } catch (e) {
                console.log("error at fetching comments for book", e);
            }
        },
    }
})