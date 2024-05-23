import {defineStore} from "pinia";
import axios from "axios"

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        books: [],
        isLoading: false,
    }),
    getters: {
        selectedBook: (state) => {
            return (id) => state.books.find((book) => book.id == id)
        }
    },
    actions: {
        async fetchBooks() {
            this.isLoading = true;
            try {
                await new Promise((resolve) => setTimeout(resolve, 15));
                const response = await axios.get("http://127.0.0.1:8000/api/books");
                this.books = response.data.books;
            } catch (e) {
                console.error("Error at fetching books. Err: ", e)
            } finally {
                this.isLoading = false;
            }
        }
    }
})