<template>
  <div class="author">
    <article>
      <div class="card">
        <div class="heading">
          <div class="text">
            <div class="author">
              <img :src="author[0].img.url" alt="プロフィール画像" />
              <h1>{{ author[0].name }}</h1>
            </div>
          </div>
        </div>

        <div class="main">
          <div class="contents" v-html="author[0].description"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

export default {
  layout: 'BaseLayout',
  data() {
    return {
      author: {},
    }
  },
  async asyncData({ $axios, $config, params }) {
    const authorId = params.id
    const res = await $axios.get(`${$config.apiUrl}/authors`, {
      headers: { 'X-MICROCMS-API-KEY': $config.apiKey },
    })

    const author = res.data.contents.filter((item) => {
      return (item.id = authorId)
    })

    return {
      author: author,
    }
  },
}
</script>

<style lang="scss" scoped></style>
