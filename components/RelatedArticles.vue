<template>
  <div class="related-articles">
    <div class="container">
      <div class="article">
        <h2>関連記事</h2>
        <div class="row">
          <div v-for="article in articles" :key="article.id" class="card">
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

export default {
  name: 'related-articles',
  components: { BaseTag },
  props: {
    articles: {
      type: Array,
    },
  },
}
</script>

<style lang="scss" scoped>
.related-articles {
  .article {
    width: 65%;
    height: 100%;
    margin: 50px auto;
    transform: translateX(-15%);
    box-shadow: 0 0 8px rgb(123, 122, 122);
    .row {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 50px 0;
    gap: 50px 10px;
    .card {
      display: flex;
      flex-direction: column;
      width: 40%;
      height: 100%;
      padding: 0px;
      padding-bottom: 10px;
      border: 1px solid rgba(182, 178, 178, 0.903);
      box-shadow: 0 0 8px rgb(123, 122, 122);
      overflow: hidden;
      background-color: #fff;
      border-radius: 5%;
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
  }
}

@media screen and (max-width: 1024px) {
  .related-articles {
    .article {
      width: 90%;
      transform: translateX(0);
      padding: 50px 30px;
      h2 {
        font-size: 1.2em;
      }
      .row {
        flex-direction: column;
        margin-bottom: 0px;
        .card {
          width: 90%;
          a {
            img {
              height: 100px;
            }
          }
          .article-content {
            padding: 5px 10px;
          }
          .text {
            font-size: 0.8em;
            span {
              margin-bottom: 5px;
            }
            .article-title {
              margin-bottom: 5px;
              a {
                margin-bottom: 5px;
                font-size: 1.0em;
              }
            }
          }
        }
      }
    }
  }
}
</style>
