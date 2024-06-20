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
            <input type="email" class="form-control" v-model.trim="formData.email" id="email" name="email" required
                   :class="{'is-valid': isEmailValid, 'is-invalid': !isEmailValid && showEmailWarningMessage}"
                   @focus="showEmailWarningMessage = true"
                   @blur="showEmailWarningMessage = false"
            >
            <span v-if="showEmailWarningMessage && !isEmailValid" class="text-danger small">Please provide a valid email.</span>

          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <span class="text-danger">*</span>
            <input type="password" class="form-control" v-model="formData.password" id="password" name="password"
                   required
                   :class="{'is-valid': isPasswordValid, 'is-invalid': !isPasswordValid && showPasswordWarningMessage}"
                   @focus="showPasswordWarningMessage = true"
                   @blur="showPasswordWarningMessage = false">
            <span v-if="showPasswordWarningMessage && !isPasswordValid" class="text-danger small">Password must be between 4 and 10 characters!</span>

          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button :disabled="!isFormValid" type="submit" class="btn btn-primary w-100">Register</button>
            <span v-if="!isFormValid" class="text-danger small">* Please complete all of the required fields!</span>
            <span v-else class="text-success small">You are good to go :)</span>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import {useAuthStore} from "@/stores/authStore.js";
import {mapActions} from "pinia";
import {useToast} from "vue-toastification";
import {ref, reactive, computed} from "vue";
import {useRouter} from "vue-router";

const formData = reactive({
  username: '',
  email: '',
  password: '',
})

const showUsernameWarningMessage = ref(false);
const showEmailWarningMessage = ref(false);
const showPasswordWarningMessage = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  try {

    await authStore.register(formData)
    const toast = useToast();
    toast.success("You will be redirect to login page.", {
      position: "top-right",
      timeout: 2000,
      closeButton: 'button',
      icon: true,
    })

    setTimeout(() => {
      router.push('/login')
    }, 2500)

  } catch (e) {
    console.error("Error at registration", e)
  }
}


const isFormValid = computed(() => isUsernameValid.value && isEmailValid.value && isPasswordValid.value);
const isUsernameValid = computed(() => (formData.username.length >= 5 && formData.username.length <= 20));
const isEmailValid = computed(() =>  /^[^\s]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
const isPasswordValid = computed(() => (formData.password.length >= 4 && formData.password.length <= 10));

</script>

<style scoped>

</style>