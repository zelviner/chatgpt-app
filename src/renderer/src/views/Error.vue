<script setup>


const retry = () => {
    console.log('send retry');

    window.electron.ipcRenderer.send('retry')
}

</script>

<template>
    <div class="error">
        <!-- 图标 -->
        <img src="@public/image/chatgpt.ico" alt="ChatGPT">
        <!-- 错误标题 -->
        <h1>连接错误!</h1>
        <!-- 错误提示信息 -->
        <p>我们无法加载页面，请检查您的网络连接并重试。</p>
        <!-- 重试按钮 -->
        <button @click="retry()">重试</button>

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