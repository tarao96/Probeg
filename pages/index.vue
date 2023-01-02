<template>
  <div class="contents">
    <!-- メイン -->
    <div class="container">
      <div class="article-wrapper">
        <div class="row">
          <div v-for="article in searchArticles" :key="article.id" class="card">
            <nuxt-link :to="'/contents/' + article.id + '/'">
              <img
                :src="article.eyecatch.url"
                class="article-img"
                alt="コンテンツ画像"
              />
            </nuxt-link>
            <div
              class="article-content"
              :href="'/contents/' + article.id + '/'"
            >
              <div class="text">
                <span
                  >{{ article.updatedAt | formatDate }}&emsp;{{
                    article.author.name
                  }}</span
                >
                <div class="article-title">
                  <nuxt-link
                    :to="'/contents/' + article.id + '/'"
                    class="content-title"
                    ><b>{{ article.title }}</b></nuxt-link
                  >
                </div>
              </div>
            </div>
            <div class="tag">
              <base-tag
                :tags="article.category"
                @clickTag="searchTag"
              ></base-tag>
            </div>
          </div>
        </div>

        <div class="paginate">
          <div class="nextPage" v-if="currentPage > 1" @click="nextPage">
            <div class="nextPage-inner">
              <div class="icon">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <span>Newer</span>
            </div>
          </div>

          <div class="currentPage">
            <p>{{ currentPage }}/{{ allPages }}</p>
          </div>

          <div class="prevPage" v-if="paginateFlg" @click="prevPage">
            <div class="prevPage-inner">
              <span>Older</span>
              <div class="icon">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <base-tags :tags="tags" @clickTag="searchTag"></base-tags>

    <base-about></base-about>
  </div>
</template>

<script>
import BaseTag from '../components/Tags/BaseTag.vue'

export default {
  components: { BaseTag },
  layout: 'BaseLayout',
  data() {
    return {
      articles: [],
      searchArticles: [],
      sliceArray: [],
      tags: [],
      currentPage: 1,
      paginateFlg: true,
      allPages: '',
    }
  },
  watch: {
    async currentPage(newValue) {
      if (this.sliceArray.length > 0) {
        // 検索した場合
        if (this.sliceArray[newValue - 1]) {
          this.searchArticles = this.sliceArray[newValue - 1]
          console.log(this.sliceArray, newValue)
          this.paginateFlg =
            this.sliceArray[newValue].length == 0 ? false : true
        }
        window.scroll({ top: 0, behavior: 'smooth' })
      } else {
        await this.$axios
          .get(
            `${this.$config.apiUrl}/blogs?limit=12&offset=${
              (newValue - 1) * 12
            }`,
            {
              headers: {
                'X-MICROCMS-API-KEY': this.$config.apiKey,
              },
            }
          )
          .then((res) => {
            console.log(res.data.contents)
            this.articles = res.data.contents
            this.searchArticles = res.data.contents

            // 次ページのコンテンツがない場合はolderボタンを削除する
            if (res.data.contents.length < 9) {
              this.paginateFlg = false
            } else {
              this.paginateFlg = true
            }

            window.scroll({ top: 0, behavior: 'smooth' })
          })
      }
    },
  },
  methods: {
    async searchTag(tagName) {
      console.log('searchTagが発火しました')
      console.log(tagName)
      await this.$axios
        .get(`${this.$config.apiUrl}/blogs?limit=100`, {
          headers: {
            'X-MICROCMS-API-KEY': `${this.$config.apiKey}`,
          },
        })
        .then((res) => {
          console.log(res.data.contents)
          const searchResults = res.data.contents.filter((article) => {
            const array = []
            article.category.forEach((item) => {
              if (item.name.indexOf(tagName) !== -1) {
                array.push(item)
              }
            })
            return array.length > 0
          })

          console.log(searchResults)

          const length = 12
          const sliceArray = []
          for (let i = 0; i < searchResults.length; i++) {
            let sliceNumberList = searchResults.slice(
              i * length,
              (i + 1) * length
            )
            sliceArray.push(sliceNumberList)
          }
          console.log(sliceArray)

          // 分割した全体の配列
          this.sliceArray = sliceArray

          // 検索するごとに全ページ数を更新する
          const filterSliceArray = sliceArray.filter((item) => {
            return item.length > 0;
          })
          this.allPages = filterSliceArray.length;

          // 表示する配列
          this.searchArticles = this.sliceArray[this.currentPage - 1]

          if (this.currentPage > 1) {
            this.currentPage = 1
          }

          // 表示コンテンツが9記事以下ならolderボタンを削除する
          if (this.sliceArray[this.currentPage].length == 0) {
            this.paginateFlg = false
          }

          window.scroll({ top: 0, behavior: 'smooth' })
        })
    },
    prevPage() {
      this.currentPage += 1
    },
    nextPage() {
      this.currentPage -= 1
    },
    moveTop() {
      this.sliceArray = []
      if (this.currentPage !== 1) {
        this.currentPage = 1
      } else {
        this.getArticles()
        this.paginateFlg = true
      }
    },
    async getArticles() {
      await this.$axios
        .get(
          `${this.$config.apiUrl}/blogs?limit=12&offset=${
            (this.currentPage - 1) * 13
          }`,
          {
            headers: {
              'X-MICROCMS-API-KEY': `${this.$config.apiKey}`,
            },
          }
        )
        .then((res) => {
          this.articles = res.data.contents
          this.searchArticles = res.data.contents
        })

      await this.$axios
        .get(`${this.$config.apiUrl}/categories`, {
          headers: {
            'X-MICROCMS-API-KEY': `${this.$config.apiKey}`,
          },
        })
        .then((res) => {
          this.tags = res.data.contents
        })
    },
    async getAllPages() {
      await this.$axios
        .get(
          `${this.$config.apiUrl}/blogs?limit=100`,
          {
            headers: {
              'X-MICROCMS-API-KEY': `${this.$config.apiKey}`,
            },
          }
        )
        .then((res) => {
          // 全ページ数を算出する
          const length = 12
          const sliceArray = []
          for (let i = 0; i < res.data.contents.length; i++) {
            let sliceNumberList = res.data.contents.slice(
              i * length,
              (i + 1) * length
            )
            sliceArray.push(sliceNumberList)
          }
          const filterSliceArray = sliceArray.filter((item) => {
            return item.length > 0;
          })
          this.allPages = filterSliceArray.length;
        })
    },
  },
  mounted() {
    this.getArticles();
    this.getAllPages();
    this.paginateFlg = true
  },
}
</script>

<style lang="scss" scoped>
</style>
