<template>
  <div class="contents">
    <!-- メイン -->
    <div class="container">
      <recommend-articles :articles="recommendArticles"></recommend-articles>
      <div class="article-wrapper">
        <div class="index-heading" id="article-heading">
          <span>INDEX</span>
          <div class="underline"></div>
        </div>
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
              <base-tag :tags="article.category"></base-tag>
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
            <p>
              <span>{{ currentPage }}</span> / {{ allPages }}
            </p>
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
    <!-- <base-tags
      :tags="tags"
      @clickTag="searchTag"
      @resetTag="resetTag"
    ></base-tags>
    <base-about></base-about> -->
  </div>
</template>

<script>
import BaseTag from '../components/Tags/BaseTag.vue'
import RecommendArticles from '../components/RecommendArticles.vue'

export default {
  components: { BaseTag, RecommendArticles },
  layout: 'BaseLayout',
  data() {
    return {
      articles: [],
      allArticles: [],
      searchArticles: [],
      recommendArticles: [],
      sliceArray: [],
      tags: [],
      currentPage: 1,
      paginateFlg: false,
      allPages: '',
      courses: [
        {
          id: 1,
          title: 'Webサイト制作コース',
          description:
            '<p>このコースではWebサイトを制作するために必要となる知識やテクニックなどを順を追って学習していきます。</p><p>コースを全て終えればWebサイトを実際に作れるように設計しています。</p>',
          img: './img/web_site.jpg',
          courseArticles: [],
          languages: ['HTML', 'CSS', 'JavaScript'],
        },
        // {
        //   id: 2,
        //   title: 'Webアプリ開発コース',
        //   description:
        //     '<p>このコースではWebアプリ開発に必要となる知識を学習することができます。</p><p>PHP/Laravelを使いこなして簡単なWebアプリを開発してみましょう！</p>',
        //   img: './img/web_app.jpg',
        //   courseArticles: [],
        //   languages: ['HTML', 'CSS', 'PHP', 'Laravel'],
        // },
      ],
    }
  },
  mounted() {
    this.getArticles()
    this.getAllPages()
    this.getRecommendArticles()
    if (this.$route.query.tag) {
      console.log('クエリパラメータを発見しました')
      this.searchTag()
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
        this.scrollTo('article-heading')
      } else {
        await this.$axios
          .get(
            `${this.$config.apiUrl}/blogs?limit=13&offset=${
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
            this.articles = res.data.contents.slice(0, 12)
            this.searchArticles = res.data.contents.slice(0, 12)

            // 次ページのコンテンツがない場合はolderボタンを削除する
            const countPerPage = 12 // １ページで表示するコンテンツの数
            if (typeof res.data.contents[countPerPage] == 'undefined') {
              this.paginateFlg = false
            } else {
              this.paginateFlg = true
            }

            this.scrollTo('article-heading')
            window.location.reload()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
  methods: {
    scrollTo(id) {
      const element = document.getElementById(id)
      element.scrollIntoView({
        behavior: 'smooth',
      })
    },
    async searchTag() {
      const tagName = this.$route.query.tag
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

          // 分割した全体の配列
          this.sliceArray = sliceArray

          // 検索するごとに全ページ数を更新する
          const filterSliceArray = sliceArray.filter((item) => {
            return item.length > 0
          })
          this.allPages = filterSliceArray.length

          // 表示する配列
          this.searchArticles = this.sliceArray[this.currentPage - 1]
          console.log(this.searchArticles)

          if (this.currentPage > 1) {
            this.currentPage = 1
          }

          // 表示コンテンツが12記事以下ならolderボタンを削除する
          if (this.sliceArray[0].length < 12) {
            this.paginateFlg = false
          }
          this.scrollTo('article-heading')
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
    },
    async getAllPages() {
      await this.$axios
        .get(`${this.$config.apiUrl}/blogs?limit=100`, {
          headers: {
            'X-MICROCMS-API-KEY': `${this.$config.apiKey}`,
          },
        })
        .then((res) => {
          // 全ページ数を算出する
          const length = 12
          const sliceArray = []
          this.allArticles = res.data.contents
          for (let i = 0; i < res.data.contents.length; i++) {
            let sliceNumberList = res.data.contents.slice(
              i * length,
              (i + 1) * length
            )
            sliceArray.push(sliceNumberList)
          }
          const filterSliceArray = sliceArray.filter((item) => {
            return item.length > 0
          })
          this.allPages = filterSliceArray.length
          if (this.allPages == 1) {
            this.paginateFlg = false
          } else {
            this.paginateFlg = true
          }
        })
    },
    async getRecommendArticles() {
      await this.$axios
        .get(`${this.$config.apiUrl}/blogs?limit=100`, {
          headers: {
            'X-MICROCMS-API-KEY': `${this.$config.apiKey}`,
          },
        })
        .then((res) => {
          // 注目記事に指定された記事だけを取得する。
          const recommendArticles = res.data.contents.filter((item) => {
            return item.is_recommend
          })

          this.recommendArticles = recommendArticles
        })
    },
    resetTag() {
      this.sliceArray = []
      this.getArticles()
      this.getAllPages()
      this.paginateFlg = true
      this.scrollTo('article-heading')
    },
    moveCourseShow(courseId) {
      this.$router.push(`/courses/${courseId}`)
    },
  },
}
</script>

<style lang="scss" scoped></style>
