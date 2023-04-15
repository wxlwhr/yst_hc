import { createRouter,createWebHistory } from "vue-router";

const routerHistory = createWebHistory()

const router = createRouter({
    history:routerHistory,
    routes:[
        {
            path:"/",
            redirect:"shop",
        },
        {
            path:"/home",
            name:"home",
            component:()=>import('@/views/home/index.vue'),
            children:[
                {
                    path:"/shop",
                    name:"Shop",
                    component:()=>import('@/views/shop/index.vue')
                },
                {
                    path:"/clinic",
                    name:"Clinic",
                    component:()=>import('@/views/clinic/index.vue')
                }
            ]
        },
        {
            path:"/login",
            name:"login",
            component:()=>import('@/views/login/index.vue')
        },
        
    ]
})

export default router