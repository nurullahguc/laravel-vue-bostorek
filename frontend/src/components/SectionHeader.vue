<template>
  <div>
    <div class="text-center mb-5 mt-3">
      <h1 class="display-4 font-weight-bolder">{{ title }}</h1>
      <p class="lead">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  // props: ['title', 'text']
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>