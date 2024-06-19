import {defineStore} from "pinia";
import axios from "axios"

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        books: [],
        isLoading: false,
        userUploadedBooks: [],
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
        },

        async fetchBooksByUploader() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/books/uploader");
                this.userUploadedBooks = response.data.books;
            } catch (e) {
                console.log("error at fetching user books", e);
                throw e;
            }
        },
        async addNewBook(newBook) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/books", newBook);
                return response;
            } catch (e) {
                throw e;
            }
        },
        async editTheBook(bookId, bookData) {
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/books/${bookId}`, bookData);
                const updatedBookData = response.data.book;
                const bookIndex = this.books.findIndex((book => book.id = bookId));
                if (bookIndex !== -1)
                    this.books.splice(bookIndex, 1, updatedBookData);

                return response;
            } catch (e) {
                throw e;
            }
        },
        async deleteTheBook(bookId) {
            this.isLoading = true;
            try {
                await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}`);
                this.books = this.books.filter((book) => book.id !== bookId);
            } catch (e) {
                throw e;
            }
        }
    }
})