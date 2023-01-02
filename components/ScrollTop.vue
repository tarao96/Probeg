<template>
  <div class="scroll-wrapper" @click="scrollTop">
    <div class="scroll-top">
      <ion-icon name="arrow-up-outline"></ion-icon>
    </div>
  </div>
</template>

<script>
export default ({
  name: "scroll-top",
  methods: {
    scrollTop() {
      window.scroll({ top: 0, behavior: 'smooth' })
    },
  }
})
</script>


