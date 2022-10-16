<template>
    <header>
        <div class="logo">
          <nuxt-link to="/">
            <img src="@/assets/images/logo2.png" alt="ロゴ画像">
          </nuxt-link>
        </div>
        <nuxt-link to="/">
          <h1 class="title">Probeg</h1>
        </nuxt-link>
    </header>
</template>

<script>
export default ({
    name: 'base-heading',
})
</script>

<style lang="scss">
header {
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  h1.title {
    font-size: 4.5rem;
    background: linear-gradient(blue, pink);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .logo img {
    width: 200px;
  }
}
</style>
