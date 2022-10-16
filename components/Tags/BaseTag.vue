<template>
    <div>
        <div class="article-tag">
            <nuxt-link to="#" v-for="tag in tags" :key="tag.id">{{ tag }}</nuxt-link>
        </div>
    </div>
</template>

<script>
export default ({
    props: {
        tags: {
            type: Array
        }
    }
})
</script>

<style lang="scss">
.article-tag a {
    color: black;
    border: 1px solid rgb(201, 199, 199);
    margin-right: 10px;
}
.article-tag a:hover {
    border: 1px solid black;
}
</style>