import {createRouter, createWebHistory} from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'Index',
        redirect: {name: 'admin_list'}
    },
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
            {
                path: 'role_list',
                component: () => import('../components/admin/role_list.vue')
            },

            {
                path: 'admin_edit',
                component: () => import('../components/admin/admin_edit.vue')
            },
            {
                path: 'admin_list',
                component: () => import('../components/admin/admin_list.vue'),
                name: "admin_list"
            },
            {
                path: 'menu_edit',
                component: () => import('../components/menu/menu_edit.vue'),

            },
            {
                path: 'menu_list',
                component: () => import('../components/menu/menu_list.vue'),

            },
            {
                path: 'category_list',
                component: () => import('../components/category/category_list.vue'),

            },
            {
                path: "queue_list",
                component: () => import('../components/queue/queue_list.vue')

            },
            {
                path: "queue_delay_list",
                component: () => import('../components/queue/queue_delay_list.vue')

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
    mode:"hash",
    routes
})

export default router