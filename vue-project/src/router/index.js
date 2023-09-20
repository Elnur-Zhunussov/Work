import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue';
import MainPage from '../views/MainPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/main-page',
      name: 'Main Page',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainPage.vue')
    }
  ]
})

export default router
