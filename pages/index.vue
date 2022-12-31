<template>
  <div>
    <div class="container">
      <div class="article">
        <div class="row">
          <div v-for="article in searchArticles" :key="article.id" class="card">
            <a :href="'/contents/' + article.id + '/'">
              <img
                :src="article.eyecatch.url"
                class="article-img"
                alt="コンテンツ画像"
              />
            </a>
            <a class="article-content" :href="'/contents/' + article.id + '/'">
              <div class="text">
                <span
                  >{{ article.updatedAt | formatDate }}&emsp;{{
                    article.author.name
                  }}</span
                >
                <div class="article-title">
                  <nuxt-link to="/contents" class="content-title"
                    ><b>{{ article.title }}</b></nuxt-link
                  >
                </div>
              </div>
            </a>
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
            <p>{{ currentPage }}/7</p>
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
import axios from 'axios'
import BaseTag from '../components/Tags/BaseTag.vue'

export default {
  components: { BaseTag },
  layout: 'BaseLayout',
  data() {
    return {
      articles: [],
      searchArticles: [],
      tags: [],
      currentPage: 1,
      paginateFlg: true,
    }
  },
  watch: {
    async currentPage(newValue) {
      await this.$axios
        .get(
          `https://klontiicxy.microcms.io/api/v1/blogs?limit=9&offset=${
            (newValue - 1) * 10
          }`,
          {
            headers: {
              'X-MICROCMS-API-KEY': 'e5714836f9194e1795b5beb49c66e4a20569',
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
        })
    },
  },
  methods: {
    searchTag(tagName) {
      console.log('searchTagが発火しました')
      const searchArticles = this.articles.filter((article) => {
        const array = []
        article.category.forEach((item) => {
          if (item.name.indexOf(tagName) !== -1) {
            array.push(tagName)
          }
        })

        return array.length > 0
      })
      console.log(searchArticles)
      this.searchArticles = searchArticles
    },
    prevPage() {
      this.currentPage += 1
    },
    nextPage() {
      this.currentPage -= 1
    },
  },
  async mounted() {
    await this.$axios
      .get(
        `${this.$config.apiUrl}/blogs?limit=9&offset=${
          (this.currentPage - 1) * 10
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
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  margin: 0 auto;
  .container {
    width: 90%;
    margin: 50px auto;
    .article .row {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin: 50px 0;
      gap: 50px 10px;
      .card {
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 530px;
        padding: 0px;
        border: 1px solid rgba(182, 178, 178, 0.903);
        box-shadow: 5px 5px 7px rgba(197, 189, 189, 0.774);
        overflow: hidden;
        background-color: white;
        a {
          padding: 0;
          img {
            height: 300px;
            width: 100%;
            object-fit: cover;
          }
          img:hover {
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
    .article .paginate {
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
</style>
