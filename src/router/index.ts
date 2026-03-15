import { createRouter, createWebHistory } from 'vue-router'
import KnowledgeBaseView from '../views/KnowledgeBaseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'kb',
      component: KnowledgeBaseView,
      meta: { auth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('kb-token')
  if (to.meta.auth && !token) {
    return '/login'
  }

  if (to.path === '/login' && token) {
    return '/'
  }

  return true
})

export default router
