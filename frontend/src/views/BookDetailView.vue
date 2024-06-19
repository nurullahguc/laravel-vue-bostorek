<template>
  <div className="container">
    <SectionHeader :title="book.title" :text="book.author"/>
    <div className="d-flex">
      <font-awesome-icon
          icon="arrow-left"
          size="xl"
          className="mb-2"
          style="cursor: pointer; color: var(--secondary-color)"
          @click="goToBackBooks"
      />
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="image-box">
          <img className="img-fluid" src="../../template/images/b_detail.jpg"/>
        </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex flex-column h-100 justify-content-between">
          <div className="mb-3">
            <p>
              {{ book.description }}
            </p>
          </div>
          <div className="d-flex flex-column">
            <div className="row border-bottom pb-2">
              <div className="col-lg-6"><strong>Page</strong></div>
              <div className="col-lg-6">{{ book.pageNumber }}</div>
            </div>
            <div className="row border-bottom pb-2">
              <div className="col-lg-6"><strong>Rating</strong></div>
              <div className="col-lg-6">8.2 - (23 rates)</div>
            </div>
            <div className="row border-bottom pb-2">
              <div className="col-lg-6"><strong>Upload Date</strong></div>
              <div className="col-lg-6">{{ book.updatedAt }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-6">
        <div className="box">
          <h3 style="color: var(--primary-color)">Rate The Book</h3>
          <form>
            <!-- Rating Input -->
            <div className="mb-3">
              <input
                  type="number"
                  id="rating"
                  className="form-control w-50"
                  min="1"
                  max="10"
                  placeholder="Rate (1-10)"
                  required
              />
            </div>

            <!-- Submit Button -->
            <button type="submit" className="btn btn-primary">Rate</button>
          </form>
        </div>
      </div>
    </div>
    <hr/>
    <div className="row mt-3">
      <div className="col-md-12">
        <div className="box">
          <h3 style="color: var(--primary-color)">Comment The Book</h3>
          <form>
            <!-- Comment Text Area -->
            <div className="mb-3">
              <textarea
                  id="comment"
                  className="form-control"
                  rows="4"
                  placeholder="Enter your comment"
                  required
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" className="btn btn-primary">Comment</button>
          </form>
        </div>
      </div>
    </div>
    <hr/>
    <div className="row my-3">
      <div className="col-md-12">
        <div className="box">
          <h3 style="color: var(--primary-color)">Comments</h3>
          <div>
            <div className="card mb-4">
              <div className="card-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <p className="small mb-0 ms-2">Username</p>
                  </div>
                  <div
                      className="d-flex flex-row align-items-center"
                      style="gap: 10px"
                  >
                    <p className="small text-muted mb-0">Upvote?</p>
                    <font-awesome-icon :icon="['far', 'thumbs-up']"/>
                    <p className="small text-muted mb-0">3</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <p className="small mb-0 ms-2">Username</p>
                  </div>
                  <div
                      className="d-flex flex-row align-items-center"
                      style="gap: 10px"
                  >
                    <p className="small mb-0">Upvoted</p>
                    <font-awesome-icon
                        :icon="['fas', 'thumbs-up']"
                        style="color: var(--secondary-color)"
                    />
                    <p className="small text-muted mb-0">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import {useBookStore} from '@/stores/bookStore.js';
import {mapState} from 'pinia';

export default {
  name: 'BookDetailView',
  components: {
    SectionHeader,
  },
  data() {
    return {
      book: null,
      loading: true,
    };
  },
  created() {
    this.selectBook();
  },
  methods: {
    goToBackBooks() {
      this.$router.push({name: 'books'});
    },
    selectBook() {
      const bookId = this.$route.params.id;
      this.book = this.selectedBook(bookId);
      this.loading = false;
    },
  },
  computed: {
    ...mapState(useBookStore, ['selectedBook']),
  },
};
</script>

<style scoped>
.image-box {
  height: 300px;
  overflow: hidden;
}

.image-box img {
  width: 100% !important;
}

.btn-primary {
  height: 36px;
  min-width: 120px;
  border-radius: 16px;
}

.box {
  border: 1px solid #e2e3e5;
  border-radius: 10px;
  padding: 20px;
}
</style>
