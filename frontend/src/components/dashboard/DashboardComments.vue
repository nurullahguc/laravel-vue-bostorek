<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead>
        <tr>
          <th>Content</th>
          <th>Book</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="comment in commentsByUser" :key="comment.id">
          <td>{{ comment.content }}</td>
          <td>{{ comment.book?.title }}</td>
          <td class="text-center  ">
            <font-awesome-icon
                :icon="['far', 'pen-to-square']"
                class="text-warning"
                style="cursor: pointer"
                @click="informationToast()"
            />
          </td>
          <td class="text-center">
            <font-awesome-icon
                :icon="['fas', 'trash']"
                class="text-danger"
                style="cursor: pointer"
                @click="informationToast()"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {useCommentStore} from "@/stores/commentStore.js";
import {mapActions, mapState} from "pinia";
import {useToast} from "vue-toastification";

export default {
  name: 'DashboardComments',
  methods: {
    ...mapActions(useCommentStore, [
      'fetchCommentsByUser'
    ]),
    informationToast() {
      const toast = useToast();
      toast.info("there is no delete or update transaction here!");
    }
  },
  computed: {
    ...mapState(useCommentStore, [
      'commentsByUser',
    ])
  },
  created() {
    this.fetchCommentsByUser();
  }
};
</script>

<style scoped></style>