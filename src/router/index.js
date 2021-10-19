import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/index.vue"
import Boss from '../views/BOSS.vue'
import Team from "../views/Team.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: "/team",
        name: "Team",
        component: Team
    },
    {
        path: "/boss",
        name: "Boss",
        component: Boss
    },
]


const router = new VueRouter({
    routes
})

export default router
