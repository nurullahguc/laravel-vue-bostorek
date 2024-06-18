<template>
  <section class="full-section-height">
    <div class="container">
      <form @submit.prevent="handleSubmit" class="mt-5">


        <div v-if="v$.$errors.length > 0" class="mt-4 d-flex align-items-center justify-content-center">
          <div class="alert alert-danger">Errors:
            <ul>
              <li v-for="error in v$.$errors" :key="error.$uid">
                {{ error.$property }} {{ error.$message }}
              </li>
            </ul>
          </div>
        </div>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <input :class="emailValidClass"
                   type="text" class="form-control"
                   v-model.trim="formData.email" id="email" name="email">
            <span v-for="error in v$.email.$errors" :key="error.$uid" class="text-danger">
              {{ error.$message }}
              </span>
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <input :class="passwordValidClass" type="password" class="form-control" v-model="formData.password"
                   id="password" name="password">
            <span v-for="error in v$.password.$errors" :key="error.$uid" class="text-danger">
              {{ error.$message }}
              </span>
          </div>
        </div>
        <!--<pre>{{ v$.$errors }}</pre>-->


        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import {useAuthStore} from "@/stores/authStore.js";
import {useToast} from "vue-toastification";
import {useVuelidate} from '@vuelidate/core'
import {required, email, helpers} from '@vuelidate/validators'
import {reactive, computed} from "vue";
import {useRouter} from "vue-router";

const formData = reactive({
  email: '',
  password: '',
})

const emailValidClass = computed(() => {
  return {
    'is-valid': v$.value.email.$errors.length === 0,
    'is-invalid': v$.value.email.$errors.length > 0,
  }
})

const passwordValidClass = computed(() => {
  return {
    'is-valid': v$.value.password.$errors.length === 0,
    'is-invalid': v$.value.password.$errors.length > 0,
  }
})

const authStore = useAuthStore();
const router = useRouter();

const rules = {
  email: {required, email},
  password: {required},
}

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {

  const toast = useToast();


  try {
    const result = await v$.value.$validate();
    await authStore.login(formData)

    toast.success("You will be redirect to dashboard page.", {
      position: "bottom-left",
      timeout: 2000,
      closeButton: 'button',
      icon: true,
    })

    router.push('/dashboard')
  } catch (error) {

    toast.error(error.response.data.message, {
      position: "bottom-left",
      timeout: 2000,
      closeButton: 'button',
      icon: true,
    })

    console.error("Error at login: ", error);
  }
}

</script>

<style scoped>


</style>