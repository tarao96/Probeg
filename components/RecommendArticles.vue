<template>
  <div>
    <div class="recommend-wrapper">
      <p class="recommend" style="font-family: sans-serif">
        <span class="pick-up">PICK UP | </span> 注目記事
      </p>
      <div class="underline"></div>
    </div>
    <hooper
      :playSpeed="5000"
      :autoPlay="true"
      :itemsToShow="1"
      :itemsToSlide="1"
      :transition="1000"
    >
      <slide v-for="article in articles" :key="article.id">
        <div class="card">
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
            <base-tag :tags="article.category" @clickTag="searchTag"></base-tag>
          </div>
        </div>
      </slide>
    </hooper>
  </div>
</template>

<script>
import BaseTag from '../components/Tags/BaseTag.vue'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  name: 'recommend-articles',
  components: { BaseTag, Hooper, Slide },
  props: {
    articles: {
      type: Array,
    }
  }
}
</script>

<style lang="scss" scoped></style>
