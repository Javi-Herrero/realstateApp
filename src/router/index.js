import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/pages/Home.vue'
import About from '../components/pages/About.vue'
import Detail from '../components/pages/DetailPage.vue'
import New from '../components/pages/Newlisting.vue'
import Edit from '../components/pages/Edit.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/detail', component: Detail },
        { path: '/new', component: New },
        { path: '/edit', component: Edit }
    ],

})
export default router