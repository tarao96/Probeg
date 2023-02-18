<template>
  <div>
    <div class="recommend-wrapper">
      <p class="recommend" style="font-family: sans-serif">
        <span class="pick-up">PICK UP</span>
      </p>
      <div class="underline"></div>
    </div>
    <div class="pickup-wrapper">
      <div class="card-box">
        <div class="card" v-for="article in filterArticles" :key="article.id">
          <nuxt-link :to="'/contents/' + article.id + '/'">
            <img
              :src="article.eyecatch.url"
              class="article-img"
              alt="コンテンツ画像"
            />
          </nuxt-link>
          <div class="article-content" :href="'/contents/' + article.id + '/'">
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
      <div class="paginate-pc">
        <div
          class="paginate-hole"
          id="pc-hole1"
          @click="sliceArticles(0, 1)"
        ></div>
        <div
          class="paginate-hole"
          id="pc-hole2"
          @click="sliceArticles(3, 2)"
        ></div>
        <div
          class="paginate-hole"
          id="pc-hole3"
          @click="sliceArticles(6, 3)"
        ></div>
      </div>
      <div class="paginate-sp">
        <div
          class="paginate-hole"
          id="sp-hole1"
          @click="sliceArticles(0, 1)"
        ></div>
        <div
          class="paginate-hole"
          id="sp-hole2"
          @click="sliceArticles(1, 2)"
        ></div>
        <div
          class="paginate-hole"
          id="sp-hole3"
          @click="sliceArticles(2, 3)"
        ></div>
        <div
          class="paginate-hole"
          id="sp-hole4"
          @click="sliceArticles(3, 4)"
        ></div>
        <div
          class="paginate-hole"
          id="sp-hole5"
          @click="sliceArticles(4, 5)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTag from '../components/Tags/BaseTag.vue'

export default {
  name: 'recommend-articles',
  components: { BaseTag },
  props: {
    articles: {
      type: Array,
    },
  },
  data() {
    return {
      filterArticles: [],
      start: 0,
    }
  },
  watch: {
    articles(newArray) {
      if (window.matchMedia('(max-width: 767px)').matches) {
        //スマホ処理
        this.filterArticles = newArray.slice(this.start, this.start + 1)
        const hole1 = document.getElementById('sp-hole1')
        hole1.classList.add('active')
      } else if (window.matchMedia('(min-width:768px)').matches) {
        //PC処理
        this.filterArticles = newArray.slice(this.start, this.start + 3)
        const hole1 = document.getElementById('pc-hole1')
        hole1.classList.add('active')
      }
    },
  },
  methods: {
    sliceArticles(start, holeId) {
      this.start = start
      console.log(start)
      if (window.matchMedia('(max-width: 767px)').matches) {
        //スマホ処理
        this.filterArticles = this.articles.slice(this.start, this.start + 1)
        const actives = document.getElementsByClassName('active')
        for (let i = 0; i < actives.length; i++) {
          const e = actives[i]
          if (e) {
            e.classList.remove('active')
          }
        }
        const hole = document.getElementById(`sp-hole${holeId}`)
        hole.classList.add('active')
      } else if (window.matchMedia('(min-width:768px)').matches) {
        //PC処理
        this.filterArticles = this.articles.slice(this.start, this.start + 3)
        const actives = document.getElementsByClassName('active')
        for (let i = 0; i < actives.length; i++) {
          const e = actives[i]
          if (e) {
            e.classList.remove('active')
          }
        }
        const hole = document.getElementById(`pc-hole${holeId}`)
        hole.classList.add('active')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
