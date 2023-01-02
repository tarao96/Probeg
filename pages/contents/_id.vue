<template>
  <div class="content">
    <article>
      <div class="card">
        <div class="heading">
          <img :src="article.eyecatch.url" alt="コンテンツ画像" />
          <span class="date">{{ article.updatedAt | formatDate }}</span>
          <h1 class="title">{{ article.title }}</h1>
          <div class="text">
            <div class="author">
              <img :src="article.author.img.url" alt="プロフィール画像" />
              <nuxt-link :to="'/author/' + article.author.id">{{
                article.author.name
              }}</nuxt-link>
            </div>
            <base-tag :tags="article.category"></base-tag>
          </div>
        </div>
        <div class="main">
          <div class="contents" v-html="body"></div>
        </div>
      </div>
      <div class="table-of-contents-wrapper">
        <div class="table-of-contents">
          <div class="header">
            <h2 class="table-of-contents-header">目次</h2>
          </div>
          <div class="body">
            <ul class="lists">
              <li :class="`list${item.name}`" v-for="item in toc" :key="item.id">
                <nuxt-link :to="`#${item.id}`">
                  {{ item.text }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
    <div class="latest-articles">
      <latest-articles :articles="latestArticles"></latest-articles>
    </div>
    <div class="related-articles" v-if="articles[0]">
      <related-articles :articles="articles"></related-articles>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
import BaseTag from '@/components/Tags/BaseTag.vue'
import LatestArticles from '@/components/LatestArticles.vue'
import RelatedArticles from '@/components/RelatedArticles.vue'
import BaseHeading from '@/components/BaseHeading.vue'

export default {
  layout: 'BaseLayout',
  components: { BaseTag, LatestArticles, RelatedArticles, BaseHeading },
  data() {
    return {
      latestArticles: [],
      article: [],
      body: [],
      toc: [],
    }
  },
  methods: {
    scrollTop() {
      window.scroll({ top: 0, behavior: 'smooth' })
    },
  },
  async asyncData({ $axios, $config, params }) {
    const articleRes = await $axios.get(`${$config.apiUrl}/blogs/${params.id}`, {
      headers: { 'X-MICROCMS-API-KEY': $config.apiKey },
    })

    const latestArticlesRes = await axios.get(
      `${$config.apiUrl}/blogs?limit=6`,
      {
        headers: { 'X-MICROCMS-API-KEY': $config.apiKey },
      }
    )

    const latestArticles = latestArticlesRes.data.contents.filter((item) => {
      return item.id !== params.id
    })

    const array = []
    articleRes.data.category.forEach((item) => {
      const name = item.name
      array.push(name)
    })

    const articlesByTitle = await axios.get(
      `${$config.apiUrl}/blogs?filters=title[contains]${array}`,
      {
        headers: { 'X-MICROCMS-API-KEY': $config.apiKey },
      }
    )

    const relatedArticles = articlesByTitle.data.contents.filter((item) => {
      return item.id !== params.id
    })

    const $ = cheerio.load(articleRes.data.content)
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text())
      $(elm).html(result.value)
      $(elm).addClass('hljs')
    })

    // 目次を生成する
    const headings = $('h1, h2, h3').toArray();
    console.log(headings);
    const toc = headings.map((data) => ({
      text: data.children[0].data,
      id: data.attribs.id,
      name: data.name,
    }))

    // console.log(toc)

    return {
      article: articleRes.data,
      body: $.html(),
      latestArticles: latestArticles,
      articles: relatedArticles,
      toc: toc,
    }
  },
}
</script>

<style lang="scss">
</style>
