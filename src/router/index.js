import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../views/index.vue"
import Boss from "../views/BOSS.vue"
import Team from "../views/Team.vue"
import videoCover1 from "../views/VideoCover1.vue"
import videoCover2 from "../views/VideoCover2.vue"
import videoCover3 from "../views/VideoCover3.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Index",
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
    {
        path: "/videoCover1",
        name: "videoCover1",
        component: videoCover1
    },
    {
        path: "/videoCover2",
        name: "videoCover2",
        component: videoCover2
    },
    {
        path: "/videoCover3",
        name: "videoCover3",
        component: videoCover3
    }
]


const router = new VueRouter({
    routes
})

export default router
