<template>
    <div>
        <div class="container">
            <div class="article">
                <h2>関連記事</h2>
                <div class="row">
                  <div v-for="article in articles" :key="article.id" class="card">
                      <a :href="'/contents/' + article.id + '/'">
                        <img :src="article.eyecatch.url" class="article-img" alt="コンテンツ画像">
                      </a>
                      <a class="article-content" :href="'/contents/' + article.id + '/'">
                        <div class="text">
                          <span>{{ article.updatedAt | formatDate }}&emsp;{{ article.author.name }}</span>
                          <div class="article-title">
                            <nuxt-link to="/contents" class="content-title"><b>{{ article.title }}</b></nuxt-link>
                          </div>
                        </div>
                      </a>
                      <div class="tag">
                        <base-tag :tags="article.category"></base-tag>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseTag from '@/components/Tags/BaseTag.vue'

export default ({
    name: 'related-articles',
    components: { BaseTag },
    props: {
        articles: {
            type: Array,
        }
    }
})
</script>

<style lang="scss" scoped>
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
        .tag {
          padding: 0 10px;
        }
        .article-content {
          padding: 10px;
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
</style>
