<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{'disabled' : currentPage===1}">
        <a style="cursor: pointer;" class="page-link" @click="goToPage(currentPage-1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" :class="{'active': page===currentPage}" v-for="page in totalPages" :key="page">
        <a @click="goToPage(page)" class="page-link">{{ page }}</a>
      </li>


      <li class="page-item" :class="{'disabled': currentPage === totalPages}">
        <a style="cursor: pointer;" class="page-link" @click="goToPage(currentPage+1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {ref, reactive} from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})


const emit = defineEmits([
  'page-changed',
])

const goToPage = (page) => {
  emit('page-changed', page)
}
</script>

<!--<script>
export default {
  name: "PaginationWidget",
  emits: ['page-changed'],
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToPage(page) {
      this.$emit("page-changed", page)
      this.currentPage = page
    }
  }
}
</script>-->

<style scoped>

</style>