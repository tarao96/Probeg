<template>
  <div>
    <div class="hamburger-wrapper" v-show="!isShow" @click="changeShow">
      <div class="hamburger">
        <div class="border"></div>
        <div class="border"></div>
        <div class="border"></div>
      </div>
    </div>
    <transition>
      <div class="menu-wrapper">
        <div class="menu" :class="{'is-active': isShow}">
          <div class="menu-head" @click="changeShow">
            <p>MENU</p>
            <span class="close-btn"></span>
          </div>
          <ul class="menu-list">
            <li class="menu-item">
              <span @click="movePage('/')">
                <ion-icon name="home-outline"></ion-icon>
                Home
              </span>
            </li>
            <li class="menu-item">
              <span @click="movePage('/tags')">
                <ion-icon name="pricetags-outline"></ion-icon>
                Tags
              </span>
            </li>
            <li class="menu-item">
              <span @click="movePage('/about')">
                <ion-icon name="book-outline"></ion-icon>
                About
              </span>
            </li>
            <li class="menu-item">
              <span @click="movePage('/author/1')">
                <ion-icon name="person-outline"></ion-icon>
                Administrator
              </span>
            </li>
            <!-- <li class="menu-item">
              <span @click="movePage('/courses/1')">
                <ion-icon name="trail-sign-outline"></ion-icon>
                Courses
              </span>
            </li> -->
          </ul>
        </div>
      </div>
    </transition>
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
  methods: {
    changeShow() {
      this.isShow = !this.isShow
    },
    movePage(url) {
      this.isShow = false
      this.$router.push(url)
    },
  },
}
</script>
