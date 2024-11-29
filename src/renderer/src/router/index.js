import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: {
            // 使用一个简单的临时组件执行跳转逻辑
            render() {
                window.location.href = 'https://chat.openai.com/chat'
            }
        }
    },
    {
        path: '/loading',
        component: () => import('../views/Loading.vue')
    },
    {
        path: '/error',
        component: () => import('../views/Error.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
