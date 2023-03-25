<template>
  <div class="tags">
    <article>
      <div class="card">
        <div class="heading">
          <div class="text">
            <div class="tags">
              <h1>Tags</h1>
            </div>
          </div>
        </div>
        <div class="tag-wrapper" v-for="tag in tags" :key="tag.id">
          <div
            class="tag-list"
            v-if="tag.count > 0"
            @click="searchTag(tag.name)"
          >
            <div class="tag-name">
              <ion-icon name="pricetag-outline"></ion-icon>
              <span>{{ tag.name }}</span>
            </div>
            <span v-if="tag.count">{{ tag.count }}</span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  layout: 'BaseLayout',
  async asyncData({ $axios, $config }) {
    const tags = await $axios.get(`${$config.apiUrl}/categories`, {
      headers: {
        'X-MICROCMS-API-KEY': `${$config.apiKey}`,
      },
    })
    const articles = await $axios.get(`${$config.apiUrl}/blogs?limit=100`, {
      headers: {
        'X-MICROCMS-API-KEY': `${$config.apiKey}`,
      },
    })
    return {
      tags: tags.data.contents,
      articles: articles.data.contents,
    }
  },
  data() {
    return {
      tags: [],
      articles: [],
    }
  },
  created() {
    const tagArray = [
      'HTML',
      'CSS',
      'JavaScript',
      'Vue.js',
      'Nuxt.js',
      'Laravel',
      'GoogleAppsScript',
      'LINE Bot',
      'VSCode',
    ]
    for (let i = 0; i < tagArray.length; i++) {
      // タグ名と一致するカテゴリの記事を抽出
      const filterArticles = this.articles.filter((item) => {
        const array = item.category.filter((item) => {
          return item.name == tagArray[i]
        })
        return array[0] != null
      })
      this.tags.forEach((item) => {
        if (item.name == tagArray[i]) {
          item.count = filterArticles.length
        }
      })
    }
    console.log(this.tags)
  },
  methods: {
    async searchTag(tagName) {
      this.$router.push({
        path: '/',
        query: {
          tag: tagName,
        },
      })
    },
  },
}
</script>
