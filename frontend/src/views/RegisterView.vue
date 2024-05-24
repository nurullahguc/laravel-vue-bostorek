<template>
  <section class="full-section-height">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="display-3">Register</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="mt-5">
        <div class="row justify-content-center">
          <!-- Username Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="username" class="form-label">Username</label>
            <span class="text-danger">*</span>
            <input type="text" class="form-control" id="username" v-model.trim="formData.username" name="username"
                   required
                   :class="{'is-valid': isUsernameValid, 'is-invalid': !isUsernameValid && showUsernameWarningMessage}"
                   @focus="showUsernameWarningMessage = true"
                   @blur="showUsernameWarningMessage = false"
                   autocomplete="off">
            <span v-if="showUsernameWarningMessage && !isUsernameValid" class="text-danger small">Username must be between 5 and 20 characters!</span>
          </div>
        </div>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <span class="text-danger">*</span>
            <input type="email" class="form-control" v-model.trim="formData.email" id="email" name="email" required>
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <span class="text-danger">*</span>
            <input type="password" class="form-control" v-model="formData.password" id="password" name="password"
                   required>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Register</button>
            <span class="text-danger small">* Please complete all of the required fields!</span>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import {useAuthStore} from "@/stores/authStore.js";
import {mapActions} from "pinia"

export default {
  name: "RegisterView",
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
      },
      showUsernameWarningMessage: false
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['register']),
    async handleSubmit() {

      try {
        await this.register(this.formData)
        this.$router.push('/login')
      } catch (e) {
        console.error("Error at registration", e)
      }
    }
  },
  computed: {
    isUsernameValid() {
      return (this.formData.username.length >= 5 && this.formData.username.length <= 20)
    }
  },
}
</script>

<style scoped>
.form-control {
  border-radius: 25px;
  height: 48px;
}

.form-control:focus {
  box-shadow: none;
}

.btn-primary {
  border-radius: 25px;
  height: 48px;
  background-color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
}

.btn-primary:hover {
  background-color: #fff;
  color: var(--secondary-color);
  transition: all 0.3s ease;
}


</style>