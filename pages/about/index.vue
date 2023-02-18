<template>
  <div class="about">
    <article>
      <div class="card">
        <div class="heading">
          <div class="text">
            <div class="about">
              <h1>About</h1>
            </div>
          </div>
        </div>

        <div class="main">
          <div class="contents">
            <h2>コンセプト</h2>
            <p>
              当サイトは「初学者にもわかりやすい記事を丁寧に」をモットーに記事制作を行なっております。<br />初学者目線でできる限りわかりやすく丁寧に解説するように意識して制作しております。<br />
              筆者自身が初学者だった頃にわかりやすい技術記事をなかなか見つけることができず苦労した経験から初学者の力になりたいと当サイトを立ち上げました。
            </p>
            <h2>使い方</h2>
            <p>
              ホーム画面では投稿記事一覧や注目記事を閲覧できます。<br />
              また、タグ画面からタグを選択することでタグ検索を行うことができます。<br />ご自身の興味のあるタグで検索を行うと目的の記事が見つかりやすくなるかと思います。<br />
              また、学習コースを用意しています。<br />現時点ではWebサイト制作コースを用意しており、Webサイト制作に必要な知識を効率よく学習できるように学習記事のロードマップを用意しました。<br />
              今後より幅広い学習コースを用意する予定ですので、追加した際はお知らせしようと思います。<br />
              ぜひご活用ください。
            </p>
            <h2>サイト構成</h2>
            <p>
              当サイトは一般的によくあるWordPressの構成ではなく、Nuxt.jsとheadlessCMSを組み合わせて自作しております。<br />
              また、当サイトはNetlifyから配信しております。<br />
              現時点では一部機能が不足していますが、今後順次機能を追加していく予定ですので、その際はまたお知らせしようと思います。<br />
              よろしくお願い致します。
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  layout: 'BaseLayout',
  data() {
    return {
      about: {},
    }
  },
  async asyncData({ $axios, $config }) {
    const about = await $axios.get(`${$config.apiUrl}/blogs?limit=100`, {
      headers: {
        'X-MICROCMS-API-KEY': `${$config.apiKey}`,
      },
    })

    const aboutArticles = about.data.contents.filter((item) => {
      return item.is_about
    })

    return {
      about: aboutArticles,
    }
  },
}
</script>
