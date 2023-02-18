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
        <div class="tag-wrapper">
          <div v-for="tag in tags" :key="tag.id" class="tag-list" @click="searchTag(tag.name)">
            <div class="tag-name">
              <ion-icon name="pricetag-outline"></ion-icon>
              <span>{{ tag.name }}</span>
            </div>
            <span v-if="tag.name == 'HTML'">{{ htmlCount }}</span>
            <span v-if="tag.name == 'CSS'">{{ cssCount }}</span>
            <span v-if="tag.name == 'JavaScript'">{{ javascriptCount }}</span>
            <span v-if="tag.name == 'Vue.js'">{{ vueCount }}</span>
            <span v-if="tag.name == 'Nuxt.js'">{{ nuxtCount }}</span>
            <span v-if="tag.name == 'Laravel'">{{ laravelCount }}</span>
            <span v-if="tag.name == 'GoogleAppsScript'">{{
              googleappsscriptCount
            }}</span>
            <span v-if="tag.name == 'LINE Bot'">{{ linebotCount }}</span>
            <span v-if="tag.name == 'VSCode'">{{ vscodeCount }}</span>
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
      htmlCount: 0,
      cssCount: 0,
      javascriptCount: 0,
      vueCount: 0,
      nuxtCount: 0,
      laravelCount: 0,
      googleappsscriptCount: 0,
      linebotCount: 0,
      vscodeCount: 0
    }
  },
  mounted() {
    const tagArray = [
      'HTML',
      'CSS',
      'JavaScript',
      'Vue.js',
      'Nuxt.js',
      'Laravel',
      'GoogleAppsScript',
      'LINE Bot',
      'VSCode'
    ]
    for (let i = 0; i < tagArray.length; i++) {
      this.countTagArticles(tagArray[i])
    }
  },
  methods: {
    async countTagArticles(tagName) {
      const filterArticles = this.articles.filter((item) => {
        const array = item.category.filter((item) => {
          return item.name == tagName
        })
        return array[0] != null
      })
      switch (tagName) {
        case 'HTML':
          this.htmlCount = filterArticles.length
          break
        case 'CSS':
          this.cssCount = filterArticles.length
          break
        case 'JavaScript':
          this.javascriptCount = filterArticles.length
          break
        case 'Vue.js':
          this.vueCount = filterArticles.length
          break
        case 'Nuxt.js':
          this.nuxtCount = filterArticles.length
          break
        case 'Laravel':
          this.laravelCount = filterArticles.length
          break
        case 'GoogleAppsScript':
          this.googleappsscriptCount = filterArticles.length
          break
        case 'LINE Bot':
          this.linebotCount = filterArticles.length
          break
        case 'VSCode':
          this.vscodeCount = filterArticles.length
          break
      }
    },
    async searchTag(tagName) {
      this.$router.push({
        path: '/',
        query: {
          'tag': tagName
        }
      });
    }
  },
}
</script>
