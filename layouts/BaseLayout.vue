<template>
    <div class="wrapper">
        <base-heading></base-heading>
        <main>
            <nuxt></nuxt>
        </main>
        <base-footer></base-footer>
    </div>
</template>

<script>
export default ({
})
</script>

<style lang="scss">
*, ::before, ::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  // background-color: #f2f4fb;
  background-color: white;
  font-family: Avenir,Hiragino Sans Gothic ProN,Meiryo,sans-serif;
}

a {
  text-decoration: none; 
  padding: 8px 15px;
}

li {
  list-style: none;
}

.wrapper {
  width: 100%;
}
</style>
