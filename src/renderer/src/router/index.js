import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: () => {
            window.location.href = 'https://chat.openai.com/chat';  // 直接跳转到外部网址
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
    history: createWebHistory(),
    routes
})

export default router