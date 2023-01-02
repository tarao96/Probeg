<template>
  <div>
    <div class="article-tag">
      <div v-for="tag in tags" :key="tag.id">
        <p class="search-tag">{{ tag.name }}</p>
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
    searchByTagName(tagName) {
        this.$emit('clickTag', tagName);
    }
  }
}
</script>

<style lang="scss">
.article-tag {
    text-align: center;
    display: flex;
    gap: 5px;
    .search-tag {
        color: black;
        border: 1px solid rgb(201, 199, 199);
        width: 100%;
        padding: 5px 15px;
        transition: .4s;
    }
    .search-tag:hover {
        border: 1px solid black;
    }
}

@media screen and (max-width: 768px) {
  .article-tag {
    .search-tag {
      font-size: 0.8em;
      padding: 5px;
    }
  }
}
</style>
