<template>
  <div>
    <div class="hamburger-wrapper" v-show="!isShow" @click="isShow = !isShow">
      <div class="hamburger">
        <div class="border"></div>
        <div class="border"></div>
        <div class="border"></div>
      </div>
    </div>
    <div class="menu-wrapper" v-show="isShow">
      <div class="menu">
        <div class="menu-head" @click="isShow = !isShow">
          <p>MENU</p>
          <span class="close-btn"></span>
        </div>
        <ul class="menu-list">
          <li class="menu-item">
            <nuxt-link to="/">
              <ion-icon name="home-outline"></ion-icon>
              Home
            </nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/tags">
              <ion-icon name="pricetags-outline"></ion-icon>
              Tags
            </nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/about">
              <ion-icon name="book-outline"></ion-icon>
              About
            </nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/author/1">
              <ion-icon name="person-outline"></ion-icon>
              Administrator
            </nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/courses/1">
              <ion-icon name="trail-sign-outline"></ion-icon>
              Courses
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hamburger-menu',
  data() {
    return {
      isShow: false,
    }
  },
}
</script>
