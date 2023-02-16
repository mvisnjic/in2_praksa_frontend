import { createRouter, createWebHistory } from 'vue-router'
import indexPage from '../views/indexPage.vue'
import signup from '../views/signUp.vue'
import signin from '../views/signIn.vue'
import notFound from '../views/404.vue'
import editProfile from '../views/editProfile.vue'

const routes = [
    {
        path: '/',
        name: 'indexPage',
        component: indexPage,
        meta: { title: 'Dobro došli' },
    },
    {
        path: '/signup',
        name: 'signUp',
        component: signup,
        meta: { title: 'Sign Up' },
    },
    {
        path: '/signin',
        name: 'signIn',
        component: signin,
        meta: { title: 'Sign In' },
    },
    {
        path: '/editprofile',
        name: 'editProfile',
        component: editProfile,
        meta: { title: 'Edit profile' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: notFound,
        meta: { title: 'Greška | FIPUbot' },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const defaultTitle = 'FIPUbot'
router.afterEach((to) => {
    document.title = to.meta.title || defaultTitle
})

export default router
