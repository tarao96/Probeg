<template>
<div>
  <div class="container">
    <div class="article">
      <div class="row">
        <div v-for="article in searchArticles" :key="article.id" class="card">
          <div class="text">
            <nuxt-link :to="`/contents/` + article.id">
              <div class="article-img">
                <img :src="article.img" class="article-img" alt="コンテンツ画像">
              </div>
              <span>{{ article.date }}&emsp;{{ article.author }}</span>
              <div class="article-title">
                <nuxt-link to="/contents" class="content-title"><b>{{ article.title }}</b></nuxt-link>
              </div>
            </nuxt-link>
            <base-tag :tags="article.tags"></base-tag>
          </div>
        </div>
      </div>

      <div class="paginate">
        <nuxt-link to="#">
          <div class="icon">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <span>Newer</span>
        </nuxt-link>

        <p>1/7</p>

        <nuxt-link to="#">
          <span>Older</span>
          <div class="icon">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>

  <base-tags 
    :tags="tags"
    @clickTag="searchTag"></base-tags>
  
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
      articles: [
        {
          id: 1, img: 'https://picsum.photos/id/237/200/300', date: '2022.10.15', author: 'Keito Shitara', title: 'LaravelでToDoアプリを開発する', name: 'Laravel'
        },
        {
          id: 2, img: 'https://picsum.photos/id/1010/5184/3456', date: '2022.10.14', author: 'Keito Shitara', title: 'Nuxt.jsでToDoアプリを開発する', name: 'Vue.js' 
        },
        {
          id: 3, img: 'https://picsum.photos/id/1005/5760/3840', date: '2022.10.13', author: 'Keito Shitara', title: 'HTML/CSS入門', name: 'HTML' 
        },
      ],
      searchArticles: [],
      tags: [
        {id: 1, name: 'Laravel'},
        {id: 2, name: 'Vue.js'},
        {id: 3, name: 'HTML'},
        {id: 4, name: 'CSS'},
        {id: 5, name: 'WordPress'},
        {id: 6, name: 'PHP'},
        {id: 7, name: 'Laravel'},
        {id: 8, name: 'Ruby'},
        {id: 9, name: 'Ruby on Rails'},
        {id: 10, name: 'Git'},
        {id: 11, name: 'AWS'}
      ]
    }
  },
  computed: {
    searchTag(tagName) {
      console.log('searchTagが発火しました');
      const newArticles = this.articles.filter((article) => {
        return article.name.indexOf(tagName) !== -1;
      });
      console.log(newArticles);
      this.searchArticles = newArticles;
    }
  },
  async asyncData({ app })
}
</script>

<style lang="scss">
main {
  width: 100%;
  margin: 0 auto;
  .container {
    width: 90%;
    margin: 50px auto;
    .article .row {
      display: flex;
      justify-content: space-around;
      margin: 50px 0;
      .card {
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 600px;
        padding: 10px;
        border: 1px solid rgba(182, 178, 178, 0.903);
        box-shadow: 5px 5px 7px rgba(197, 189, 189, 0.774);
        .text {
          padding: 20px 30px 40px 30px;
          background-color: #fff;
          a:hover {
            opacity: 0.8;
          }
          .article-img {
            height: 300px;
            margin-bottom: 20px;
            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
          span {
            display: block;
            color: rgba(136, 132, 132, 0.8);
            margin-bottom: 20px;
          }
          .article-title{
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
      display: flex;
      justify-content: space-between;
      a {
        display: flex;
        justify-content: space-between;
        background-color: white;
        color: black;
        border: 1px solid black;
        .icon {
          padding-top: 3px;
        }
      }
      a:hover {
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
