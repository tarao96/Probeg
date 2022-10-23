<template>
    <div>
        <div class="container">
            <div class="article">
                <h2>最新記事</h2>
                <div class="row">
                    <div v-for="article in articles" :key="article.id" class="card">
                        <div class="text">
                            <a :href="'/contents/' + article.id + '/'">
                                <div class="article-img">
                                    <img :src="article.eyecatch.url" class="article-img" alt="コンテンツ画像">
                                </div>
                                <span>{{ article.updatedAt | formatDate }}&emsp;{{ article.author.name }}</span>
                                <div class="article-title">
                                    <nuxt-link to="/contents" class="content-title"><b>{{ article.title }}</b></nuxt-link>
                                </div>
                            </a>
                            <base-tag :tags="article.category"></base-tag>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseTag from '@/components/Tags/BaseTag.vue'

export default ({
    name: 'latest-articles',
    components: { BaseTag },
    props: {
        articles: {
            type: Array,
        }
    }
})
</script>

<style lang="scss">
</style>
