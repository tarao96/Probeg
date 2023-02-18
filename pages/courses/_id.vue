<template>
  <div id="course">
    <div class="container">
      <div class="header">
        <div class="header-text">
          <h1>{{ course.title }}</h1>
          <div v-html="course.description"></div>
          <div class="language-wrapper">
            <p class="language-heading">対象言語:</p>
            <div class="language">
              <p v-for="(language, index) in course.languages" :key="index">
                {{ language }}
              </p>
            </div>
          </div>
        </div>
        <div class="header-img">
          <img :src="course.img" alt="Webサイト制作コース画像" />
        </div>
      </div>
      <div class="main">
        <div class="guide">
          <ul>
            <li
              v-for="step in course.steps"
              :key="step.step"
              @click="scrollTo(step.step)"
            >
              {{ step.title }}
            </li>
          </ul>
        </div>
        <div class="card-wrapper">
          <div
            class="card"
            :id="`card${step.step}`"
            v-for="(step, index) in course.steps"
            :key="step.step"
          >
            <h2 class="step-heading">STEP {{ step.step }} {{ step.title }}</h2>
            <div class="description">
              <p v-html="step.description"></p>
            </div>
            <div v-if="step.contents.eyecatch" class="contents">
              <img
                :src="step.contents.eyecatch.url"
                alt=""
                class="contents-img"
              />
              <div class="contents-text">
                <span>{{ step.contents.title }}</span>
                <div v-html="step.contents.content"></div>
              </div>
              <nuxt-link
                v-if="step.contents.id"
                :to="'/contents/' + step.contents.id + '/'"
                >続きを読む</nuxt-link
              >
            </div>
            <div v-if="course.steps.length - 1 !== index" class="triangle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'BaseLayout',
  async asyncData({ $axios, route, $config }) {
    const url = `${$config.apiUrl}/blogs?limit=100&filters=`
    const params = {
      limit: 100,
      filters: `course_id[equals]${route.params.id}`,
    }

    const responses = await $axios.get(url, {
      params,
      headers: { 'X-MICROCMS-API-KEY': `${$config.apiKey}` },
    })
    return {
      apiResponses: responses.data.contents,
    }
  },
  async mounted() {
    const course = this.courses.filter((item) => {
      return this.$route.params.id == item.id
    })
    this.course = course[0]
    this.stepLength = this.course.steps.length
    // データ内のタイトルと一致するコンテンツがあればコンテンツ配列に格納する
    if (this.course) {
      this.course.steps.forEach((item) => {
        this.apiResponses.forEach((data) => {
          if (item.title == data.title) {
            item.contents = data
          }
        })
      })
    }
  },
  data() {
    return {
      course: {},
      stepLength: 0,
      apiResponses: [],
      courses: [
        {
          id: 1,
          title: 'Webサイト制作コース',
          description:
            '<p>このコースではWebサイトを制作するために必要となる知識やテクニックなどを順を追って学習していきます。</p><p>コースを全て終えればWebサイトを実際に作れるように設計しています。</p>',
          img: require('@/assets/images/web_site.jpg'),
          courseArticles: [],
          languages: ['HTML', 'CSS', 'JavaScript'],
          steps: [
            {
              step: 1,
              title: 'HTML入門',
              description: '<p>HTMLはWebサイトを構成するための最も基本的な言語で、文字や画像といった要素を生成します。</p><p>まずはHTMLがどのようものか基本的な知識を学習しましょう。</p>',
              contents: [],
              compFlg: true,
            },
            {
              step: 2,
              title: 'CSS入門',
              description: '<p>CSSはHTML要素に対して装飾するための言語です。</p><p>Webサイト制作においては最も重要な言語といっても過言ではありません。</p><p>まずはCSSでどのようなことができるのか基本的な知識を学習しましょう。</p>',
              contents: [],
              compFlg: false,
            },
            {
              step: 3,
              title: 'flexboxを使ってみよう',
              description: '<p>flexboxはCSSで非常によく使われるレイアウトモジュールです。</p><p>flexboxを使うことによって要素の横並びや縦並び、中央寄せなどを非常に簡単に実現することができます。</p><p>Webサイト制作では必須となるため、ここで身につけておきましょう。</p>',
              contents: [],
              compFlg: false,
            },
            {
              step: 4,
              title: '簡単なWebサイトを作成してみよう',
              description: '<p>いよいよ実践編です。</p><p>これまで学習してきた基礎的な知識を組み合わせて実際に簡単なWebサイトを一緒に作っていきましょう。</p><p>Webサイト制作に必要となる考え方なども解説してきます。</p>',
              contentId: 1,
              contents: [],
              compFlg: false,
            },
            {
              step: 5,
              title: '少しレベルの高いWebサイトを作成してみよう',
              description: '<p>少しレベルの高いWebサイトの制作に挑戦してみましょう。</p><p>Webサイトを制作する過程でHTML/CSSの理解を深め、使いこなせるようにしていきます。</p>',
              contents: [],
              compFlg: false,
            },
            {
              step: 6,
              title: 'ハイレベルなWebサイトを作成してみよう',
              description: '<p>実際のWebサイト制作案件に近いレベルのWebサイトを制作していきます。</p><p>ここではWebサイト制作における実践的なテクニックなどもご紹介します。</p><p>このステップを完了すれば、かなりHTML/CSSを使いこなせるようになっているでしょう。</p>',
              contents: [],
              compFlg: false,
            },
            {
              step: 7,
              title: 'Webサイト制作のためのJavaScript入門',
              description: '<p>ここからはWebサイトにアニメーションなどの動きをつけるためにJavaScriptというプログラミング言語を学習していきます。</p><p>まずはJavaScriptがどういった言語なのか基本的な学習から始めます。</p>',
              contents: [],
              compFlg: false,
            },
            {
              step: 8,
              title: 'JavaScriptで簡単なクイズアプリを作成してみよう',
              description: '<p>JavaScriptを使いこなせるようにするために、JavaScriptで簡単なクイズアプリを作ってみましょう。</p><p>このアプリ制作を通じてJavaScriptへの理解を深めます。</p>',
              contents: [],
              compFlg: false,
            },
            {
              step: 9,
              title: 'JavaScriptで簡単なアニメーションを実装する',
              description: '<p>最後のステップではWebサイト制作におけるJavaScriptの使われ方について見ていきます。</p><p>JavaScriptを使って実際にWebサイトに動きをつけてみます。</p><p>このステップを完了すれば、動きをつけたモダンなWebサイトの制作までできるようになっているはずです。</p>',
              contents: [],
              compFlg: false,
            },
          ],
        },
        {
          id: 2,
          title: 'Webアプリ開発コース',
          description:
            '<p>このコースではWebアプリ開発に必要となる知識を学習することができます。</p><p>PHP/Laravelを使いこなして簡単なWebアプリを開発してみましょう！</p>',
          img: require('@/assets/images/web_app.jpg'),
          courseArticles: [],
          languages: ['HTML', 'CSS', 'PHP', 'Laravel'],
          steps: [
            {
              step: 1,
              title: 'PHP入門',
              description: '',
              contents: [],
              compFlg: false,
            },
          ],
        },
      ],
    }
  },
  methods: {
    compContentsLength(courseId) {
      const webSiteCourse = this.courses.filter((item) => {
        return item.id == courseId
      })
      const webSiteStep = webSiteCourse[0].steps
      const compWebSiteStep = webSiteStep.filter((item) => {
        return item.compFlg
      })
      return compWebSiteStep.length
    },
    scrollTo(step) {
      const element = document.getElementById(`card${step}`)
      element.scrollIntoView({
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style scoped></style>
