<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const retry = () => {
    router.push('/')
}

</script>

<template>
    <div class="error">
        <!-- 图标 -->
        <img src="@public/image/chatgpt.ico" alt="ChatGPT">
        <!-- 错误标题 -->
        <h1>Oops! Connection Error</h1>
        <!-- 错误提示信息 -->
        <p>We couldn't load the page. Please check your internet connection and try again.</p>
        <!-- 重试按钮 -->
        <button @click="retry()">Retry</button>
    </div>
</template>

<style lang="scss" scoped>
.error {
    text-align: center;

    img {
        width: 100px;
        /* 图标宽度 */
        height: 100px;
        /* 图标高度 */
        margin-bottom: 20px;
    }

    h1 {
        margin-bottom: 10px;
        font-size: 24px;
    }

    p {
        font-size: 16px;
        color: #666;
        margin-bottom: 20px;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #ff6b6b;
        /* 按钮背景色 */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #e55d5d;
        /* 按钮悬停背景色 */
    }
}
</style>