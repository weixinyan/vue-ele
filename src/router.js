import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import goods from './components/goods/goods.vue'
import sellers from './components/sellers/seller.vue'
import ratings from './components/ratings/ratings.vue'
const routes = [
    {
        path: '/',
        redirect: '/goods'
    },
    {
        path: '/goods',
        component: goods
    },
    {
        path: '/sellers',
        component: sellers
    },
    {
        path: '/ratings',
        component: ratings
    }
]

const router = new VueRouter({
    routes: routes ,  // (缩写) 相当于 routes: routes
    linkActiveClass: 'active'
})

export default router;


