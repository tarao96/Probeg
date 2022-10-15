<template>
  <div class="wrapper">
    <base-heading></base-heading>
    <main>
      <div class="container">
        <div class="article">
          <div class="row">
            <div class="card">
              <nuxt-link to="/contents" class="content-img">
                <img src="https://picsum.photos/id/237/200/300" alt="コンテンツ画像">
              </nuxt-link>
              <div class="text">
                <span>2022.10.15&emsp;Keito Shitara</span>
                <div class="content-title">
                  <nuxt-link to="/contents" class="content-title"><b>LaravelでToDoアプリを作成する</b></nuxt-link>
                </div>
                <div class="content-tag">
                  <nuxt-link to="#">Laravel</nuxt-link>
                  <nuxt-link to="#">Vue</nuxt-link>
                </div>
              </div>
            </div>

            <div class="card">
              <img src="https://picsum.photos/id/237/200/300" alt="コンテンツ画像">
              <div class="text">
                <span>2022.10.15&emsp;Keito Shitara</span>
                <p><b>LaravelでToDoアプリを作成する</b></p>
                <nuxt-link to="#">Laravel</nuxt-link>
              </div>
            </div>

            <div class="card">
              <img src="https://picsum.photos/id/237/200/300" alt="コンテンツ画像">
              <div class="text">
                <span>2022.10.15&emsp;Keito Shitara</span>
                <p><b>LaravelでToDoアプリを作成する</b></p>
                <nuxt-link to="#">Laravel</nuxt-link>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="card">
              <img src="https://picsum.photos/id/1010/5184/3456" alt="コンテンツ画像">
              <div class="text">
                <span>2022.10.15&emsp;Keito Shitara</span>
                <p><b>LaravelでToDoアプリを作成する</b></p>
                <nuxt-link to="#">Laravel</nuxt-link>
              </div>
            </div>

            <div class="card">
              <img src="https://picsum.photos/id/1010/5184/3456" alt="コンテンツ画像">
              <div class="text">
                <span>2022.10.15&emsp;Keito Shitara</span>
                <p><b>LaravelでToDoアプリを作成する</b></p>
                <nuxt-link to="#">Laravel</nuxt-link>
              </div>
            </div>

            <div class="card">
              <img src="https://picsum.photos/id/1010/5184/3456" alt="コンテンツ画像">
              <div class="text">
                <span>2022.10.15&emsp;Keito Shitara</span>
                <p><b>LaravelでToDoアプリを作成する</b></p>
                <nuxt-link to="#">Laravel</nuxt-link>
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

      <div class="tags">
        <div class="tags-title">
          <p>Tags</p>
        </div>

        <div class="tags-wrapper">
          <ul>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
            <li><nuxt-link to="#">Laravel</nuxt-link></li>
          </ul>
        </div>
      </div>

      <div class="about">
        <div class="about-title">
          <p>About</p>
        </div>

        <div class="about-wrapper">
          <p>"Probeg"はプログラミング初学者に向けた、Web開発・Web制作に関するコンテンツを配信する技術ブログです。</p>
          <br>
          <p>当サイトはNuxt.jsとheadlessCMSで構築し、Netlifyから配信しています。</p><br>
          <p>記事中の絵文字は<a href="https://joypixels.com/">EmojiOne</a>にて無料配布されています。</p>
        </div>
      </div>
    </main>

    <base-footer></base-footer>
    
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
*, ::before, ::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  // background-color: #f2f4fb;
  background-color: white;
  font-family: Avenir,Hiragino Sans Gothic ProN,Meiryo,sans-serif;
}

a {
  text-decoration: none; 
  padding: 8px 15px;
}

li {
  list-style: none;
}

.wrapper {
  width: 100%;
}

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
        height: 500px; 
        box-shadow: 3px 3px 5px rgba(197, 189, 189, 0.774);
        .content-img {
          height: 300px;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .text {
          padding: 20px 30px 50px 30px;
          background-color: #fff;
          span {
            display: block;
            color: rgba(136, 132, 132, 0.8);
            margin-bottom: 20px;
          }
          .content-tag a {
            color: black;
            border: 1px solid rgb(201, 199, 199);
          }
          .content-tag a:hover {
            border: 1px solid black;
          }
          .content-title{
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
  .about {
    height: 320px;
    background: linear-gradient(to right, rgba(83, 102, 212, 0.855), rgb(3, 205, 212));
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
  .tags {
    background: linear-gradient(to right, rgba(132, 78, 226, 0.826), rgba(232, 130, 218, 0.849));
    display: flex;
    flex-direction: column;
    color: white;
    height: 320px;
    margin: 0;
    .tags-title {
      text-align: center;
      margin: 50px auto;
      width: 60px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fff;
      p {
        font-size: 1.5rem;
      }
    }
    .tags-wrapper
    { 
      width: 60%;
      margin: 0 auto;
      ul {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        li {
          margin-bottom: 20px;
          a {
            color: white;
            border: 1px solid white;         
          }
          a:hover {
            background-color: white;
            color: rgba(132, 78, 226, 0.826);
          }
        } 
      }
    }
  }
}
</style>
