<template>
  <section class="full-section-height">
    <div class="container">
      <Form class="mt-5" v-slot="{ values }">

        <h1 class="text-center text-primary mb-5">Login Vee</h1>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <Field type="email" class="form-control" id="email" name="email" required/>
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <Field type="password" class="form-control" id="password" name="password" required/>
          </div>
        </div>

        <pre>{{ values }}</pre>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </div>
      </Form>


    </div>
  </section>
</template>

<script setup>
import {Form, Field} from 'vee-validate';
</script>

<style scoped>


</style>