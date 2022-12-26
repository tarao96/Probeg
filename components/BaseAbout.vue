<template>
  <div>
    <div class="about">
      <div class="about-title">
        <p>About</p>
      </div>

      <div class="about-wrapper">
        <p>
          "Probeg"はプログラミング初学者に向けた、Web開発・Web制作に関するコンテンツを配信する技術ブログです。
        </p>
        <br />
        <p>
          当サイトはNuxt.jsとheadlessCMSで構築し、Netlifyから配信しています。
        </p>
        <br />
        <p>
          記事中の絵文字は<a href="https://joypixels.com/">EmojiOne</a
          >にて無料配布されています。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.about {
  height: 320px;
  background: linear-gradient(
    to right,
    rgba(83, 102, 212, 0.855),
    rgb(3, 205, 212)
  );
  display: flex;
  flex-direction: column;
  color: white;
  .about-title {
    text-align: center;
    margin: 50px auto;
    width: 80px;
    padding-bottom: 10px;
    border-bottom: 2px solid #fff;
    p {
      font-size: 1.5rem;
    }
  }
  .about-wrapper {
    width: 60%;
    margin: 0 auto;
    text-align: center;
    p a {
      color: white;
      text-decoration: underline;
    }
  }
}
</style>
