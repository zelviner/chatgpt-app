<script setup>

</script>

<template>
    <div class="loading">
        <img src="@public/image/chatgpt.ico" alt="ChatGPT">
        <div class="spinner"></div>
    </div>
</template>

<style lang="scss" scoped>
.loading {
    text-align: center;

    img {
        width: 100px;
        /* 图标宽度 */
        height: 100px;
        /* 图标高度 */
        margin-bottom: 20px;
    }

    .spinner {
        width: 40px;
        /* 圆环大小 */
        height: 40px;
        border: 4px solid transparent;
        /* 内外边框透明 */
        border-top: 4px solid #18193F;
        /* 顶部边框颜色 */
        border-radius: 50%;
        /* 圆形 */
        animation: spin 1s linear infinite;
        /* 旋转动画 */
        margin: 0 auto;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

}
</style>