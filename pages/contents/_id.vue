<template>
    <div>
        <article>
            <div class="card">
                <div class="heading">
                    <img :src="article.eyecatch.url" alt="コンテンツ画像">
                    <span class="date">{{ article.updatedAt }}</span>
                    <h1 class="title">{{ article.title }}</h1>
                    <div class="text">
                        <div class="author">
                            <img :src="article.author.img.url" alt="プロフィール画像">
                            <nuxt-link to="#">{{ article.author.name }}</nuxt-link>
                        </div>
                        <base-tag :tags="article.category"></base-tag>
                    </div>
                </div>

                <div class="main">
                    <div class="contents" v-html="body">
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import axios from "axios"
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import BaseTag from '@/components/Tags/BaseTag.vue'

export default ({
    layout: 'BaseLayout',
    components: { BaseTag },
    data() {
        return {
            article: [],
            body: []
        }
    },
    async asyncData({ $config, params }) {
        const res = await axios.get(`${$config.apiUrl}/blogs/${params.id}`, { 
            headers: { 'X-MICROCMS-API-KEY': $config.apiKey } 
            })

        const $ = cheerio.load(res.data.content);
        $('pre code').each((_, elm) => {
            const result = hljs.highlightAuto($(elm).text());
            $(elm).html(result.value);
            $(elm).addClass('hljs');
        });
        console.log($.html());

        return {
            article: res.data,
            body: $.html()
        }
    },
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
                font-size: 1.8rem;
            }
            .text {
                display: flex;
                justify-content: space-between;
                align-items: center;
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
            .contents {
                h2 {
                  margin: 50px 0 20px 0;
                  padding-left: 20px;
                  position: relative;
                }
                h2::before {
                    content: '';
                    display: inline-block;
                    width: 5px;
                    height: 35px;
                    background: linear-gradient(rgba(132, 78, 226, 0.826), rgba(232, 130, 218, 0.849));
                    position: absolute;
                    top: 1px;
                    left: -5px;
                }
                h3 {
                    margin: 20px 0;
                }
                ul {
                    margin-left: 20px;
                    li {
                        list-style: square;
                        margin-bottom: 10px;
                    }
                }
                code {
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>
