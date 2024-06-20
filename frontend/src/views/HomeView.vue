<template>
  <section>
    <CarouselWidget :items="carouselItems" height="400px"></CarouselWidget>
  </section>
  <section class="my-5">
    <div class="container">
      <SectionHeader title="Featured Books" text="We declare long prop names using camelCase because this avoids"/>
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <a href="javascript:void(0)" class="list-group-item list-group-item-action"
               :class="{active: selectedFilter === 'latest'}" @click="selectFilter('latest')">
              Latest Books
            </a>
            <a href="javascript:void(0)" class="list-group-item list-group-item-action"
               :class="{active: selectedFilter === 'best'}" @click="selectFilter('best')">
              Best Ratings
            </a>
          </div>
        </div>
        <div class="col-md-8">
          <div v-if="isLoading">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <div v-else class="accordion">
            <div class="accordion-item" v-for="(book, index) in filteredBooks" :key="index">
              <h2 class="accordion-header">
                <button
                    class="accordion-button"
                    type="button"
                    :class="{collapsed: openAcardionIndex !== index}"
                    @click="toggleAccordion(index)"
                >
                  <strong>{{ book.title }} - {{ book.author }}</strong>
                </button>
              </h2>
              <div class="accordion-collapse collapse"
                   :class="{show: openAcardionIndex === index}"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="../assets/images/b1.jpg" class="img-fluid" alt="">
                    </div>
                    <div class="col-md-8 d-flex flex-column justify-content-center">
                      <p>{{ book.description }}</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-5" style="background-color: #f5f6f9">
    <div class="container">
      <SectionHeader
          title="Latest Comments"
          text="We declare long prop names using camelCase because this avoids"
      />

      <div class="row d-flex justify-content-center">
        <div class="col-md-6" v-for="comment in prepared4Comments" :key="comment.id">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-start align-items-center">
                <img
                    class="rounded-circle shadow-1-strong me-3"
                    src="../assets/images/c1.jpg"
                    alt="avatar"
                    width="60"
                    height="60"
                />
                <div>
                  <h6 class="fw-bold text-primary mb-1">{{ comment.book.title }}</h6>
                  <p class="text-muted small mb-0">{{ comment.user.name }} - {{ comment.created_at }}</p>
                </div>
              </div>

              <p class="mt-3 mb-4 pb-2">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CarouselWidget from "@/components/widgets/CarouselWidget.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import hero_1 from "@/assets/images/hero_1.jpg";
import hero_2 from "@/assets/images/hero_2.jpg";
import hero_3 from "@/assets/images/hero_3.jpg";
import {useBookStore} from "@/stores/bookStore.js";
import {useCommentStore} from "@/stores/commentStore.js";
import {ref, reactive, computed} from "vue";

const carouselItems = reactive([
  {
    imageUrl: hero_1,
    subtitle: 'Liberte',
    title: 'Lorem Ipsum Dolor Sit Amet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    imageUrl: hero_2,
    subtitle: 'Egalite',
    title: 'Excepteur Sint Occaecat Cupidatat',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    imageUrl: hero_3,
    subtitle: 'Fraternite',
    title: 'Neque Porro Quisquam Est',
    description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
  }
]);

const selectedFilter = ref('latest');
const openAcardionIndex = ref(0);
const bookStore = useBookStore();
const commentStore = useCommentStore();

const selectFilter = (name) => {
  selectedFilter.value = name;
}

const toggleAccordion = (index) => {
  if (openAcardionIndex.value === index) {
    openAcardionIndex.value = -1
  } else {
    openAcardionIndex.value = index
  }
}

const filteredBooks = computed(() => {
  if (selectedFilter.value === 'latest') {
    return bookStore.latest4Books;
  } else if (selectedFilter.value === 'best') {
    return bookStore.rated4Books;
  }
});

const prepared4Comments = computed(() => {
  return commentStore.comments
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4);
});

const isLoading = computed(() => bookStore.isLoading);

</script>

<style scoped>

.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.accordion-button {
  color: var(--primary-color);
}

.accordion-button:not(.collapsed) {
  background-color: var(--secondary-color);
  color: #ffffff;
}

.accordion-button:focus {
  outline: none;
  box-shadow: none;
}

</style>