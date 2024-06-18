<template>
  <!-- Button -->
  <div class="row mb-3">
    <div class="col text-end">
      <button type="button" @click="modal.show()" class="btn btn-primary">Add Book</button>
    </div>
  </div>

  <!-- Table -->
  <div class="row">
    <div class="col">
      <table class="table">
        <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Page</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Delete</th>
        </tr>
        </thead>
        <tbody>
        <TransitionGroup name="list">
          <tr v-for="book in userBooks" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td style="max-width: 250px">{{ book.description }}</td>
            <td>{{ book.page_number }}</td>
            <td class="text-center">
              <font-awesome-icon
                  :icon="['far', 'pen-to-square']"
                  class="text-warning"
                  style="cursor: pointer"
              />
            </td>
            <td class="text-center">
              <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer"
                  @click="deleteBook(book.id, book.title)"
              />
            </td>
          </tr>
        </TransitionGroup>
        </tbody>
      </table>

    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">Add Book</h5>
          <button type="button" @click="modal.hide()" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body mx-5">
          <div class="col mb-3">
            <label for="title" class="form-label"
            >Title
              <span class="text-danger">*</span>
            </label>
            <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                required
                v-model="newBook.title"
            />
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
            >Author
              <span class="text-danger">*</span>
            </label>
            <input
                type="text"
                class="form-control"
                id="author"
                name="author"
                required
                v-model="newBook.author"
            />
          </div>
          <div class="col mb-3">
            <label for="description" class="form-label"
            >Description
              <span class="text-danger">*</span>
            </label>
            <textarea
                name="description"
                id="description"
                class="form-control"
                cols="30"
                rows="10"
                v-model="newBook.description"
            ></textarea>
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
            >Number of Pages
              <span class="text-danger">*</span>
            </label>
            <input
                type="number"
                class="form-control"
                id="numOfPages"
                name="numOfPages"
                required
                v-model="newBook.page_number"
            />
          </div>
          <div class="text-end mb-4 d-flex align-items-center justify-content-between">
            <button type="button" @click="modal.hide()" class="btn btn-outline-secondary">
              Close
            </button>
            <button @click="addBook" type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from "bootstrap";
import {useBookStore} from "@/stores/bookStore.js";
import {mapActions, mapState} from "pinia";
import {useToast} from "vue-toastification";

export default {
  name: 'DashboardBooks',
  components: {
    Modal
  },
  data() {
    return {
      modal: null,
      newBook: {
        title: '',
        author: '',
        description: '',
        page_number: null,
      }
    }
  },
  computed: {
    ...mapState(useBookStore, ['userUploadedBooks']),
    userBooks() {
      return this.userUploadedBooks
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
  },
  methods: {
    ...mapActions(useBookStore, [
      'addNewBook',
      'fetchBooksByUploader',
      'deleteTheBook'
    ]),

    showToast(message, options) {
      const toast = useToast();
      toast(message, {
        position: "bottom-left",
        closeButton: 'button',
        icon: true,
        ...options,
      })
    },
    async addBook() {
      try {
        const response = await this.addNewBook(this.newBook)
        await this.fetchBooksByUploader();
        this.showToast(response.data.message, {type: 'success', timeout: 1500});
        this.modal.hide();
        this.newBook = {
          title: '',
          author: '',
          description: '',
          page_number: null,
        };
      } catch (e) {
        console.log("error at create new book!", e);
        this.showToast(e.response.data.message, {type: 'success', timeout: 1500});
      } finally {
        this.modal.hide();
      }
    },
    async deleteBook(bookId, bookTitle) {
      try {
        await this.deleteTheBook(bookId)
        await this.fetchBooksByUploader();
        this.showToast(`"${bookTitle}" deleted successfully!`, {type: 'warning', timeout: 3000});
      } catch (e) {
        console.log("error at create new book!", e);
        this.showToast(e.response.data.message, {type: 'error', timeout: 1500});
      } finally {
        this.modal.hide();
      }
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.addEditModal);
  },
  created() {
    this.fetchBooksByUploader();
  }
}
</script>

<style scoped>
.btn-outline-secondary {
  border-radius: 25px;
  height: 48px;
  margin-right: 20px;
  min-width: 120px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}


.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

</style>