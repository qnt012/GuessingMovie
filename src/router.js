import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'app',
            component: () => import("./views/Home.vue")
        },
        {
            path: '/board',
            name: 'board',
            component: () => import("./views/Board.vue")
        },
        {
            path: '/result',
            name: 'result',
            component: () => import("./views/Result.vue"),
            props: true
        }
    ]
})
