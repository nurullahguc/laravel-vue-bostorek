<template>
  <div class="row">
    <div class="col-lg-6">
      <h2 class="mb-4">User Information</h2>
      <form action="">
        <div class="mb-3">
          <label for="username">Username:</label>
          <input v-model="userInfo.username" type="text" class="form-control" id="username"
                 :disabled="!editMode">
        </div>
        <div class="mb-3">
          <label for="email">Email:</label>
          <input v-model="userInfo.email" type="email" class="form-control" id="email" :disabled="!editMode">
        </div>
        <div class="mb-3">
          <label for="password">Password:</label>
          <input v-model="userInfo.password" type="password" class="form-control" id="password"
                 :disabled="!editMode">
        </div>
        <button @click="editMode ? saveUserInformation() : toggleEditMode()"
                type="button" class="btn btn-primary">{{ editMode ? 'Save' : 'Edit' }}
        </button>
        <button @click="cancelEditMode" v-if="editMode"
                style="background-color: #ecc73c !important; border-color: #ecc73c !important;"
                type="button" class="btn btn-primary ms-3">Cancel
        </button>
      </form>
    </div>
    <div class="col-lg-6"></div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/authStore.js";
import {useUserStore} from "@/stores/userStore.js";
import {mapState, mapActions} from "pinia";
import {useToast} from "vue-toastification";

export default {
  name: 'DashboardGeneral',
  data() {
    return {
      userInfo: {
        username: '',
        email: '',
        password: '',
      },
      editMode: false,
    }
  },
  created() {
    this.userInfo.username = this.user.name;
    this.userInfo.email = this.user.email;
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
  },


  methods: {
    ...mapActions(useUserStore, ['updateUserDetails']),
    ...mapActions(useAuthStore, ['logout']),
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    async saveUserInformation() {
      try {
        await this.updateUserDetails(this.userInfo);

        const toast = useToast();
        toast.success("Please login with new details.", {
          position: "top-right",
          timeout: 2000,
          closeButton: 'button',
          icon: true,
        })

        setTimeout(() => {
          console.log("logout started!")
          this.logout();
        }, 2500)
      } catch (e) {
        console.error(e);
      }
    },
    cancelEditMode() {
      this.editMode = false;
      this.userInfo.username = this.user.name;
      this.userInfo.email = this.user.email;
      this.userInfo.password = '';
    }
  }

}
</script>

<style scoped>

</style>