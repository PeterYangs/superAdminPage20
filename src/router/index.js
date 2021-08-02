import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/main',
        component: () => import('../components/Main.vue'),
        children: [
            {
                path: 'rule_edit',
                component: () => import('../components/admin/rule_edit.vue')
            },
            {
                path: 'rule_list',
                component: () => import('../components/admin/rule_list.vue')
            },
            {
                path: 'role_edit',
                component: () => import('../components/admin/role_edit.vue')
            },
        ]
    },
    {
        path: "/hello",
        component: () => import("../components/HelloWorld.vue")

    },
    {
        path: "/login",
        component: () => import('../components/login/Login.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router