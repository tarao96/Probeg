<template>
  <div>
    <div class="tags">
      <div class="tags-title">
        <p>Tags</p>
      </div>

      <div class="tags-wrapper">
        <ul>
          <li v-for="tag in tags" :key="tag.id">
            <p v-on:click="sendTagName(tag.name)">{{ tag.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
    },
  },
  methods: {
    sendTagName(tagName) {
      console.log('sendTagNameメソッドが発火しました')
      this.$emit('clickTag', tagName)
    },
  },
}
</script>

<style lang="scss">
.tags {
  background: linear-gradient(
    to right,
    rgba(132, 78, 226, 0.826),
    rgba(232, 130, 218, 0.849)
  );
  display: flex;
  flex-direction: column;
  color: white;
  height: 100%;
  margin-top: 50px;
  padding-bottom: 50px;
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
  .tags-wrapper {
    width: 60%;
    margin: 0 auto;
    ul {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      li {
        margin-bottom: 20px;
        p {
          padding: 5px 10px;
          color: white;
          border: 1px solid white;
          transition: .3s;
          cursor: pointer;
        }
        p:hover {
          background-color: white;
          color: rgba(132, 78, 226, 0.826);
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .tags {
    .tags-wrapper {
      width: 90%;
    }
  }
}
</style>
