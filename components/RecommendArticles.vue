<template>
  <div>
    <div class="recommend-wrapper">
      <p class="recommend" style="font-family: sans-serif">
        <span class="pick-up">PICK UP</span>
      </p>
      <div class="underline"></div>
    </div>
    <swiper :options="swiperOption" class="pickup-wrapper">
      <swiper-slide
        class="card"
        v-for="article in articles"
        :key="article.id"
      >
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
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
    </swiper>
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
      swiperOption: {
        slidesPerView: 1,
        speed: 1000, //スライドの切り替わりスピード
        spaceBetween: 30, //各スライドの余白
        centeredSlides: true, //スライダーを真ん中に
        loop: true, //無限ループ
        autoplay: {
          //スライドの自動切り替え
          delay: 5000, //スライドの自動切り替えの秒数
          disableOnInteraction: false, //何らかのアクション後の自動切り替えを再開
        },
        breakpoints: {
          1500: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 1,
          },
          420: {
            slidesPerView: 1,
          },
        },
        pagination: {
          //ページネーション設定
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
