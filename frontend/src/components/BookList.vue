<template>
  <div class="row">
    <div class="col-sm-6 col-sm-4 col-xl-3 mb-5" v-for="book in books" :key="book.id">
      <router-link :to="'books/'+ book.id">
        <BookItem :book="book"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import BookItem from "@/components/BookItem.vue";

export default {
  name: "BookList",
  components: {
    BookItem
  },
  props: {
    books: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped>

</style>