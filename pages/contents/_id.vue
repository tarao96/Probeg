<template>
  <div>
    <!-- ヘッダー -->
    <header>
      <nuxt-link class="logo-wrapper" to="/">
        <div class="logo">
          <img src="@/assets/images/Probeg.png" alt="ロゴ画像" />
        </div>
        <h1 class="title">Probeg</h1>
      </nuxt-link>
    </header>
    <article>
      <div class="card">
        <div class="heading">
          <img :src="article.eyecatch.url" alt="コンテンツ画像" />
          <span class="date">{{ article.updatedAt | formatDate }}</span>
          <h1 class="title">{{ article.title }}</h1>
          <div class="text">
            <div class="author">
              <img :src="article.author.img.url" alt="プロフィール画像" />
              <nuxt-link to="#">{{ article.author.name }}</nuxt-link>
            </div>
            <base-tag :tags="article.category"></base-tag>
          </div>
        </div>

        <div class="main">
          <div class="contents" v-html="body"></div>
        </div>
      </div>
    </article>
    <div class="latest-articles">
      <latest-articles :articles="latestArticles"></latest-articles>
    </div>
    <div class="related-articles" v-if="articles[0]">
      <related-articles :articles="articles"></related-articles>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
import BaseTag from '@/components/Tags/BaseTag.vue'
import LatestArticles from '@/components/LatestArticles.vue'
import RelatedArticles from '@/components/RelatedArticles.vue'

export default {
  layout: 'BaseLayout',
  components: { BaseTag, LatestArticles, RelatedArticles },
  data() {
    return {
      latestArticles: [],
      article: [],
      body: [],
    }
  },
  async asyncData({ $config, params }) {
    const articleRes = await axios.get(`${$config.apiUrl}/blogs/${params.id}`, {
      headers: { 'X-MICROCMS-API-KEY': $config.apiKey },
    })

    const latestArticlesRes = await axios.get(
      `${$config.apiUrl}/blogs?limit=6`,
      {
        headers: { 'X-MICROCMS-API-KEY': $config.apiKey },
      }
    )

    const latestArticles = latestArticlesRes.data.contents.filter((item) => {
      return item.id !== params.id
    })

    const array = []
    articleRes.data.category.forEach((item) => {
      const name = item.name
      array.push(name)
    })

    const articlesByTitle = await axios.get(
      `${$config.apiUrl}/blogs?filters=title[contains]${array}`,
      {
        headers: { 'X-MICROCMS-API-KEY': $config.apiKey },
      }
    )

    const relatedArticles = articlesByTitle.data.contents.filter((item) => {
      return item.id !== params.id
    })

    const $ = cheerio.load(articleRes.data.content)
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text())
      $(elm).html(result.value)
      $(elm).addClass('hljs')
    })

    return {
      article: articleRes.data,
      body: $.html(),
      latestArticles: latestArticles,
      articles: relatedArticles,
    }
  },
}
</script>

<style lang="scss">
header {
    margin: 0px auto;
    height: 200px;
    .logo-wrapper {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      h1.title {
        font-size: 4rem;
        padding-bottom: 10px;
        background: linear-gradient(blue, pink);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .logo img {
        width: 350px;
        height: 150px;
        object-fit: cover;
      }
    }
  }
article {
  .card {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    margin: 50px auto;
    border: 1px solid rgba(182, 178, 178, 0.903);
    box-shadow: 5px 5px 7px rgba(197, 189, 189, 0.774);
    .heading {
      border-bottom: 1px solid rgba(182, 178, 178, 0.903);
      img {
        width: 100%;
      }
      span.date {
        display: block;
        color: rgba(136, 132, 132, 0.8);
        margin: 20px 30px;
        font-size: 1.2rem;
      }
      h1.title {
        padding: 0 30px;
        font-size: 1.8rem;
      }
      .text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        .author {
          display: flex;
          align-items: center;
          gap: 10px;
          img {
            width: 50px;
            border-radius: 50%;
          }
          a {
            color: black;
            text-decoration: underline;
          }
        }
        span.tag {
          display: block;
          color: rgba(136, 132, 132, 0.8);
          margin: 20px 30px;
          font-size: 1.2rem;
          border: 1px solid rgb(201, 199, 199);
        }
      }
    }
    .main {
      padding: 50px 30px;
      .contents {
        h2 {
          margin: 50px 0 20px 0;
          padding-left: 20px;
          position: relative;
        }
        h2::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 35px;
          background: linear-gradient(
            rgba(132, 78, 226, 0.826),
            rgba(232, 130, 218, 0.849)
          );
          position: absolute;
          top: 1px;
          left: -5px;
        }
        h3 {
          margin: 20px 0;
        }
        ul {
          margin-left: 20px;
          li {
            list-style: square;
            margin-bottom: 10px;
          }
        }
        code {
          margin-top: 20px;
        }
      }
    }
  }
}

.container {
  width: 90%;
  margin: 50px auto;
  .article {
    padding: 50px;
    border: 1px solid rgba(182, 178, 178, 0.903);
    box-shadow: 5px 5px 7px rgba(197, 189, 189, 0.774);
    h2 {
      position: relative;
    }
    h2::after {
      content: '';
      display: block;
      width: 110px;
      height: 4px;
      background: linear-gradient(
        to right,
        rgba(132, 78, 226, 0.826),
        rgba(232, 130, 218, 0.849)
      );
      position: absolute;
      bottom: -10px;
      left: -5px;
    }
    .row {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 30px;
      margin: 50px 0;
      .article-img {
        height: 300px;
        width: 100%;
        margin-bottom: 10px;
        padding: 0;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .card {
        display: flex;
        flex-direction: column;
        width: 30%;
        height: 500px;
        padding: 0px;
        border: 1px solid rgba(182, 178, 178, 0.903);
        box-shadow: 5px 5px 7px rgba(197, 189, 189, 0.774);
        .text {
          padding: 0px 20px;
          background-color: #fff;
          a:hover {
            opacity: 0.8;
          }
          span {
            display: block;
            color: rgba(136, 132, 132, 0.8);
            margin-bottom: 10px;
          }
          .article-title {
            margin-bottom: 10px;
            a {
              margin-bottom: 10px;
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
</style>
