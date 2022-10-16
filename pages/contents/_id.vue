<template>
    <div>
        <article>
            <div class="card">
                <div class="heading">
                    <img src="https://picsum.photos/id/1005/5760/3840" alt="コンテンツ画像">
                    <span class="date">{{ heading.date }}</span>
                    <h1 class="title">{{ heading.title }}</h1>
                    <div class="text">
                        <div class="author">
                            <img :src="heading.authorImg" alt="プロフィール画像">
                            <nuxt-link to="#">{{ heading.author }}</nuxt-link>
                        </div>
                        <base-tag :tags="heading.tags"></base-tag>
                    </div>
                </div>

                <div class="main">
                    <div class="intro">
                        <p>{{ intro.body }}</p>
                    </div>
                    <div v-for="content in mainContents" :key="content.id" class="section">
                        <div class="main-heading1">
                            <div class="decoration"></div>
                            <h1>{{ content.h1 }}</h1>
                        </div>
                        <p>{{ content.body1 }}</p>
                        <div class="main-heading2">
                            <h2>{{ content.h2 }}</h2>
                        </div>
                        <p>{{ content.body2 }}</p>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import BaseTag from '@/components/Tags/BaseTag.vue'
export default ({
    layout: 'BaseLayout',
    components: { BaseTag },
    data() {
        return {
            heading:
                {
                    id: 1,
                    contentsImg: '',
                    date: '2022.10.15',
                    title: 'コンテンツのタイトル',
                    authorImg: require('@/assets/images/self-portrait.JPG'),
                    author: 'Keito Shitara',
                    tag: 'Laravel',
                    h1: '見出し',
                    p: '本文',
                    tags: ['Laravel', 'Vue']
                },
            intro: {
                body: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト'
            },
            mainContents: [
                {
                    id: 1,
                    h1: '大見出し',
                    body1: '文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。',
                    h2: '小見出し',
                    body2: '文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。'
                },
                {
                    id: 2,
                    h1: '大見出し',
                    body1: '文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。',
                    h2: '小見出し',
                    body2: '文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。'
                },
                {
                    id: 3,
                    h1: '大見出し',
                    body1: '文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。',
                    h2: '小見出し',
                    body2: '文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。'
                },
            ]
        }
    }
})
</script>

<style lang="scss">
article {
    .card {
        display: flex;
        flex-direction: column;
        width: 60%;
        height: 100%;
        margin: 50px auto;
        border: 1px solid rgba(182, 178, 178, 0.903);
        box-shadow: 5px 5px 7px rgba(197, 189, 189, 0.774);
        .heading {
            border-bottom: 1px solid rgba(182, 178, 178, 0.903);
            img {
                width: 100%;
            }
            span.date {
                display: block;
                color: rgba(136, 132, 132, 0.8);
                margin: 20px 30px;
                font-size: 1.2rem;
            }
            h1.title {
                padding: 0 30px;
            }
            .text {
                display: flex;
                justify-content: space-between;
                padding: 20px 30px;
                .author {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    img {
                        width: 50px;
                        border-radius: 50%;
                    }
                    a {
                        color: black;
                        text-decoration: underline;
                    }
                }
                span.tag {
                    display: block;
                    color: rgba(136, 132, 132, 0.8);
                    margin: 20px 30px;
                    font-size: 1.2rem;
                    border: 1px solid rgb(201, 199, 199);
                }
            }
        }
        .main {
            padding: 50px 30px;
            .section {
                padding: 50px 0;
                .main-heading1 {
                    margin-bottom: 20px;
                    display: flex;
                    gap: 20px;
                    .decoration {
                        height: 35px;
                        width: 7px;
                        background: linear-gradient(rgba(132, 78, 226, 0.826), rgba(232, 130, 218, 0.849));
                    }
                }
                .main-heading2 {
                    padding: 50px 0 10px 0;
                    margin-bottom: 20px;
                    border-bottom: 1px solid rgb(201, 199, 199);
                }
            }
        }
    }
}
</style>
