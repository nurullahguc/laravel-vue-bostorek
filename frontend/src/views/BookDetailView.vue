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
              <div className="col-lg-6">{{ averageRating }} - ( {{ ratingCount }} rates)</div>
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

          <div v-if="isLoggedIn">

            <div v-if="!isUserAlreadyRated">

              <h3 style="color: var(--primary-color)">Rate The Book</h3>
              <form @submit.prevent="addRate()">
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
                      v-model="userRate"
                  />
                </div>

                <!-- Submit Button -->
                <button type="submit" className="btn btn-primary">Rate</button>
              </form>
            </div>
            <div v-else>
              Your Rate: {{ userRating }}
            </div>
          </div>
          <router-link v-else to="/login">
            <p style="color: var(--secondary-color)">Login to leave a rate.</p>
          </router-link>
        </div>
      </div>
    </div>
    <hr v-if="isLoggedIn"/>
    <div className="row mt-3">
      <div className="col-md-12">
        <div className="box">

          <div v-if="isLoggedIn">
            <h3 style="color: var(--primary-color)">Comment The Book</h3>
            <form @submit.prevent="addComment()">
              <!-- Comment Text Area -->
              <div className="mb-3">
              <textarea
                  id="comment"
                  className="form-control"
                  rows="4"
                  placeholder="Enter your comment"

                  v-model="commentContent"
              ></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" className="btn btn-primary">Comment</button>
            </form>
          </div>
          <router-link v-else to="/login">
            <p style="color: var(--secondary-color)">Login to leave a comment.</p>
          </router-link>

        </div>
      </div>
    </div>
    <hr/>
    <div className="row my-3">
      <div className="col-md-12">
        <div className="box">
          <h3 style="color: var(--primary-color)">Comments</h3>
          <div>
            <div className="card mb-4"
                 v-for="comment in commentsForBook" :key="comment.id">
              <div className="card-body">
                <p>{{ comment.content }}</p>

                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <p className="small mb-0 ms-2">{{ comment.user.name }}</p>
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

            <div v-if="false" className="card mb-4">
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

<script setup>
import SectionHeader from '@/components/SectionHeader.vue';
import {useBookStore} from '@/stores/bookStore.js';
import {useCommentStore} from '@/stores/commentStore.js';
import {useAuthStore} from "@/stores/authStore.js";
import {useRatingStore} from "@/stores/ratingStore.js";
import {useUserStore} from "@/stores/userStore.js";
import {useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";

const book = ref(null);
const loading = ref(true);
const commentContent = ref('');
const userRate = ref(null);

const bookStore = useBookStore();
const authStore = useAuthStore();
const commentStore = useCommentStore();
const ratingStore = useRatingStore();

const route = useRoute();
const router = useRouter();

const addComment = async () => {
  const toast = useToast();
  try {
    const bookId = route.params.id;
    const content = commentContent.value;

    const response = await commentStore.addNewComment({
      bookId,
      content,
    });

    commentContent.value = '';

    await commentStore.fetchCommentsForBook(route.params.id);

    toast.success(response.message, {
      position: "bottom-left",
      timeout: 2000,
      closeButton: 'button',
      icon: true,
    })

  } catch (error) {
    if (error.errors) {
      for (const key in error.errors) {
        if (error.errors.hasOwnProperty(key)) {
          toast.error(error.errors[key][0], {
            position: "bottom-left",
            timeout: 3000,
            closeButton: 'button',
            icon: true,
          });
        }
      }
    } else {
      toast.error(error.message, {
        position: "bottom-left",
        timeout: 2000,
        closeButton: 'button',
        icon: true,
      });
    }
  }
};

const goToBackBooks = () => {
  router.push({name: 'books'});
}

const selectBook = () => {
  const bookId = route.params.id;
  book.value = bookStore.selectedBook(bookId);
  loading.value = false;
};

const addRate = async () => {
  try {
    const bookId = route.params.id;
    const rate = userRate.value;

    const response = await ratingStore.addNewRate({
      bookId,
      rate,
    });

    await ratingStore.fetchRatingForBook(route.params.id);

    userRate.value = null;

  } catch (e) {
    throw e;
  }
};

const averageRating = computed(() => {
  if (ratingStore.ratingsForBook.length > 0) {
    const totalRating = ratingStore.ratingsForBook.reduce((sum, rating) => sum + rating.rate, 0);
    return (totalRating / ratingStore.ratingsForBook.length).toFixed(1);
  } else {
    return 0;
  }
});

const ratingCount = computed(() => ratingStore.ratingsForBook ? ratingStore.ratingsForBook.length : 0);

const isUserAlreadyRated = computed(() => {
  if (!authStore.user)
    return false;

  return ratingStore.ratingsForBook.some((rating) => rating.user.id === authStore.user.id);
});

const userRating = computed(() => {
  const userRatingObj = ratingStore.ratingsForBook.find((rating) => rating.user.id === authStore.user.id);
  return userRatingObj ? userRatingObj.rate : null;
})

const isLoggedIn = computed(() => authStore.isLoggedIn);
const commentsForBook = computed(() => commentStore.commentsForBook);

selectBook();
commentStore.fetchCommentsForBook(route.params.id);
ratingStore.fetchRatingForBook(route.params.id);

</script>

<!--<script>
export default {
  created() {
    this.selectBook();
    this.fetchCommentsForBook(this.$route.params.id);
  },
  computed: {
    ...mapState(useBookStore, [
      'selectedBook',
    ]),
    ...mapState(useAuthStore, [
      'isLoggedIn',
      'user',
    ]),
    ...mapState(useCommentStore, [
      'commentsForBook',
    ]),
    ...mapState(useRatingStore, [
      'ratingsForBook',
    ]),


    isUserAlreadyRated() {

    },
    userRating() {

    }
  },
};
</script>-->

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
