<template>
  <div>
    Coursesのページ
    <!-- <div class="course-wrapper">
        <div class="course-heading">
          <p>コース一覧</p>
          <div class="underline"></div>
        </div>
        <div class="column">
          <div
            v-for="course in courses"
            :key="course.id"
            class="course-card"
            @click="moveCourseShow(course.id)"
          >
            <div class="course-text">
              <h2>{{ course.title }}</h2>
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
            <div class="course-img">
              <img :src="course.img" alt="コース画像" style="width: 400px" />
            </div>
          </div>
        </div>
      </div> -->
  </div>
</template>

<script>
export default ({

})
</script>

