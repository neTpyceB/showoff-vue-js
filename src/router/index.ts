import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: DashboardView, meta: { auth: true } },
    { path: '/login', component: () => import('../views/LoginView.vue') },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('collab-token')
  if (to.meta.auth && !token) return '/login'
  if (to.path === '/login' && token) return '/'
  return true
})

export default router
