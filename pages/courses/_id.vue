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
          <div class="progress">
            <p>
              STEP
              <span style="font-size: 1.2em">{{
                compContentsLength(this.$route.params.id)
              }}</span>
              /
              {{ stepLength }}
            </p>
          </div>
        </div>
        <div class="header-img">
          <img :src="course.img" alt="Webサイト制作コース画像" />
        </div>
      </div>
      <div class="main">
        <div class="guide">
          <ul>
            <li v-for="step in course.steps" :key="step.step">
              {{ step.title }}
            </li>
          </ul>
        </div>
        <div class="card-wrapper">
          <div class="card" v-for="step in course.steps" :key="step.step">
            <h2>STEP {{ step.step }} {{ step.title }}</h2>
            <p v-html="step.description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'BaseLayout',
  data() {
    return {
      course: {},
      stepLength: 0,
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
              title: 'VSCodeをインストールする',
              description:
                '<p>まずはコードを書くためのテキストエディタと呼ばれるファイルの中身を編集できるツールをインストールしましょう。</p><p>テキストエディタはVSCodeと呼ばれる非常に有名なものがありますので、今回はこちらをインストールしていきます。</p>',
              contents: [],
              compFlg: true,
            },
            {
              step: 2,
              title: 'HTML入門',
              description: '',
              contents: [],
              compFlg: true,
            },
            {
              step: 3,
              title: 'CSS入門',
              description: '',
              contents: [],
              compFlg: false,
            },
            {
              step: 4,
              title: 'flexboxを使ってみよう',
              description: '',
              contents: [],
              compFlg: false,
            },
            {
              step: 5,
              title: '簡単なWebサイトを作成してみよう',
              description: '',
              contentId: 1,
              contents: [],
              compFlg: false,
            },
            {
              step: 6,
              title: '少しレベルの高いWebサイトを作成してみよう',
              description: '',
              contents: [],
              compFlg: false,
            },
            {
              step: 7,
              title: 'ハイレベルなWebサイトを作成してみよう',
              description: '',
              contents: [],
              compFlg: false,
            },
            {
              step: 8,
              title: 'Webサイト制作のためのJavaScript入門',
              description: '',
              contents: [],
              compFlg: false,
            },
            {
              step: 9,
              title: 'JavaScriptで簡単なクイズアプリを作成してみよう',
              description: '',
              contents: [],
              compFlg: false,
            },
            {
              step: 10,
              title: 'JavaScriptで簡単なアニメーションを実装する',
              description: '',
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
  },
  mounted() {
    const course = this.courses.filter((item) => {
      return this.$route.params.id == item.id
    })
    this.course = course[0]
    this.stepLength = this.course.steps.length
  },
}
</script>

<style scoped></style>
