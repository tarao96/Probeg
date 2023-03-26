<template>
  <div class="wrapper">
    <div id="stalker"></div>
    <hamburger-menu></hamburger-menu>
    <base-heading></base-heading>
    <main>
      <!-- トップスクロール -->
      <scroll-top></scroll-top>
      <nuxt></nuxt>
    </main>
    <base-footer></base-footer>
  </div>
</template>

<script>
export default {
  mounted() {
    //マウスストーカー用のdivを取得
    const stalker = document.getElementById('stalker')

    //aタグにホバー中かどうかの判別フラグ
    let hovFlag = false

    //マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
    document.addEventListener('mousemove', function (e) {
      stalker.style.transform =
        'translate(' + e.clientX + 'px, ' + e.clientY + 'px)'
    })

    setTimeout(() => {
      const linkElem = document.querySelectorAll('a')
      console.log(linkElem)
      for (let i = 0; i < linkElem.length; i++) {
        //マウスホバー時
        linkElem[i].addEventListener('mouseover', function (e) {
          hovFlag = true

          //マウスストーカーにクラスをつける
          stalker.classList.add('hov_')
        })
        //マウスホバー解除時
        linkElem[i].addEventListener('mouseout', function (e) {
          hovFlag = false
          stalker.classList.remove('hov_')
        })
      }
    }, 1000)
  },
  watch: {
    $route(to) {
      //マウスストーカー用のdivを取得
      const stalker = document.getElementById('stalker')

      //aタグにホバー中かどうかの判別フラグ
      let hovFlag = false

      //マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
      document.addEventListener('mousemove', function (e) {
        stalker.style.transform =
          'translate(' + e.clientX + 'px, ' + e.clientY + 'px)'
      })
      setTimeout(() => {
        const linkElem = document.querySelectorAll('a')
        console.log(linkElem)
        for (let i = 0; i < linkElem.length; i++) {
          //マウスホバー時
          linkElem[i].addEventListener('mouseover', function (e) {
            hovFlag = true

            //マウスストーカーにクラスをつける
            stalker.classList.add('hov_')
          })
          //マウスホバー解除時
          linkElem[i].addEventListener('mouseout', function (e) {
            hovFlag = false
            stalker.classList.remove('hov_')
          })
        }
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
#stalker {
  pointer-events: none;
  position: fixed;
  top: -8px; //座標調節（カーソル位置と円の中心を合わせる）
  left: -8px; //座標調節（カーソル位置と円の中心を合わせる）
  width: 20px; //マウスストーカーの直径
  height: 20px; //マウスストーカーの直径
  background: #1ac067b7;
  border-radius: 50%;
  transform: translate(0, 0);
  transition: transform 0.2s; //ちょっと遅れてついてくるように
  transition-timing-function: ease-out;
  z-index: 999;
  &.hov_ {
    top: -32px; //大きさに合わせて座標調節
    left: -32px; //大きさに合わせて座標調節
    width: 40px;
    height: 40px;
    transition: 0.2s;
    background: rgba(255, 0, 0, 0.4);
  }
}
@media screen and (max-width: 768px) {
  #stalker {
    display: none;
  }
}
</style>
