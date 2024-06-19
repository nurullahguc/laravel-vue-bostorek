import {defineStore} from "pinia";
import axios from "axios"
import {useRatingStore} from "@/stores/ratingStore.js";


export const useBookStore = defineStore('bookStore', {
    state: () => ({
        books: [],
        isLoading: false,
        userUploadedBooks: [],
    }),
    getters: {
        selectedBook: (state) => {
            return (id) => state.books.find((book) => book.id == id)
        },
        latest4Books: (state) => {
            return state.books.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4);
        },
        rated4Books: (state) => {
            const sortedBooks = [...state.books].sort((a, b) => {
                const averageRatingA = a.ratings.reduce((sum, rating) => sum + rating.rate, 0) / (a.ratings.length || 1);
                const averageRatingB = b.ratings.reduce((sum, rating) => sum + rating.rate, 0) / (b.ratings.length || 1);

                return averageRatingB - averageRatingA;
            });

            return sortedBooks.slice(0, 4);
        }

    },
    actions: {
        async fetchBooks() {
            this.isLoading = true;
            try {
                await new Promise((resolve) => setTimeout(resolve, 15));
                const response = await axios.get("http://127.0.0.1:8000/api/books");
                this.books = response.data.books;

                // await this.fetchRatingsForBooks();
            } catch (e) {
                console.error("Error at fetching books. Err: ", e)
            } finally {
                this.isLoading = false;
            }
        },

        // async fetchRatingsForBooks() {
        //     const ratingStore = useRatingStore();
        //
        //     await Promise.all(
        //         this.books.map(async (book) => {
        //           try {
        //               await ratingStore.fetchRatingForBook(book.id);
        //
        //               book.ratings = ratingStore.ratingsForBook;
        //           } catch(error){
        //               console.log("error at fetchRatingsForBooks", error);
        //           }
        //         })
        //     )
        //
        // },

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