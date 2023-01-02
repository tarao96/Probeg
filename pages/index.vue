<template>
  <div>
    <!-- トップスクロール -->
    <div class="scroll-wrapper" @click="scrollTop">
      <div class="scroll-top">
        <ion-icon name="arrow-up-outline" class="scroll-top-btn"></ion-icon>
      </div>
    </div>
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
    scrollTop() {
      window.scroll({ top: 0, behavior: 'smooth' })
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
main {
  width: 100%;
  margin: 0 auto;
  .container {
    width: 90%;
    margin: 50px auto;
    .article-wrapper .row {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin: 50px 0;
      gap: 50px 10px;
      .card {
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 100%;
        padding: 0px;
        padding-bottom: 20px;
        border: 1px solid rgba(182, 178, 178, 0.903);
        box-shadow: 5px 5px 7px rgba(197, 189, 189, 0.774);
        overflow: hidden;
        background-color: white;
        border-radius: 5%;
        margin-top: 50px;
        a {
          padding: 0;
          img {
            height: 300px;
            width: 100%;
            object-fit: cover;
          }
          img:hover {
            transition: 0.2s;
            transform: scale(1.1);
          }
        }
        .article-content {
          padding: 30px;
        }
        .tag {
          padding: 0 10px;
        }
        .text {
          padding: 0px;
          background-color: #fff;
          a:hover {
            opacity: 0.8;
          }
          span {
            display: block;
            color: rgba(136, 132, 132, 0.8);
            margin-bottom: 20px;
          }
          .article-title {
            margin-bottom: 30px;
            a {
              margin-bottom: 30px;
              // border: none;
              color: black;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
    .article-wrapper .paginate {
      position: relative;
      width: 100%;
      height: 100px;
      .nextPage {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        margin: 0;
        background-color: white;
        color: black;
        border: 1px solid black;
        padding: 5px 10px;
        cursor: pointer;
        .nextPage-inner {
          display: flex;
          justify-content: space-between;
          .icon {
            padding-top: 3px;
          }
        }
      }
      .currentPage {
        position: absolute;
        top: 0;
        left: 50%;
        width: 100px;
        margin: 0;
      }
      .prevPage {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        margin: 0;
        background-color: white;
        color: black;
        border: 1px solid black;
        padding: 5px 10px;
        cursor: pointer;
        .prevPage-inner {
          display: flex;
          justify-content: space-between;
          .icon {
            padding-top: 3px;
          }
        }
      }
      .nextPage:hover {
        background-color: black;
        color: white;
        .icon {
          color: white;
        }
      }
      .prevPage:hover {
        background-color: black;
        color: white;
        .icon {
          color: white;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  main {
    .container {
      .article-wrapper .row {
        .card {
          .article-content {
            padding: 0 30px;
          }
          .tag {
            padding: 0 30px;
          }
          .text {
            margin-top: 10px;
            .article-title {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
