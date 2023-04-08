<template>
  <div class="error-container">
    <base-heading></base-heading>
    <div class="error-wrapper">
      <div class="error">
        <h1>404 Not Found</h1>
        <p>お探しのページは見つかりませんでした。</p>
        <nuxt-link to="/">ホームに戻る</nuxt-link>
      </div>
    </div>
    <base-footer></base-footer>
  </div>
</template>

<script>
import BaseHeading from '~/components/BaseHeading.vue'
import BaseFooter from '~/components/BaseFooter.vue'
export default {
  components: {
    BaseHeading,
    BaseFooter,
  },
}
</script>

<style scoped></style>
