<template>
  <header>
    <div class="logo">
      <a href="/">
        <img src="@/assets/images/Probeg.png" alt="ロゴ画像" />
      </a>
    </div>
    <a href="/">
      <h1 class="title">Probeg</h1>
    </a>
  </header>
</template>

<script>
export default {
  name: 'base-heading',
}
</script>

<style lang="scss">
header {
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  h1.title {
    font-size: 4rem;
    padding-bottom: 10px;
    background: linear-gradient(blue, pink);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .logo img {
    width: 350px;
    height: 150px;
    object-fit: cover;
  }
}
</style>
